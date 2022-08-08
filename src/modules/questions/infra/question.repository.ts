import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PageMetaDto } from '../../../common/dto/page-meta.dto';
import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { Model } from 'mongoose';

import type { QuestionEntity } from '../domain/entity/question.entity';
import type { QuestionDocument } from '../domain/question.schema';
import { Question } from '../domain/question.schema';
import { QuestionResponseSerialization } from '../interface/serialization/question.response.serialization';
import { QuestionGetSerialization } from '../interface/serialization/question.get.serialization';
import { plainToInstance } from 'class-transformer';
import { QuestionListSerialization } from '../interface/serialization/question.list.serialization';
import { QuestionUpdateDto } from '../domain/dto/question.update.dto';
import { ContextProvider } from '../../../providers/context.provider';
import { QuestionNotFoundException } from '../../../exceptions/question/question-not-found.exception';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name)
    private repository: Model<QuestionDocument>
  ) {}

  public async findByCondition(
    options: Record<string, string>
  ): Promise<QuestionEntity | undefined> {
    const { id, ...rest } = options;
    const formatedOptions = id ? { _id: id, ...rest } : { ...rest };

    const questionModel = await this.repository
      .findOne(formatedOptions)
      .lean<Question>()
      .exec();

    return this.toEntity(questionModel);
  }

  public async create(
    questionEntity: QuestionEntity
  ): Promise<QuestionEntity | undefined> {
    const question = await this.repository.create(questionEntity);

    return this.toEntity(question.toObject());
  }

  findAll = async (
    options: PageOptionsDto
  ): Promise<QuestionResponseSerialization> => {
    let questionsQuery = this.repository.find();

    if (options.searchField) {
      questionsQuery = this.repository.find({
        [options.searchField]: options.searchValue,
      });
    }

    if (options.order) {
      void questionsQuery.sort(options.order);
    }

    void questionsQuery.limit(options.take);
    void questionsQuery.skip(options.skip);

    const questions = await questionsQuery.lean();
    const questionsCount = await this.repository.countDocuments();

    const paginationMetaData = new PageMetaDto(options, questionsCount);

    const questionsSerialization = this.serializationQuestionsList(
      questions as QuestionDocument[]
    );

    return this.serializationQuestionsResponse(
      questionsSerialization,
      paginationMetaData
    );
  };

  updateQuestion = async (
    questionId: string,
    questionUpdateDto: QuestionUpdateDto
  ): Promise<QuestionResponseSerialization> => {
    const user = ContextProvider.getAuthUser();
    const questionDetail = await this.repository.findOne({
      _id: questionId,
    });

    if (!questionDetail) {
      throw new QuestionNotFoundException("Question does not exist!!");
    }

    const updatedQuestion = Object.assign(questionDetail, {
      ...questionUpdateDto,
      updatedBy: user?.id,
    });

    await this.repository.updateOne({ _id: questionId }, updatedQuestion);

    const questionResult = await this.repository
      .findOne({
        _id: questionId,
      })
      .lean()
      .populate("createdBy updatedBy");

    const questionSerialization = this.serializationQuestionGet(
      questionResult as QuestionDocument
    );

    return this.serializationQuestionsResponse(questionSerialization);
  };

  deleteQuestion = async (
    questionId: string
  ): Promise<QuestionResponseSerialization> => {
    const questionDetail = await this.repository.findOne({
      _id: questionId,
    });

    if (!questionDetail) {
      throw new QuestionNotFoundException("Question does not exist!!");
    }

    await this.repository.deleteOne({ _id: questionId });

    const questionSerialization = this.serializationQuestionGet(
      questionDetail as QuestionDocument
    );

    return this.serializationQuestionsResponse(questionSerialization);
  };

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

  serializationQuestionGet(
    data: QuestionDocument | null
  ): QuestionGetSerialization {
    return plainToInstance(QuestionGetSerialization, data);
  }

  serializationQuestionsList(
    data: QuestionDocument[] | []
  ): QuestionListSerialization[] {
    return plainToInstance(QuestionListSerialization, data);
  }

  serializationQuestionsResponse(
    data: QuestionGetSerialization | QuestionListSerialization[],
    meta?: PageMetaDto
  ): QuestionResponseSerialization {
    return plainToInstance(QuestionResponseSerialization, { data, meta });
  }
}
