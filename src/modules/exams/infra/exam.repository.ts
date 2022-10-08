import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { ExamEntity } from '../domain/entity/exam.entity';
import type { ExamDocument } from '../domain/exam.schema';
import { Exam } from '../domain/exam.schema';

@Injectable()
export class ExamRepository {
  constructor(
    @InjectModel(Exam.name)
    private repository: Model<ExamDocument>,
  ) {}

  public async findByCondition(
    options: Record<string, string>,
  ): Promise<ExamEntity | undefined> {
    const { id, ...rest } = options;
    const formatedOptions = id ? { _id: id, ...rest } : { ...rest };

    const exam = await this.repository
      .findOne(formatedOptions)
      .lean()
      .populate('questions createdBy updatedBy')
      .exec();

    if (!exam) {
      return;
    }

    return this.toEntity(exam);
  }

  public async create(examEntity: ExamEntity): Promise<ExamEntity> {
    const exam = await this.repository.create(examEntity);

    return this.findByCondition({
      id: exam._id.toString(),
    }) as unknown as ExamEntity;
  }

  private toEntity(exam: Exam): ExamEntity {
    return {
      id: exam._id.toString(),
      name: exam.name,
      description: exam.description,
      defaultQuestionNumber: exam.defaultQuestionNumber,
      time: exam.time,
      type: exam.type,
      quesstionBankType: exam.quesstionBankType,
      questions: exam.questions.map((question) => question._id.toString()),
      questionEntities: exam.questions,
      setting: exam.setting,
      updatedAt: exam.updatedAt,
      createdAt: exam.createdAt,
      createdBy: exam.createdBy._id.toString(),
      createdByEntity: exam.createdBy,
      updatedBy: exam.updatedBy._id.toString(),
      updatedByEntity: exam.updatedBy,
    };
  }
}
