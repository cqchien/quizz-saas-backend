import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { UserEntity } from '../domain/entity/user.entity';
import type { UserExamEntity } from '../domain/entity/user-exam.entity';
import type { UserDocument } from '../domain/user.schema';
import { User } from '../domain/user.schema';
import type { UserExam } from '../domain/user-exam.schema';

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

  public async findExam(
    userId: string,
    examId: string,
  ): Promise<UserExamEntity | undefined> {
    const userEntity = await this.repository
      // eslint-disable-next-line quote-props
      .findOne({ _id: userId })
      .populate('exams.templateExam exams.questions.question')
      .lean<User>()
      .exec();
    const examEntity = (userEntity?.exams || []).find(
      (exam) => exam._id.toString() === examId,
    );

    if (!userEntity || !examEntity) {
      return;
    }

    return this.toUserExamEntity(examEntity);
  }

  public async getAllExams(userId: string): Promise<UserExamEntity[]> {
    const userEntity = await this.repository
      // eslint-disable-next-line quote-props
      .findOne({ _id: userId })
      .lean<User>()
      .exec();

    return userEntity.exams.map((examEntity) =>
      this.toUserExamEntity(examEntity),
    );
  }

  public async updateUserExam(
    userId: string,
    userExamEntity: UserExamEntity,
  ): Promise<UserExamEntity> {
    await this.repository.updateOne(
      // eslint-disable-next-line prettier/prettier
      { '_id': userId, 'exams._id': userExamEntity.id },
      {
        $set: {
          'exams.$': { ...userExamEntity, _id: userExamEntity.id },
        },
      },
    );

    return this.findExam(
      userId,
      userExamEntity.id || '',
    ) as unknown as UserExamEntity;
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
      exams: userModel.exams.map((exam) => this.toUserExamEntity(exam)),
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    };
  }

  private toUserExamEntity(userExam: UserExam): UserExamEntity {
    return {
      id: userExam._id.toString(),
      templateExam: userExam.templateExam?._id.toString(),
      templateExamEntity: {
        ...userExam.templateExam,
        id: userExam.templateExam?._id.toString(),
        questions: [],
        createdBy: undefined,
        updatedBy: undefined,
      },
      setting: userExam.setting,
      code: userExam.code,
      name: userExam.name,
      description: userExam.description,
      status: userExam.status,
      type: userExam.type,
      score: userExam.score,
      total: userExam.total,
      resultStatus: userExam.resultStatus,
      questionBankType: userExam.questionBankType,
      questions: userExam.questions.map((answerQuestion) => ({
        ...answerQuestion,
        question: answerQuestion.question?._id.toString(),
        questionEntity: {
          ...answerQuestion.question,
          id: answerQuestion.question?._id.toString(),
        },
      })),
      scheduleCode: userExam.scheduleCode,
      updatedAt: userExam.updatedAt,
      createdAt: userExam.createdAt,
    };
  }
}
