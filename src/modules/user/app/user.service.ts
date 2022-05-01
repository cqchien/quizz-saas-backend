import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { FindConditions } from 'typeorm';

import type { Optional } from '../../../types';
import type { UserRegisterDto } from '../../auth/dto/UserRegisterDto';
import type { UserDocument } from '../domain/user.schema';
import { User } from '../domain/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  /**
   * Find single user
   */
  findOne(findData: FindConditions<User>): Promise<Optional<User | null>> {
    return this.userModel.findOne(findData).exec();
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const user = new this.userModel(userRegisterDto);

    // if (file && !this.validatorService.isImage(file.mimetype)) {
    //   throw new FileNotImageException();

    // if (file) {
    //   user.avatar = await this.awsS3Service.uploadImage(file);
    // }

    await user.save();

    return user.toObject();
  }

  // async getUsers(
  //   pageOptionsDto: UsersPageOptionsDto,
  // ): Promise<PageDto<UserDto>> {
  //   const queryBuilder = this.userModel.createQueryBuilder('user');
  //   const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

  //   return items.toPageDto(pageMetaDto);
  // }

  // async getUser(userId: string): Promise<UserDto> {
  //   const queryBuilder = this.userModel.createQueryBuilder('user');

  //   queryBuilder.where('user.id = :userId', { userId });

  //   const userModel = await queryBuilder.getOne();

  //   if (!userModel) {
  //     throw new UserNotFoundException();
  //   }

  //   return userModel.toDto();
  // }
}
