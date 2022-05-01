import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractSchemaDto } from '../../../../common/dto/abstract.schema.dto';
import { RoleType } from '../../../../constants';
import { ApiEnumProperty } from '../../../../decorators';
import type { User } from '../user.schema';

export class UserDto extends AbstractSchemaDto {
  @ApiPropertyOptional()
  name: string;

  @ApiEnumProperty(() => RoleType)
  role: RoleType;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  avatar: string;

  @ApiPropertyOptional()
  phone: string;

  constructor(schema: User) {
    super(schema);
    this.name = schema.name;
    this.role = schema.role;
    this.email = schema.email;
    this.avatar = schema.avatar;
    this.phone = schema.phone;
  }
}
