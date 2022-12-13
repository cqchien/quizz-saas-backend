import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserNotFoundException } from '../../../exceptions';
import { UserService } from '../../user/app/user.service';
import { UserPresenter } from '../../user/interface/presenter/user.presenter';
import { AuthService } from '../app/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';
import { LoginPresenter } from './presenter/login.presenter';
import { AuthResponsePresenter } from './presenter/response.presenter';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthResponsePresenter,
    description: 'User info with access token',
  })
  @ApiException(() => [UserNotFoundException])
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<AuthResponsePresenter> {
    const user = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });

    const userPresenter = new UserPresenter(user);
    const loginPresenter = new LoginPresenter(userPresenter, token);

    return new AuthResponsePresenter(loginPresenter);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthResponsePresenter,
    description: 'Successfully Registered',
  })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<AuthResponsePresenter> {
    const user = await this.userService.createUser(userRegisterDto);
    const userPresenter = new UserPresenter(user);

    return new AuthResponsePresenter(userPresenter);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthResponsePresenter,
    description: 'Successfully Change Password',
  })
  async userChangePassword(
    @Query('token') token: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<AuthResponsePresenter> {
    const user = await this.authService.verifyAccessToken(token);

    const updatedUser = await this.userService.changePassword(
      user.id || '',
      changePasswordDto,
    );
    const userPresenter = new UserPresenter(updatedUser);

    return new AuthResponsePresenter(userPresenter);
  }
}
