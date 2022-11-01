import { Injectable } from '@nestjs/common';

import { RoleType } from '../../../constants/role-type';
import { MailService } from '../../mail/mail.service';
import { UserService } from '../../user/app/user.service';
import type { UserEntity } from '../../user/domain/entity/user.entity';
import type { GroupEntity } from '../domain/entity/group.entity';
import { GroupRepository } from '../infra/group.repository';
import type { GroupDto } from '../interface/dto/group.dto';

@Injectable()
export class UserExamService {
  constructor(
    private groupRepository: GroupRepository,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async createGroup(
    user: UserEntity,
    groupDto: GroupDto,
  ): Promise<GroupEntity> {
    const groupEntity = {
      ...groupDto,
      createdBy: user.id,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    return this.groupRepository.create(groupEntity);
  }

  public findAll(user: UserEntity): Promise<GroupEntity[]> {
    if (user.role === RoleType.ADMIN) {
      return this.groupRepository.findAll();
    }

    return this.groupRepository.findAll(user.id);
  }
}
