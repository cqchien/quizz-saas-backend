import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ExamPresenter } from '../../../exams/interface/presenter/exam.presenter';
import { QuestionPresenter } from '../../../questions/interface/presenter/question.presenter';
import type { UserExamEntity } from '../../domain/entity/user-exam.entity';
import { UserExamSettingPresenter } from './setting.presenter';

export class AnswerQuestionPresenter {
  @ApiProperty({
    type: QuestionPresenter,
  })
  question?: QuestionPresenter;

  @ApiProperty()
  answerOrder?: number;

  @ApiProperty()
  answer?: string | boolean;
}

export class UserExamPresenter {
  @ApiProperty()
  id?: string;

  @ApiProperty({
    type: ExamPresenter,
  })
  templateExam?: ExamPresenter;

  @ApiProperty({
    type: UserExamSettingPresenter,
  })
  setting: UserExamSettingPresenter;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  scheduleCode: string;

  @ApiProperty()
  questionBankType: string;

  @ApiProperty({
    type: AnswerQuestionPresenter,
    isArray: true,
  })
  questions?: AnswerQuestionPresenter[];

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  constructor(entity: UserExamEntity) {
    this.id = entity.id;
    this.templateExam = entity.templateExamEntity
      ? new ExamPresenter(entity.templateExamEntity)
      : undefined;
    this.code = entity.code;
    this.name = entity.name;
    this.description = entity.description;
    this.scheduleCode = entity.scheduleCode;
    this.setting = entity.setting;
    this.status = entity.status;
    this.type = entity.type;
    this.questionBankType = entity.questionBankType;
    this.questions = (entity.questions || []).map((answerQuestionEntity) => ({
      question:
        answerQuestionEntity.questionEntity &&
        new QuestionPresenter(answerQuestionEntity.questionEntity),
      answerOrder: answerQuestionEntity.answerOrder,
      answer: answerQuestionEntity.answers,
    }));
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
