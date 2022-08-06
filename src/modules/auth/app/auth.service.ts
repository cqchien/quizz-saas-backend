import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../../common/utils';
import { TokenType } from '../../../constants';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found.exception';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserService } from '../../user/app/user.service';
import type { UserEntity } from '../../user/domain/entity/user.entity';
import type { UserLoginDto } from '../interface/dto/login.dto';
import { TokenPresenter } from '../interface/presenter/token.presenter';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: {
    role: string;
    userId: string | undefined;
  }): Promise<TokenPresenter> {
    return new TokenPresenter({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException('Wrong Password!');
    }

    return user;
  }
}
