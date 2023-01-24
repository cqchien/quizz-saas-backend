import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DefaultNamingStrategy } from 'typeorm';

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

  public async update(groupEntity: GroupEntity): Promise<GroupEntity> {
    await this.repository.updateOne(
      { _id: groupEntity.id },
      { ...groupEntity, _id: groupEntity.id },
    );

    return this.findOne(groupEntity.id || '');
  }

  public async delete(groupId: string): Promise<void> {
    await this.repository.deleteOne({ _id: groupId });
  }

  public async findAll(query?: any): Promise<GroupEntity[]> {
    const extractQuery = query.name
      ? {
          $or: [{ name: { $regex: '.*' + query.name + '.*' } }],
        }
      : {};

    const groupQuery = query.createdBy
      ? this.repository.find({
          ...extractQuery,
          $and: [{ createdBy: query.createdBy }],
        })
      : this.repository.find({ ...extractQuery });
    const groups = await groupQuery.populate('members').lean<Group[]>().exec();

    return groups.map((group) => this.toEntity(group));
  }

  public async findOne(groupId: string, userId = ''): Promise<GroupEntity> {
    const query = userId
      ? { createdBy: userId, _id: groupId }
      : { _id: groupId };

    const group = await this.repository
      .findOne(query)
      .populate('members')
      .lean<Group>()
      .exec();

    return this.toEntity(group);
  }

  public toEntity(groupModel: Group): GroupEntity {
    return {
      id: groupModel._id.toString(),
      name: groupModel.name,
      description: groupModel.description,
      members: (groupModel.members || []).map((member) =>
        member._id.toString(),
      ),
      memberEntities: (groupModel.members || []).map((member) => ({
        id: member._id.toString(),
        ...member,
      })),
      createdBy: groupModel.createdBy?._id.toString(),
      createdByEntity: {
        id: groupModel.createdBy?._id.toString(),
        ...groupModel.createdBy,
      },
      updatedAt: groupModel.updatedAt,
      createdAt: groupModel.createdAt,
    };
  }
}
