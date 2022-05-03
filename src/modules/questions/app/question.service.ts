import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { ContextProvider } from '../../../providers/context.provider';
import { UserService } from '../../user/app/user.service';
import type { QuestionCreateDto } from '../domain/dto/question.create.dto';
import type { QuestionDocument } from '../domain/question.schema';
import { Question } from '../domain/question.schema';
import { QuestionGetSerialization } from '../serialization/question.get.serialization';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
    private userService: UserService,
  ) {}

  async createQuestion(
    questionCreateDto: QuestionCreateDto,
  ): Promise<QuestionGetSerialization> {
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

    return this.serializationQuestionGet(questionDetail as QuestionDocument);
  }

  serializationQuestionGet(
    data: QuestionDocument | null,
  ): QuestionGetSerialization {
    return plainToInstance(QuestionGetSerialization, data);
  }
}
