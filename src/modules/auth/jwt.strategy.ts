import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import cookie from 'cookie';
import { AuthService } from './auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
require('dotenv').config();

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    const result = this.authService.validateUser(payload);
    if (!result) {
      throw new HttpException('존재하지 않는 유저입니다.', 401);
    }
    return result;
  }
}
