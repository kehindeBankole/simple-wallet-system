import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'kehinde',
    });
  }

  async validate(payload) {
    const user = await this.userRepo.findOneBy({
      email: payload.email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
    // return { userId: payload.sub, username: payload.username };
  }
}
