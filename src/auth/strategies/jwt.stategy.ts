import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ZrwhrZJrEEqDTrAL8MGFYFnb89TfKmcc',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      artisanId: payload.artisanId,
    };
  }
}
