import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  private readonly logger = new Logger('localStrategy');
  async validate(username: string, password: string): Promise<any> {
    this.logger.log('1');
    const user = await this.authService.validateUser(username, password);
    this.logger.log('3');
    if (!user) {
      throw new UnauthorizedException();
    }
    return { user: user };
  }
}
