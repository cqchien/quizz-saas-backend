import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  MAP_HEURISTIC_LEVEL,
  MAP_MODE,
  MAP_QUESTION_STATUS,
  MAP_QUESTION_TYPE,
} from '../constant';
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
    const questionsQuery = this.repository
      .find({
        $or: [{ topic: query }, { tag: query }],
      })
      .limit(take)
      .skip(skip)
      .sort({ updatedAt: 1 });

    const questions = await questionsQuery.lean<Question[]>().exec();
    const total = await this.repository.countDocuments();

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

  public async createMultiple(
    questionEntity: QuestionEntity[],
  ): Promise<Array<QuestionEntity | undefined>> {
    const questions = await this.repository.insertMany(questionEntity);

    return questions.map((question) => this.toEntity(question.toObject()));
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
      type: MAP_QUESTION_TYPE[questionModel.type],
      heuristicLevel: MAP_HEURISTIC_LEVEL[questionModel.heuristicLevel],
      status: MAP_QUESTION_STATUS[questionModel.status],
      level: questionModel.level,
      topic: questionModel.topic,
      tags: questionModel.tags,
      options: questionModel.options,
      language: questionModel.language,
      attachments: questionModel.attachments,
      mode: MAP_MODE[questionModel.mode],
      createdBy: questionModel.createdBy,
      updatedBy: questionModel.updatedBy,
      createdAt: questionModel.createdAt,
      updatedAt: questionModel.updatedAt,
    };
  }
}
