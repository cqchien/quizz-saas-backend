import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { GroupRepository } from '../../group/infra/group.repository';
import type { ExamEntity } from '../domain/entity/exam.entity';
import type { ExamDocument } from '../domain/exam.schema';
import { Exam } from '../domain/exam.schema';
import type { QueryExamDto } from '../interface/dto/query.dto';

@Injectable()
export class ExamRepository {
  constructor(
    @InjectModel(Exam.name)
    private repository: Model<ExamDocument>,
    private groupRepository: GroupRepository,
  ) {}

  public async findByCondition(
    options: Record<string, string>,
  ): Promise<ExamEntity | undefined> {
    const { id, ...rest } = options;
    const formatedOptions = id ? { _id: id, ...rest } : { ...rest };

    const exam = await this.repository
      .findOne(formatedOptions)
      .populate('questions createdBy schedules.assignedGroup', '-options.value')
      .lean()
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
    await this.repository.updateOne(
      { _id: examEntity.id },
      { ...examEntity, _id: examEntity.id },
    );

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

    const total = await examQuery.clone().count();

    const exams = await examQuery
      .limit(take)
      .skip(skip)
      .sort({ updatedAt: -1 })
      .select('-questions -createdBy -updatedBy')
      .lean<Exam[]>()
      .exec();

    return {
      data: exams.map((examModel: Exam) => this.toEntity(examModel)),
      total,
    };
  }

  public async delete(examId: string): Promise<void> {
    await this.repository.deleteOne({ _id: examId });
  }

  public async findAllExams(): Promise<ExamEntity[]> {
    const examModels = await this.repository.find().lean<Exam[]>().exec();

    return examModels.map((examModel: Exam) => this.toEntity(examModel));
  }

  private toEntity(exam: Exam): ExamEntity {
    return {
      id: exam._id.toString(),
      code: exam.code,
      name: exam.name,
      description: exam.description,
      defaultQuestionNumber: exam.defaultQuestionNumber,
      type: exam.type,
      questionBankType: exam.questionBankType,
      questions: (exam.questions || []).map((question) =>
        question._id.toString(),
      ),
      questionEntities: (exam.questions || []).map((question) => ({
        ...question,
        id: question._id.toString(),
      })),
      setting: exam.setting,
      schedules: exam.schedules.map((schedule) => ({
        ...schedule,
        assignedGroup: schedule.assignedGroup?._id.toString(),
        assignedGroupEntity: schedule.assignedGroup
          ? this.groupRepository.toEntity(schedule.assignedGroup)
          : undefined,
      })),
      updatedAt: exam.updatedAt,
      createdAt: exam.createdAt,
      createdBy: exam.createdBy?._id?.toString(),
      updatedBy: exam.updatedBy?._id?.toString(),
    };
  }
}
