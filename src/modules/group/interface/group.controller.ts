import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../../decorators';
import {
  ServerErrorException,
  UserNotFoundException,
} from '../../../exceptions';
import { UserEntity } from '../../user/domain/entity/user.entity';
import { GroupService } from '../app/group.service';
import { GroupPresenter } from './presenter/group.presenter';
import { GroupResponsePresenter } from './presenter/response.presenter';

@Controller('groups')
@ApiTags('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [UserNotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: GroupResponsePresenter,
    description: 'Get information of current user',
  })
  public async getAll(@AuthUser() user: UserEntity) {
    const groupEntities = await this.groupService.findAll(user);
    const groupPresenters = groupEntities.map(
      (groupEntity) => new GroupPresenter(groupEntity),
    );

    return new GroupResponsePresenter(groupPresenters);
  }
}
