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
} from '@nestjs/swagger';

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
  @HttpCode(200)
  async logout(@GetCurrentUser('userId') sub: string): Promise<boolean> {
    return this.authService.logout(sub);
  }

  @UseGuards(RtGuard)
  @ApiBearerAuth()
  @Post('/refresh')
  @ApiOkResponse({
    description: 'Return Token',
    type: TokenDto,
  })
  async refresh(
    @GetCurrentUser('userId') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TokenDto> {
    const { access_token, refresh_token } =
      await this.authService.refreshTokens(userId, refreshToken);

    return { access_token, refresh_token };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/me')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
