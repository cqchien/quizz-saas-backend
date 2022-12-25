import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { MODE } from '../constant';
import type { QuestionEntity } from '../domain/entity/question.entity';
import type { QuestionDocument } from '../domain/question.schema';
import { Question } from '../domain/question.schema';
import type { QueryQuestionDto } from '../interface/dto/query.dto';

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
    pageOptions: PageOptionsDto,
    queryDto: QueryQuestionDto,
    mode = '',
    userId = '',
  ): Promise<{
    data: Array<QuestionEntity | undefined>;
    total: number;
  }> {
    const { take, skip } = pageOptions;
    const { topic, tags, question, createdBy } = queryDto;

    let query = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp: any = [];

    if (topic) {
      tmp.push({ topic });
    }

    if (tags) {
      tmp.push({ tags: { $in: tags.split(',') } });
    }

    if (topic || tags) {
      query = {
        ...query,
        $or: [...tmp],
      };
    }

    let andQuery: any = [];

    if (question) {
      andQuery = [
        ...andQuery,
        {
          $text: {
            $search: question,
          },
        },
      ];
    }

    if (createdBy) {
      andQuery = [...andQuery, { createdBy }];
    }

    if (mode === MODE.PUBLIC) {
      andQuery = [...andQuery, { mode }];
    } else {
      if (userId) {
        andQuery =
          mode === MODE.PRIVATE
            ? [...andQuery, { createdBy: userId }]
            : [
                ...andQuery,
                {
                  $or: [{ createdBy: userId }, { mode: MODE.PUBLIC }],
                },
              ];
      }
    }

    query = {
      ...query,
      $and: [...andQuery],
    }

    const questionsQuery = this.repository.find({ ...query });

    const total = await questionsQuery.clone().count();

    const questions = await questionsQuery
      .populate('createdBy')
      .limit(take)
      .skip(skip)
      .sort({ updatedAt: -1 })
      .lean<Question[]>()
      .exec();

    return {
      data: questions.map((questionModel: Question) =>
        this.toEntity(questionModel),
      ),
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
    await this.repository.updateOne(
      { _id: questionEntity.id },
      { ...questionEntity, _id: questionEntity.id },
    );

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
      id: questionModel._id?.toString(),
      question: questionModel.question,
      type: questionModel.type,
      heuristicLevel: questionModel.heuristicLevel,
      status: questionModel.status,
      level: questionModel.level,
      topic: questionModel.topic,
      tags: questionModel.tags,
      options: questionModel.options.map((questionOption) => ({
        order: questionOption.order,
        option: questionOption.option,
        value: questionOption.value,
      })),
      language: questionModel.language,
      attachments: questionModel.attachments,
      mode: questionModel.mode,
      createdBy: questionModel.createdBy,
      updatedBy: questionModel.updatedBy,
      createdAt: questionModel.createdAt,
      updatedAt: questionModel.updatedAt,
    };
  }
}
