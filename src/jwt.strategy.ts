import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.secret|| 'defaultSecret', // Use a more secure method for handling the secret
    });
  }

  async validate(payload: any) {
    // This method gets the payload from the JWT and checks if it's valid
    return { userId: payload.sub, username: payload.username };
  }
}
