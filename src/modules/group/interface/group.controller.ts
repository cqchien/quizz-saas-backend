import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../../decorators';
import {
  ServerErrorException,
  UserNotFoundException,
} from '../../../exceptions';
import { UserResponsePresenter } from './presenter/response.presenter';
import { UserPresenter } from './presenter/user.presenter';

@Controller('groups')
@ApiTags('groups')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [UserNotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: UserResponsePresenter,
    description: 'Get information of current user',
  })
  public async getCurrentUser(@AuthUser() user: UserEntity) {
    const userEntity = await this.userService.findOne({ email: user.email });
    const userPresenter = new UserPresenter(userEntity);

    return new UserResponsePresenter(userPresenter);
  }
}
