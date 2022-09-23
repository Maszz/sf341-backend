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
import { SignUpDto, SignInRequestDto, TokenDto } from './auth.dto';
import { GetCurrentUser } from './decorators/getCurrentUser.decorator';
import { Request, Response } from 'express';
import { GetCurrentUserCookie } from './decorators/getCurrentUserCookie.decorator';
import { UseCookie, UseCookieContext } from './decorators/UseCookie.decorator';
/**
 *  All use set cookies header when login from non browser fetch system should use storage to store accses token
 * then passing it via authorization header
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/signup')
  async register(
    @Body() req: SignUpDto,
    // @UseCookie(UseCookieContext.accessToken)
    // useAccesTokenCookie: (value: string) => void,
    // @UseCookie(UseCookieContext.refreshToken)
    // useRefreshTokenCookie: (value: string) => void,
  ): Promise<TokenDto> {
    const { username, name, email, password } = req;
    const validatedDto = { username, name, email, password };
    const { access_token, refresh_token } = await this.authService.signUpLocal(
      validatedDto,
    );
    // useAccesTokenCookie(access_token);
    // useRefreshTokenCookie(refresh_token);
    return { access_token, refresh_token };
  }

  @Post('/signin')
  @HttpCode(200)
  async login(
    @Body() req: SignInRequestDto,
    // @UseCookie(UseCookieContext.accessToken)
    // useAccesTokenCookie: (value: string) => void,
    // @UseCookie(UseCookieContext.refreshToken)
    // useRefreshTokenCookie: (value: string) => void,
    // @Req() rawReq: any
  ): Promise<any> {
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
  @Post('/logout')
  @HttpCode(200)
  async logout(
    @GetCurrentUser('userId') sub: string,
    // @UseCookie(UseCookieContext.clearTokens)
    // useClearCookie: (key: string) => void,
  ): Promise<boolean> {
    // useClearCookie(UseCookieContext.accessToken);
    // useClearCookie(UseCookieContext.refreshToken);
    // console.log(sub);
    return this.authService.logout(sub);
  }

  @UseGuards(RtGuard)
  @Post('/refresh')
  async refresh(
    @GetCurrentUser('userId') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    // @UseCookie(UseCookieContext.accessToken)
    // useAccesTokenCookie: (value: string) => void,
    // @UseCookie(UseCookieContext.refreshToken)
    // useRefreshTokenCookie: (value: string) => void,
  ): Promise<TokenDto> {
    const { access_token, refresh_token } =
      await this.authService.refreshTokens(userId, refreshToken);

    // useAccesTokenCookie(access_token);
    // useRefreshTokenCookie(refresh_token);

    return { access_token, refresh_token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(
    @Req() req: Request,
    // @GetCurrentUserCookie('jwt-accesstoken') accessToken: string,
  ) {
    // console.log(accessToken);
    return req.user;
  }
  /**
   * @description This is a test method to check the csrf token
   * @Suggestion This method should be removed. Use App controller root route instead.
   * @Deprecated
   */
  @Get('/view')
  getProfiles(
    @Req() req: any,
    @Res() res: Response,

    // @GetCurrentUserCookie('jwt-accesstoken') accessToken: string
  ) {
    // res.cookie('_csrf', req.csrfToken());
    return res.send('hello');
  }
}
