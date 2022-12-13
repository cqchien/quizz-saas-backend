import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../../constants/role-type';
import { Auth, AuthUser } from '../../../decorators';
import {
  ServerErrorException,
  UserNotFoundException,
} from '../../../exceptions';
import { UserService } from '../app/user.service';
import { UserEntity } from '../domain/entity/user.entity';
import { UserResponsePresenter } from './presenter/response.presenter';
import { UserPresenter } from './presenter/user.presenter';

@Controller('users')
@ApiTags('users')
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

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [UserNotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: UserResponsePresenter,
    description: 'Get information of list users',
  })
  public async getUsers() {
    const userEntities = await this.userService.findAll({
      role: RoleType.USER,
    });

    const userPresenters = userEntities.map(
      (entity) => new UserPresenter(entity),
    );

    return new UserResponsePresenter(userPresenters);
  }
}
