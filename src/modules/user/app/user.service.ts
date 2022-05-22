import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import type { FindConditions } from 'typeorm';

import type { UserRegisterDto } from '../../auth/dto/UserRegisterDto';
import type { UserDocument } from '../domain/user.schema';
import { User } from '../domain/user.schema';
import { UserGetSerialization } from '../serialization/user.get.serialization';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  /**
   * Find single user
   */
  findOne(findData: FindConditions<User>): Promise<UserDocument | null> {
    return this.userModel.findOne(findData).lean().exec();
  }

  async createUser(
    userRegisterDto: UserRegisterDto,
  ): Promise<UserGetSerialization> {
    const existedUser = await this.userModel.findOne({
      email: userRegisterDto.email,
    });

    if (existedUser) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: 'user.error.emailExist',
      });
    }

    const user = new this.userModel(userRegisterDto);

    // if (file && !this.validatorService.isImage(file.mimetype)) {
    //   throw new FileNotImageException();

    // if (file) {
    //   user.avatar = await this.awsS3Service.uploadImage(file);
    // }

    await user.save();

    const userDetail = await this.userModel
      .findOne({
        _id: user._id,
      })
      .lean();

    return this.serializationUserGet(userDetail);
  }

  serializationUserGet(data: UserDocument | null): UserGetSerialization {
    return plainToInstance(UserGetSerialization, data);
  }
}
