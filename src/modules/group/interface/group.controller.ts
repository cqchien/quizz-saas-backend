import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../../decorators';
import { ServerErrorException } from '../../../exceptions';
import { UserEntity } from '../../user/domain/entity/user.entity';
import { GroupService } from '../app/group.service';
import { GroupDto } from './dto/group.dto';
import { GroupPresenter } from './presenter/group.presenter';
import { GroupResponsePresenter } from './presenter/response.presenter';

@Controller('groups')
@ApiTags('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: GroupResponsePresenter,
    description: 'Get all groups',
  })
  public async getAll(@AuthUser() user: UserEntity) {
    const groupEntities = await this.groupService.findAll(user);
    const groupPresenters = groupEntities.map(
      (groupEntity) => new GroupPresenter(groupEntity),
    );

    return new GroupResponsePresenter(groupPresenters);
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: GroupResponsePresenter,
    description: 'Get information of the group',
  })
  public async getOne(
    @AuthUser() user: UserEntity,
    @Param('id') groupId: string,
  ) {
    const groupEntity = await this.groupService.findOne(user, groupId);
    const groupPresenter = new GroupPresenter(groupEntity);

    return new GroupResponsePresenter(groupPresenter);
  }

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: GroupResponsePresenter,
    description: 'Get information of current user',
  })
  public async create(
    @AuthUser() user: UserEntity,
    @Body() createGroupDto: GroupDto,
  ) {
    const groupEntity = await this.groupService.createGroup(
      user,
      createGroupDto,
    );
    const groupPresenter = new GroupPresenter(groupEntity);

    return new GroupResponsePresenter(groupPresenter);
  }

  @Put(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: GroupResponsePresenter,
    description: 'Get information of current user',
  })
  public async update(
    @AuthUser() user: UserEntity,
    @Param('id') groupId: string,
    @Body() createGroupDto: GroupDto,
  ) {
    const groupEntity = await this.groupService.updateOne(
      user,
      groupId,
      createGroupDto,
    );
    const groupPresenter = new GroupPresenter(groupEntity);

    return new GroupResponsePresenter(groupPresenter);
  }

  @Delete(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: GroupResponsePresenter,
    description: 'Get information of current user',
  })
  public async delete(
    @AuthUser() user: UserEntity,
    @Param('id') groupId: string,
  ) {
    await this.groupService.delete(user, groupId);

    return new GroupResponsePresenter({});
  }
}
