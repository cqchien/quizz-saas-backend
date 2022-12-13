import { BadRequestException, Injectable } from '@nestjs/common';

import { generateHash } from '../../../common/utils';
import { RoleType } from '../../../constants/role-type';
import { UserExistException } from '../../../exceptions/user/user-exist.exception';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found.exception';
import { UserSaveFailedException } from '../../../exceptions/user/user-save-failed.exception';
import type { ChangePasswordDto } from '../../auth/interface/dto/change-password.dto';
import type { UserRegisterDto } from '../../auth/interface/dto/register.dto';
import type { UserEntity } from '../domain/entity/user.entity';
import { UserRepository } from '../infra/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async findOne(options: Record<string, string>): Promise<UserEntity> {
    const user = await this.userRepository.findByCondition(options);

    if (!user) {
      throw new UserNotFoundException('User does not exist!!');
    }

    return user;
  }

  public async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const existedUser = await this.userRepository.findByCondition({
      email: userRegisterDto.email,
    });

    if (existedUser) {
      throw new UserExistException('User is existed!!');
    }

    // if (file && !this.validatorService.isImage(file.mimetype)) {
    //   throw new FileNotImageException();

    // if (file) {
    //   user.avatar = await this.awsS3Service.uploadImage(file);
    // }

    const userEntity: UserEntity = {
      ...userRegisterDto,
      password: generateHash(userRegisterDto.password),
      role: RoleType.USER,
    };

    const user = await this.userRepository.create(userEntity);

    if (!user) {
      throw new UserSaveFailedException('Create user failed!');
    }

    return user;
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<UserEntity> {
    if (changePasswordDto.password !== changePasswordDto.confirmedPassword) {
      throw new BadRequestException('Password does not match.');
    }

    const existedUser = await this.userRepository.findByCondition({
      id: userId,
    });

    if (!existedUser) {
      throw new UserExistException('User does not exist!!');
    }

    const userEntity: UserEntity = {
      ...existedUser,
      password: generateHash(changePasswordDto.password),
    };

    const user = await this.userRepository.update(userEntity);

    if (!user) {
      throw new UserSaveFailedException('Change password for user failed!');
    }

    return user;
  }
}
