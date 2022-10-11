import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RtGuard } from './guard/rt.guard';
import {
  SignUpDto,
  SignInRequestDto,
  TokenDto,
  TokenDtoWithUserId,
  UserFromJwtDto,
} from './auth.dto';
import { GetCurrentUser } from './decorators/getCurrentUser.decorator';
import { Request, Response } from 'express';
import { GetCurrentUserCookie } from './decorators/getCurrentUserCookie.decorator';
import { UseCookie, UseCookieContext } from './decorators/UseCookie.decorator';
import {
  ApiProperty,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

export class AcessDeniedResponse {
  @ApiProperty()
  message: string;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  error: string;
}

export class UnAuthorizedResponse {
  @ApiProperty()
  message: string;
  @ApiProperty()
  statusCode: number;
}
/**
 *  All use set cookies header when login from non browser fetch system should use storage to store accses token
 * then passing it via authorization header
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/signup')
  @ApiCreatedResponse({
    description: 'Return Token',
    type: TokenDto,
  })
  async register(@Body() req: SignUpDto): Promise<TokenDto> {
    const { username, name, email, password } = req;
    const validatedDto = { username, name, email, password };
    const { access_token, refresh_token } = await this.authService.signUpLocal(
      validatedDto,
    );

    return { access_token, refresh_token };
  }

  @Post('/signin')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Return Token',
    type: TokenDtoWithUserId,
  })
  async login(@Body() req: SignInRequestDto): Promise<TokenDtoWithUserId> {
    const { username, password } = req;
    const validatedDto = { username, password };
    const response = this.authService.signinLocal(validatedDto);
    const { access_token, refresh_token } = await response;
    // console.log(rawReq.csrfToken());
    // useAccesTokenCookie(access_token);
    // useRefreshTokenCookie(refresh_token);

    return { userId: req.username, access_token, refresh_token };
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/logout')
  @ApiOkResponse({
    description: 'Return Token',
    type: Boolean,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @HttpCode(200)
  async logout(@GetCurrentUser('id') userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @UseGuards(RtGuard)
  @ApiBearerAuth()
  @Post('/refresh')
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnAuthorizedResponse,
  })
  @ApiForbiddenResponse({
    description: 'Access denied',
    type: AcessDeniedResponse,
  })
  @ApiOkResponse({
    description: 'Return Token',
    type: TokenDto,
  })
  async refresh(
    @GetCurrentUser('id') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TokenDto> {
    const { access_token, refresh_token } =
      await this.authService.refreshTokens(userId, refreshToken);

    return { access_token, refresh_token };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Return User',
    type: UserFromJwtDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Get('/me')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
