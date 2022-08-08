import { Injectable } from '@nestjs/common';
import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { QuestionExistException } from '../../../exceptions/question/question-exist.exception';
import { QuestionNotFoundException } from '../../../exceptions/question/question-not-found.exception';
import { QuestionSaveFailedException } from '../../../exceptions/question/question-save-failed.exception';
import type { QuestionCreateDto } from '../domain/dto/question.create.dto';
import type { QuestionUpdateDto } from '../domain/dto/question.update.dto';
import { QuestionEntity } from '../domain/entity/question.entity';
import { QuestionRepository } from '../infra/question.repository';
import { QuestionResponseSerialization } from '../interface/serialization/question.response.serialization';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async createQuestion(
    questionCreateDto: QuestionCreateDto
  ): Promise<QuestionEntity> {
    const existedQuestion = await this.questionRepository.findByCondition({
      question: questionCreateDto.question,
    });

    if (existedQuestion) {
      throw new QuestionExistException("Question is existed!!");
    }

    const questionEntity: QuestionEntity = {
      ...questionCreateDto,
      type: questionCreateDto.type.toString(),
      heuristicLevel: questionCreateDto.heuristicLevel.toString(),
    };

    const question = await this.questionRepository.create(questionEntity);

    if (!question) {
      throw new QuestionSaveFailedException("Create question failed!");
    }

    return question;
  }

  public async findOne(
    options: Record<string, string>
  ): Promise<QuestionEntity> {
    const question = await this.questionRepository.findByCondition(options);

    if (!question) {
      throw new QuestionNotFoundException("Question does not exist!!");
    }

    return question;
  }

  public async findAll(
    options: PageOptionsDto
  ): Promise<QuestionResponseSerialization> {
    const questionResponseSerialization = await this.questionRepository.findAll(
      options
    );

    return questionResponseSerialization;
  }

  public async updateQuestion(
    questionId: string,
    questionUpdateDto: QuestionUpdateDto
  ): Promise<QuestionResponseSerialization> {
    const questionResponseSerialization =
      await this.questionRepository.updateQuestion(
        questionId,
        questionUpdateDto
      );

    return questionResponseSerialization;
  }

  public async deleteQuestion(
    questionId: string
  ): Promise<QuestionResponseSerialization> {
    const questionResponseSerialization =
      await this.questionRepository.deleteQuestion(questionId);

    return questionResponseSerialization;
  }
}
