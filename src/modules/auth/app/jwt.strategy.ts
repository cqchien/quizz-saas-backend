import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { RoleType } from '../../../constants';
import { TokenType } from '../../../constants';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserService } from '../../user/app/user.service';
import type { User } from '../../user/domain/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public configService: ApiConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: {
    userId: string;
    role: RoleType;
    type: TokenType;
  }): Promise<User> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({
      _id: args.userId,
      role: args.role,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
