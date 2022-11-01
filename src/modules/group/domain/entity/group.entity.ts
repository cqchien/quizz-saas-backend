import type { UserEntity } from '../../../user/domain/entity/user.entity';

export class GroupEntity {
  id?: string;

  name: string;

  description: string;

  members: string[];

  memberEntities?: UserEntity[];

  createdBy?: string;

  createdByEntity?: UserEntity;

  updatedAt?: Date;

  createdAt?: Date;
}
