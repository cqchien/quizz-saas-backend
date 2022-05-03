import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserNotFoundException } from '../../../exceptions';
import { UserService } from '../../user/app/user.service';
import { UserDto } from '../../user/domain/dtos/user.dto';
import type { UserGetSerialization } from '../../user/serialization/user.get.serialization';
import { AuthService } from '../app/auth.service';
import { LoginPayloadDto } from '../dto/LoginPayloadDto';
import { UserLoginDto } from '../dto/UserLoginDto';
import { UserRegisterDto } from '../dto/UserRegisterDto';

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
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  @ApiException(() => [UserNotFoundException])
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const user = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: user._id,
      role: user.role,
    });

    return new LoginPayloadDto(user, token);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserGetSerialization> {
    const createdUser = await this.userService.createUser(userRegisterDto);

    return createdUser;
  }
}
