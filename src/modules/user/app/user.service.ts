import { Injectable } from '@nestjs/common';

import { RoleType } from '../../../constants/role-type';
import { UserExistException } from '../../../exceptions/user/user-exist.exception';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found.exception';
import { UserSaveFailedException } from '../../../exceptions/user/user-save-failed.exception';
import type { UserRegisterDto } from '../../auth/interface/dto/register.dto';
import type { ExamEntity } from '../../exams/domain/entity/exam.entity';
import { USER_EXAM_STATUS } from '../constant';
import type { UserEntity } from '../domain/entity/user.entity';
import type { UserExamEntity } from '../domain/entity/user-exam.entity';
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
      exams: [],
      role: RoleType.USER,
    };

    const user = await this.userRepository.create(userEntity);

    if (!user) {
      throw new UserSaveFailedException('Create user failed!');
    }

    return user;
  }

  async createExamForUser(
    userId: string,
    exam: ExamEntity,
    scheduleCode: string,
  ) {
    // validate user
    const userEntity = await this.userRepository.findByCondition({
      id: userId,
    });

    if (!userEntity) {
      return;
    }

    const questionsUserExam = exam.questions.map((questionId) => ({
      question: questionId,
    }));

    const userExamEntity: UserExamEntity = {
      templateExam: exam.id || '',
      scheduleCode,
      code: exam.code,
      name: exam.name,
      description: exam.description,
      type: exam.type,
      questionBankType: exam.questionBankType,
      status: USER_EXAM_STATUS.NOT_STARTED,
      questions: questionsUserExam,
    };

    const updatedUserEntity = {
      ...userEntity,
      exams: userEntity.exams
        ? [...userEntity.exams, userExamEntity]
        : [userExamEntity],
    };

    return this.userRepository.update(updatedUserEntity);
  }
}
