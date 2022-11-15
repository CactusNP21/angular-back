import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from "@nestjs/common";
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  private readonly logger = new Logger('jwtStrategy');
  async validate(payload: any) {
    this.logger.log('1');
    this.logger.log(payload.username, payload.sub);
    return { userId: payload.sub, username: payload.username };
  }
}
