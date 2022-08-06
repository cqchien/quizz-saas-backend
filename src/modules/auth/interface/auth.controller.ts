import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserNotFoundException } from '../../../exceptions';
import { UserService } from '../../user/app/user.service';
import { AuthService } from '../app/auth.service';
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

    const loginPresenter = new LoginPresenter(user, token);

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

    return new AuthResponsePresenter(user);
  }
}
