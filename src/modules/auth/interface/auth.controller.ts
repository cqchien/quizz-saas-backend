import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../../constants';
import { ApiFile, Auth, AuthUser } from '../../../decorators';
import { UserNotFoundException } from '../../../exceptions';
import { UserService } from '../../user/app/user.service';
import { UserDto } from '../../user/domain/dtos/user.dto';
import { User } from '../../user/domain/user.schema';
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

    const userDto: UserDto = user.toDto();

    return new LoginPayloadDto(userDto, token);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  @ApiFile({ name: 'avatar' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(userRegisterDto);

    return createdUser;
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: User): UserDto {
    return user.toDto();
  }
}
