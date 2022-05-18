import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { PageMetaDto } from '../../../common/dto/page-meta.dto';
import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { ContextProvider } from '../../../providers/context.provider';
import type { QuestionCreateDto } from '../domain/dto/question.create.dto';
import type { QuestionDocument } from '../domain/question.schema';
import { Question } from '../domain/question.schema';
import { QuestionGetSerialization } from '../serialization/question.get.serialization';
import { QuestionListSerialization } from '../serialization/question.list.serialization';
import { QuestionResponseSerialization } from '../serialization/question.response.serialization';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
  ) {}

  createQuestion = async (
    questionCreateDto: QuestionCreateDto,
  ): Promise<QuestionResponseSerialization> => {
    const user = ContextProvider.getAuthUser();

    const question = new this.questionModel(questionCreateDto);
    question.updatedBy = question.createdBy = user?._id || '';
    await question.save();

    const questionDetail = await this.questionModel
      .findOne({
        _id: question._id,
      })
      .lean()
      .populate('createdBy updatedBy');

    const questionSerialization = this.serializationQuestionGet(
      questionDetail as QuestionDocument,
    );

    return this.serializationQuestionsResponse(questionSerialization);
  };

  findAll = async (
    options: PageOptionsDto,
  ): Promise<QuestionResponseSerialization> => {
    let questionsQuery = this.questionModel.find();

    if (options.searchField) {
      questionsQuery = this.questionModel.find({
        [options.searchField]: options.searchValue,
      });
    }

    if (options.order) {
      void questionsQuery.sort(options.order);
    }

    void questionsQuery.limit(options.take);
    void questionsQuery.skip(options.skip);

    const questions = await questionsQuery.lean();
    const questionsCount = await this.questionModel.countDocuments();

    const paginationMetaData = new PageMetaDto(options, questionsCount);

    const questionsSerialization = this.serializationQuestionsList(
      questions as QuestionDocument[],
    );

    return this.serializationQuestionsResponse(
      questionsSerialization,
      paginationMetaData,
    );
  };

  findOne = async (
    questionId: string,
  ): Promise<QuestionResponseSerialization> => {
    const questionDetail = await this.questionModel
      .findOne({
        _id: questionId,
      })
      .lean()
      .populate('createdBy updatedBy');

    const questionSerialization = this.serializationQuestionGet(
      questionDetail as QuestionDocument,
    );

    return this.serializationQuestionsResponse(questionSerialization);
  };

  serializationQuestionGet(
    data: QuestionDocument | null,
  ): QuestionGetSerialization {
    return plainToInstance(QuestionGetSerialization, data);
  }

  serializationQuestionsList(
    data: QuestionDocument[] | [],
  ): QuestionListSerialization[] {
    return plainToInstance(QuestionListSerialization, data);
  }

  serializationQuestionsResponse(
    data: QuestionGetSerialization | QuestionListSerialization[],
    meta?: PageMetaDto,
  ): QuestionResponseSerialization {
    return plainToInstance(QuestionResponseSerialization, { data, meta });
  }
}
