import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../../constants';
import { ApiEnumProperty } from '../../../../decorators';
import type { UserEntity } from '../../domain/entity/user.entity';
import type { User } from '../../domain/user.schema';

export class UserPresenter {
  @ApiProperty()
  id?: string;

  @ApiPropertyOptional()
  name: string;

  @ApiEnumProperty(() => RoleType)
  role: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiPropertyOptional()
  createdAt?: Date;

  constructor(entity: UserEntity) {
    this.id = entity.id || (entity as User)?._id?.toString();
    this.name = entity.name;
    this.role = entity.role;
    this.email = entity.email;
    this.avatar = entity.avatar;
    this.phone = entity.phone;
    this.updatedAt = entity.updatedAt;
    this.createdAt = entity.createdAt;
  }
}
