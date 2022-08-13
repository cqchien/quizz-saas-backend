import { Injectable } from '@nestjs/common';

import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { QuestionExistException } from '../../../exceptions/question/question-exist.exception';
import { QuestionNotFoundException } from '../../../exceptions/question/question-not-found.exception';
import { QuestionSaveFailedException } from '../../../exceptions/question/question-save-failed.exception';
import { ServerErrorException } from '../../../exceptions/server-error.exception';
import type { UserEntity } from '../../user/domain/entity/user.entity';
import type { QuestionEntity } from '../domain/entity/question.entity';
import { QuestionRepository } from '../infra/question.repository';
import type { QuestionDto } from '../interface/dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async createQuestion(
    user: UserEntity,
    questionDto: QuestionDto,
  ): Promise<QuestionEntity> {
    try {
      const existedQuestion = await this.questionRepository.findByCondition({
        id: questionDto.id || '',
      });

      if (existedQuestion) {
        throw new QuestionExistException('Question is existed!!');
      }

      const questionEntity: QuestionEntity = {
        ...questionDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: user.id,
        updatedBy: user.id,
      };

      const question = await this.questionRepository.create(questionEntity);

      if (!question) {
        throw new QuestionSaveFailedException('Create question failed!');
      }

      return question;
    } catch {
      throw new ServerErrorException();
    }
  }

  public async findOne(
    options: Record<string, string>,
  ): Promise<QuestionEntity> {
    const question = await this.questionRepository.findByCondition(options);

    if (!question) {
      throw new QuestionNotFoundException('Question does not exist!!');
    }

    return question;
  }

  public async findAll({ query, take, skip }: PageOptionsDto): Promise<{
    data: Array<QuestionEntity | undefined>;
    total: number;
  }> {
    return this.questionRepository.findAll(query, take, skip);
  }

  public async updateQuestion(
    user: UserEntity,
    questionId: string,
    questionDto: QuestionDto,
  ): Promise<QuestionEntity> {
    try {
      const existedQuestion = await this.questionRepository.findByCondition({
        id: questionId,
      });

      if (!existedQuestion) {
        throw new QuestionNotFoundException('Question does not exist!!');
      }

      const questionEntity: QuestionEntity = {
        ...questionDto,
        updatedAt: new Date(),
        updatedBy: user.id,
      };
      const question = await this.questionRepository.update(questionEntity);

      if (!question) {
        throw new QuestionSaveFailedException('Update question failed!');
      }

      return question;
    } catch {
      throw new ServerErrorException();
    }
  }

  public async deleteQuestion(questionId: string): Promise<void> {
    try {
      const existedQuestion = await this.questionRepository.findByCondition({
        id: questionId,
      });

      if (!existedQuestion) {
        throw new QuestionNotFoundException('Question does not exist!!');
      }

      await this.questionRepository.delete(questionId);
    } catch {
      throw new ServerErrorException();
    }
  }
}
