import { Injectable } from '@nestjs/common';

import { RoleType } from '../../../constants/role-type';
import { UserConflictException } from '../../../exceptions/user/user-conflict.exception';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found.exception';
import { UserNotSaveException } from '../../../exceptions/user/user-not-save.exception';
import type { UserRegisterDto } from '../../auth/domain/dto/register.dto';
import type { User } from '../domain/entity/user.entity';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async findOne(options: Record<string, string>): Promise<User> {
    const user = await this.userRepository.findByCondition(options);

    if (!user) {
      throw new UserNotFoundException('User does not exist!!');
    }

    return user;
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const existedUser = await this.userRepository.findByCondition({
      email: userRegisterDto.email,
    });

    if (existedUser) {
      throw new UserConflictException('User is existed!!');
    }

    // if (file && !this.validatorService.isImage(file.mimetype)) {
    //   throw new FileNotImageException();

    // if (file) {
    //   user.avatar = await this.awsS3Service.uploadImage(file);
    // }

    const userEntity: User = {
      ...userRegisterDto,
      role: RoleType.USER,
    };

    const user = await this.userRepository.create(userEntity);

    if (!user) {
      throw new UserNotSaveException('Create user failed!');
    }

    return user;
  }
}
