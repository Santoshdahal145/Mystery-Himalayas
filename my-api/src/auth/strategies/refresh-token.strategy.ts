import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import refreshConfig from 'src/config/refresh.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refreshTokenConfig.secret, // Use the injected config
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req
      .get('authorization')
      ?.replace('Bearer ', '')
      .trim();

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const user = await this.authService.validateRefreshToken(
      payload.sub,
      refreshToken,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return user; // This becomes req.user
  }
}
