import { Injectable } from '@nestjs/common';
import type { IFile } from 'interfaces';
import { invert } from 'lodash';

import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { RoleType } from '../../../constants/role-type';
import { FileNotExelException } from '../../../exceptions/file/file-not-exel.exception';
import { QuestionExistException } from '../../../exceptions/question/question-exist.exception';
import { QuestionNotAllowToSave } from '../../../exceptions/question/question-not-allow-to-save.exception';
import { QuestionNotFoundException } from '../../../exceptions/question/question-not-found.exception';
import { QuestionSaveFailedException } from '../../../exceptions/question/question-save-failed.exception';
import { ServerErrorException } from '../../../exceptions/server-error.exception';
import { FileService } from '../../../shared/services/file.service';
import { ValidatorService } from '../../../shared/services/validator.service';
import { QUESTION_BANK_TYPE } from '../../exams/constant';
import type { UserEntity } from '../../user/domain/entity/user.entity';
import {
  ANSWER_START_WITH,
  COLUMN_IMPORT_QUESTIONS,
  LANG,
  MAP_HEURISTIC_LEVEL,
  MAP_MODE,
  MAP_QUESTION_STATUS,
  MAP_QUESTION_TYPE,
  MODE,
} from '../constant';
import type {
  QuestionEntity,
  QuestionOption,
} from '../domain/entity/question.entity';
import { QuestionRepository } from '../infra/question.repository';
import type { QuestionDto } from '../interface/dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private validatorService: ValidatorService,
    private fileService: FileService,
  ) {}

  async createQuestion(
    user: UserEntity,
    questionDto: QuestionDto,
  ): Promise<QuestionEntity> {
    const existedQuestion = await this.questionRepository.findByCondition({
      question: questionDto.question,
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

  public async findAll(
    user: UserEntity,
    pageOptionsDto: PageOptionsDto,
  ): Promise<{
    data: Array<QuestionEntity | undefined>;
    total: number;
  }> {
    if (pageOptionsDto.type) {
      if (pageOptionsDto.type === QUESTION_BANK_TYPE.SYSTEM) {
        return this.questionRepository.findAll(pageOptionsDto, MODE.PUBLIC);
      }

      return this.questionRepository.findAll(
        pageOptionsDto,
        MODE.PRIVATE,
        user.id,
      );
    }

    if (user.role === RoleType.ADMIN) {
      return this.questionRepository.findAll(pageOptionsDto);
    }

    return this.questionRepository.findAll(pageOptionsDto, '', user.id);
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

      if (existedQuestion.createdBy !== user.id) {
        throw new QuestionNotAllowToSave(
          'User does not have permission to update this question',
        );
      }

      const questionEntity: QuestionEntity = {
        ...questionDto,
        id: questionId,
        updatedAt: new Date(),
        updatedBy: user.id,
      };
      const question = await this.questionRepository.update(questionEntity);

      if (!question) {
        throw new QuestionSaveFailedException('Update question failed!');
      }

      return question;
    } catch (error) {
      console.error(error);

      throw new ServerErrorException();
    }
  }

  public async deleteQuestion(
    user: UserEntity,
    questionId: string,
  ): Promise<void> {
    try {
      const existedQuestion = await this.questionRepository.findByCondition({
        id: questionId,
      });

      if (!existedQuestion) {
        throw new QuestionNotFoundException('Question does not exist!!');
      }

      if (existedQuestion.createdBy !== user.id) {
        throw new QuestionNotAllowToSave(
          'User does not have permission to delete this question',
        );
      }

      await this.questionRepository.delete(questionId);
    } catch {
      throw new ServerErrorException();
    }
  }

  public async uploadQuestions(file: IFile, user: UserEntity) {
    try {
      if (file && !this.validatorService.isExcel(file.mimetype)) {
        throw new FileNotExelException(
          'Only alow to upload exel file (.xlsx, .xls, .csv)',
        );
      }

      const data = this.fileService.parseExcelFIle(file);

      const questionsToInsert = data.map((question): QuestionEntity => {
        const questionType = question[COLUMN_IMPORT_QUESTIONS.TYPE];
        const questionContent = question[COLUMN_IMPORT_QUESTIONS.QUESTION];
        const correctAnswer = question[COLUMN_IMPORT_QUESTIONS.CORRECT_ANSWER];
        const topic = question[COLUMN_IMPORT_QUESTIONS.TOPIC];
        const tagNames = question[COLUMN_IMPORT_QUESTIONS.TAGS];
        const level = question[COLUMN_IMPORT_QUESTIONS.LEVEL];
        const status = question[COLUMN_IMPORT_QUESTIONS.STATUS];
        const lang = question[COLUMN_IMPORT_QUESTIONS.LANG];
        const heuristicLevel =
          question[COLUMN_IMPORT_QUESTIONS.HEURISTIC_LEVEL];
        const mode = question[COLUMN_IMPORT_QUESTIONS.MODE];
        const correctAnswerOrders = (correctAnswer?.toString() || '').split(
          ',',
        );

        const options = Object.keys(question)
          .map((column: string) => {
            if (
              !Object.values(COLUMN_IMPORT_QUESTIONS).includes(column) &&
              column.startsWith(ANSWER_START_WITH)
            ) {
              // TODO: get '1' from text: Đáp án (1)
              const matches = column.match(/\((.*?)\)/);
              const order = matches ? matches[1] : '0';
              const value = (correctAnswerOrders || []).includes(order);

              return <QuestionOption>{
                order: Number.parseInt(order, 10),
                option: question[column],
                value,
              };
            }
          })
          .filter((option: QuestionOption | undefined) => option);

        return <QuestionEntity>{
          question: questionContent,
          type: invert(MAP_QUESTION_TYPE)[questionType],
          options,
          heuristicLevel: invert(MAP_HEURISTIC_LEVEL)[heuristicLevel],
          status: invert(MAP_QUESTION_STATUS)[status],
          level,
          topic,
          tags: tagNames.split(','),
          language: lang || LANG.VIET,
          mode: invert(MAP_MODE)[mode],
          createdBy: user.id,
        };
      });

      return this.questionRepository.createMultiple(questionsToInsert);
    } catch (error) {
      throw new ServerErrorException((error as Error).message);
    }
  }
}
