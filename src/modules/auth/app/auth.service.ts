import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../../common/utils';
import type { RoleType } from '../../../constants';
import { TokenType } from '../../../constants';
import { UserNotFoundException } from '../../../exceptions';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserService } from '../../user/app/user.service';
import type { User } from '../../user/domain/user.schema';
import { TokenPayloadDto } from '../dto/TokenPayloadDto';
import type { UserLoginDto } from '../dto/UserLoginDto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: {
    role: RoleType;
    userId: string;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return user!;
  }
}
