import { Exclude, Type } from 'class-transformer';

import type { RoleType } from '../../../constants/role-type';

export class UserGetSerialization {
  @Type(() => String)
  readonly _id: string;

  readonly role: RoleType;

  readonly email: string;

  readonly name: string;

  readonly avatar: string;

  readonly phone: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  @Exclude()
  readonly password: string;
}
