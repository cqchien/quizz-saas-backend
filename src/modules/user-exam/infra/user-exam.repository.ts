import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { UserExamEntity } from '../domain/entity/user-exam.entity';
import type { UserExamDocument } from '../domain/user-exam.schema';
import { UserExam } from '../domain/user-exam.schema';

@Injectable()
export class UserExamRepository {
  constructor(
    @InjectModel(UserExam.name)
    private repository: Model<UserExamDocument>,
  ) {}

  public async findByCondition(
    options: Record<string, string>,
    isHideResult = false,
  ): Promise<UserExamEntity | undefined> {
    const { id, ...rest } = options;
    const formatedOptions = id ? { _id: id, ...rest } : { ...rest };

    const populateOptions = isHideResult && '-options.value';

    const userExamEntity = await this.repository
      .findOne(formatedOptions)
      .populate('templateExam user questions.question', populateOptions)
      .lean<UserExam>()
      .exec();

    if (!userExamEntity) {
      return;
    }

    return this.toEntity(userExamEntity);
  }

  public async create(userExamEntity: UserExamEntity): Promise<UserExamEntity> {
    const user = await this.repository.create(userExamEntity);

    return this.toEntity(user.toObject());
  }

  public async update(userExamEntity: UserExamEntity): Promise<UserExamEntity> {
    await this.repository.updateOne(
      { _id: userExamEntity.id },
      { ...userExamEntity, _id: userExamEntity.id },
    );

    return this.findByCondition(
      {
        id: userExamEntity.id || '',
        user: userExamEntity.user,
      },
      true,
    ) as unknown as UserExamEntity;
  }

  public async getAll(
    query: Record<string, string>,
  ): Promise<UserExamEntity[]> {
    const userExamEntity = await this.repository
      .find({ ...query })
      .lean<UserExam[]>()
      .exec();

    return userExamEntity.map((examEntity) => this.toEntity(examEntity));
  }

  private toEntity(userExam: UserExam): UserExamEntity {
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
      user: userExam.user._id.toString(),
      userEntity: {
        ...userExam.user,
        id: userExam.user._id.toString(),
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
