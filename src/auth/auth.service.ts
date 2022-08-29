import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { SignUpDto, SignInRequestDto, TokenDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadForSign } from '../types';
import { Request } from 'express';
import { TripleDES, enc } from 'crypto-js';
import {
  tokenType,
  ArgonHashPayload,
  TripleDesDecryptPayload,
} from './auth.processor.types';
@Injectable()
export class AuthService {
  private atPrivateKey: string;
  private rtPrivateKey: string;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.atPrivateKey = this.configService.get<string>('jwtKey.at_privateKey');
    this.rtPrivateKey = this.configService.get<string>('jwtKey.rt_privateKey');
  }

  async signUpLocal(authDto: SignUpDto): Promise<TokenDto> {
    console.log(authDto);
    const hash = await this.hashData(authDto.password);
    const newUser = await this.userService.createUser({
      username: authDto.username,
      name: authDto.name,
      email: authDto.email,
      hashpw: hash,
    });

    const tokens = await this.getTokens({
      sub: newUser.id,
      username: newUser.username,
    });
    await this.updateRefreshTokenHash(newUser.username, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: SignInRequestDto): Promise<TokenDto> {
    const user = await this.userService.user({ username: dto.username });

    if (!user) throw new ForbiddenException('Access Denied(User)');

    const passwordMatches = await argon.verify(user.hashpw, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens({
      sub: user.id,
      username: user.username,
    });
    await this.updateRefreshTokenHash(user.username, tokens.refresh_token);

    return tokens;
  }

  async signInOAuth(userOauth): Promise<any> {
    const payload = { username: userOauth.username, sub: userOauth.id };
    const user = await this.userService.user({ email: payload.username });
    if (!user) {
      const newUser = await this.userService.createUser({
        username: payload.username,
        name: userOauth.name,
        email: payload.username,
        hashpw: null,
      });
      const tokens = await this.getTokens({
        sub: user.id,
        username: newUser.username,
      });
      await this.updateRefreshTokenHash(newUser.username, tokens.refresh_token);
      return tokens;
    }
    const tokens = await this.getTokens({
      sub: user.id,
      username: user.username,
    });
    await this.updateRefreshTokenHash(user.username, tokens.refresh_token);

    return tokens;
  }

  async logout(sub: string): Promise<boolean> {
    // const decodedSub = await this.decryptJwtPayload({
    //   sub: sub,
    //   type: tokenType.accessToken,
    // });

    await this.userService.updateManyUser({
      where: {
        username: sub,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async getTokens(payload: {
    sub: number;
    username: string;
  }): Promise<TokenDto> {
    const encryptedAt = TripleDES.encrypt(
      `${payload.username}`,
      this.atPrivateKey,
    ).toString();

    const at = this.jwtService.signAsync(
      { sub: payload.sub, userId: encryptedAt },
      {
        expiresIn: '20m',
        algorithm: 'RS256',
        privateKey: this.atPrivateKey,
      },
    );
    const encryptedRt = TripleDES.encrypt(
      `${payload.username}`,
      this.rtPrivateKey,
    ).toString();
    const rt = this.jwtService.signAsync(
      { sub: payload.sub, userId: encryptedRt },
      {
        expiresIn: '1d',
        algorithm: 'RS256',
        privateKey: this.rtPrivateKey,
      },
    );

    return {
      access_token: await at,
      refresh_token: await rt,
    };
  }
  async refreshTokens(sub: string, rt: string): Promise<TokenDto> {
    const decodedSub = await this.decryptJwtPayload({
      sub: sub,
      type: tokenType.refreshToken,
    });

    const user = await this.userService.user({ username: decodedSub });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt, {
      hashLength: 256,
    });
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens({
      sub: user.id,
      username: user.username,
    });
    await this.updateRefreshTokenHash(user.username, tokens.refresh_token);

    return tokens;
  }

  async updateRefreshTokenHash(username: string, rt: string): Promise<void> {
    const hash = await this.hashData(rt);
    await this.userService.updateUser({
      where: { username: username },
      data: { hashedRt: hash },
    });
  }

  async hashData(data: string): Promise<string> {
    const hashed = await argon.hash(data, {
      hashLength: 256,
    });

    return hashed;
  }

  async decryptJwtPayload(payload: TripleDesDecryptPayload) {
    const secret =
      payload.type === tokenType.accessToken
        ? this.atPrivateKey
        : this.rtPrivateKey;

    const decrypted = TripleDES.decrypt(payload.sub, secret);
    // console.log('IN process;', decrypted.toString());
    // console.log('IN process;', decrypted.toString(enc.Utf8));

    return decrypted.toString(enc.Utf8);
  }
}
