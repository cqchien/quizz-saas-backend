import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import type { ExamEntity } from '../domain/entity/exam.entity';
import type { ExamDocument } from '../domain/exam.schema';
import { Exam } from '../domain/exam.schema';
import type { QueryExamDto } from '../interface/dto/query.dto';

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
      .populate('questions createdBy updatedBy', '-options.value')
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

  public async update(examEntity: ExamEntity): Promise<ExamEntity> {
    await this.repository.updateOne({ _id: examEntity.id }, examEntity);

    return this.findByCondition({
      id: examEntity.id || '',
    }) as unknown as ExamEntity;
  }

  public async findAll(
    pageOptions: PageOptionsDto,
    query: QueryExamDto,
    userId = '',
  ): Promise<{
    data: ExamEntity[];
    total: number;
  }> {
    const { take, skip } = pageOptions;

    const examQuery = userId
      ? this.repository.find({ ...query, createdBy: userId })
      : this.repository.find({ ...query });

    const exams = await examQuery
      .limit(take)
      .skip(skip)
      .sort({ updatedAt: -1 })
      .select('-questions -createdBy -updatedBy')
      .lean<Exam[]>()
      .exec();

    return {
      data: exams.map((examModel: Exam) => this.toEntity(examModel)),
      total: exams.length,
    };
  }

  public async delete(examId: string): Promise<void> {
    await this.repository.deleteOne({ _id: examId });
  }

  private toEntity(exam: Exam): ExamEntity {
    return {
      id: exam._id.toString(),
      code: exam.code,
      name: exam.name,
      description: exam.description,
      defaultQuestionNumber: exam.defaultQuestionNumber,
      time: exam.time,
      status: exam.status,
      type: exam.type,
      quesstionBankType: exam.quesstionBankType,
      questions: (exam.questions || []).map((question) =>
        question._id.toString(),
      ),
      questionEntities: exam.questions,
      setting: exam.setting,
      schedules: exam.schedules,
      updatedAt: exam.updatedAt,
      createdAt: exam.createdAt,
      createdBy: exam.createdBy?._id?.toString(),
      createdByEntity: exam.createdBy,
      updatedBy: exam.updatedBy?._id?.toString(),
      updatedByEntity: exam.updatedBy,
    };
  }
}