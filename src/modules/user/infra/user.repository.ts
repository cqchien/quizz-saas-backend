import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { UserEntity } from '../domain/entity/user.entity';
import type { UserDocument } from '../domain/user.schema';
import { User } from '../domain/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private repository: Model<UserDocument>,
  ) {}

  public async findByCondition(
    options: Record<string, string>,
  ): Promise<UserEntity | undefined> {
    const { id, ...rest } = options;
    const formatedOptions = id ? { _id: id, ...rest } : { ...rest };

    const userModel = await this.repository
      .findOne(formatedOptions)
      .lean<User>()
      .exec();

    if (!userModel) {
      return;
    }

    return this.toEntity(userModel);
  }

  public async findAll(
    options?: Record<string, string>,
  ): Promise<UserEntity[]> {
    const userModels = await this.repository
      .find({ ...options })
      .lean<User[]>()
      .exec();

    return userModels.map((model) => this.toEntity(model));
  }

  public async create(userEntity: UserEntity): Promise<UserEntity> {
    const user = await this.repository.create(userEntity);

    return this.toEntity(user.toObject());
  }

  public async update(userEntity: UserEntity): Promise<UserEntity> {
    await this.repository.updateOne(
      { _id: userEntity.id },
      { ...userEntity, _id: userEntity.id },
    );

    return this.findByCondition({
      id: userEntity.id || '',
    }) as unknown as UserEntity;
  }

  private toEntity(userModel: User): UserEntity {
    return {
      id: userModel._id.toString(),
      name: userModel.name,
      role: userModel.role,
      email: userModel.email,
      password: userModel.password,
      phone: userModel.phone,
      avatar: userModel.avatar,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    };
  }
}
