import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../../common/utils';
import { TokenType } from '../../../constants';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserService } from '../../user/app/user.service';
import type { User } from '../../user/domain/entity/user.entity';
import type { UserLoginDto } from '../domain/dto/login.dto';
import { TokenPresenter } from '../domain/presenter/token.presenter';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: {
    role: string;
    userId: string;
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

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'user.error.notFound',
      });
    }

    return user;
  }
}
