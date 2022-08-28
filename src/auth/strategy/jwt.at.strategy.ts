import { ExtractJwt, Strategy, Inject } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../types';
import { AuthService } from '../auth.service';
import { LoggerService } from '../../logger/logger.service';
// import { TripleDesDecryptPayload, tokenType } from ;
import { tokenType, TripleDesDecryptPayload } from '../auth.processor.types';
import { RedisService } from '@liaoliaots/nestjs-redis';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
    private readonly logger: LoggerService, // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.signedCookies) {
        token = req.signedCookies['jwt-accestoken'];
      }
      return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwtKey.at_publicKey'),
    });
    this.redis = this.redisService.getClient();
  }

  async validate(payload: JwtPayload): Promise<JwtPayload | boolean> {
    console.log('payload', payload);
    if (!payload) {
      return false;
    }
    const cached = await this.redis.get(payload.userId);
    if (cached) {
      this.logger.log('Cached user found: ' + cached, 'Cache');
      payload.userId = cached;

      return payload;
    }

    const username = await this.authService.decryptJwtPayload({
      sub: payload.userId,
      type: tokenType.accessToken,
    });
    const user = await this.userService.user({ username: username });
    // console.log(user);
    if (!user || !user.hashedRt) {
      return false;
    }
    await this.redis.set(payload.userId, user.username, 'EX', 3);
    payload.userId = user.username;
    return payload;
  }
}
