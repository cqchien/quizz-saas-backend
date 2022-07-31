import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { User } from './entity/user.entity';
import type { UserDocument } from './entity/user.schema';
import { UserModel } from './entity/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name)
    private repository: Model<UserDocument>,
  ) {}

  public async findByCondition(
    options: Record<string, string>,
  ): Promise<User | undefined> {
    const { id, ...rest } = options;
    const formatedOptions = { _id: id, ...rest };

    const userModel = await this.repository
      .findOne(formatedOptions)
      .lean<UserModel>()
      .exec();

    return this.toEntity(userModel);
  }

  public async create(userEntity: User): Promise<User | undefined> {
    const user = await this.repository.create(userEntity);

    return this.toEntity(user.toObject());
  }

  private toEntity(userModel: UserModel): User | undefined {
    if (!userModel) {
      return undefined;
    }

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
