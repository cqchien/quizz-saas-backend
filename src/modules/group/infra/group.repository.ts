import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { GroupEntity } from '../domain/entity/group.entity';
import type { GroupDocument } from '../domain/group.schema';
import { Group } from '../domain/group.schema';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectModel(Group.name)
    private repository: Model<GroupDocument>,
  ) {}

  public async create(groupEntity: GroupEntity): Promise<GroupEntity> {
    const user = await this.repository.create(groupEntity);

    return this.toEntity(user.toObject());
  }

  public async findAll(query = {}): Promise<GroupEntity[]> {
    const groups = await this.repository
      .find({ ...query })
      .lean<Group[]>()
      .exec();

    return groups.map((group) => this.toEntity(group));
  }

  private toEntity(groupModel: Group): GroupEntity {
    return {
      id: groupModel._id.toString(),
      name: groupModel.name,
      description: groupModel.description,
      members: groupModel.members.map((member) => member?._id.toString()),
      memberEntities: groupModel.members.map((member) => ({
        id: member._id.toString(),
        ...member,
      })),
      createdBy: groupModel.createdBy?._id.toString(),
      updatedAt: groupModel.updatedAt,
      createdAt: groupModel.createdAt,
    };
  }
}
