import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { QuestionEntity } from '../domain/entity/question.entity';
import type { QuestionDocument } from '../domain/question.schema';
import { Question } from '../domain/question.schema';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name)
    private repository: Model<QuestionDocument>,
  ) {}

  public async findByCondition(
    options: Record<string, string>,
  ): Promise<QuestionEntity | undefined> {
    const { id, ...rest } = options;
    const formatedOptions = id ? { _id: id, ...rest } : { ...rest };

    const questionModel = await this.repository
      .findOne(formatedOptions)
      .lean<Question>()
      .populate('createdBy updatedBy')
      .exec();

    return this.toEntity(questionModel);
  }

  public async findAll(
    query = '',
    take: number,
    skip: number,
  ): Promise<{
    data: Array<QuestionEntity | undefined>;
    total: number;
  }> {
    const questionsQuery = this.repository.find();

    if (query) {
      await questionsQuery.where('topic').equals(query);

      await questionsQuery.where('tags').elemMatch(query);
    }

    await questionsQuery.sort({ updatedAt: 1 });
    await questionsQuery.limit(take);
    await questionsQuery.skip(skip);

    const [questions, total] = await Promise.all([
      questionsQuery.lean<Question[]>().exec(),
      questionsQuery.countDocuments(),
    ]);

    return {
      data: questions.map((question: Question) => this.toEntity(question)),
      total,
    };
  }

  public async create(
    questionEntity: QuestionEntity,
  ): Promise<QuestionEntity | undefined> {
    const question = await this.repository.create(questionEntity);

    return this.toEntity(question.toObject());
  }

  public async update(
    questionEntity: QuestionEntity,
  ): Promise<QuestionEntity | undefined> {
    await this.repository.updateOne({ _id: questionEntity.id }, questionEntity);

    return this.findByCondition({ id: questionEntity.id || '' });
  }

  public async delete(questionId: string): Promise<void> {
    await this.repository.deleteOne({ _id: questionId });
  }

  private toEntity(questionModel: Question): QuestionEntity | undefined {
    if (!questionModel) {
      return undefined;
    }

    return {
      id: questionModel._id.toString(),
      question: questionModel.question,
      type: questionModel.type.toString(),
      heuristicLevel: questionModel.heuristicLevel.toString(),
      status: questionModel.status.toString(),
      level: questionModel.level,
      topic: questionModel.topic,
      tags: questionModel.tags,
      language: questionModel.language,
      attachment: questionModel.attachment,
      isPrivate: questionModel.isPrivate,
      createdBy: questionModel.createdBy,
      updatedBy: questionModel.updatedBy,
      createdAt: questionModel.createdAt,
      updatedAt: questionModel.updatedAt,
    };
  }
}