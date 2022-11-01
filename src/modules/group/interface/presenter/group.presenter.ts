import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../../constants';
import { ApiEnumProperty } from '../../../../decorators';
import { UserPresenter } from '../../../user/interface/presenter/user.presenter';
import type { GroupEntity } from '../../domain/entity/group.entity';

export class GroupPresenter {
  @ApiProperty()
  id?: string;

  @ApiPropertyOptional()
  name: string;

  @ApiEnumProperty(() => RoleType)
  description: string;

  @ApiPropertyOptional({
    type: UserPresenter,
    isArray: true,
  })
  members: UserPresenter[];

  @ApiPropertyOptional({
    type: UserPresenter,
  })
  createdBy?: UserPresenter;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiPropertyOptional()
  createdAt?: Date;

  constructor(entity: GroupEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.members = (entity.memberEntities || []).map(
      (memberEntity) => new UserPresenter(memberEntity),
    );
    this.createdBy = entity.createdByEntity
      ? new UserPresenter(entity.createdByEntity)
      : undefined;
    this.updatedAt = entity.updatedAt;
    this.createdAt = entity.createdAt;
  }
}
