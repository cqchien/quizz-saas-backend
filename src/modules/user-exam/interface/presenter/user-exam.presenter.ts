import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ExamPresenter } from '../../../exams/interface/presenter/exam.presenter';
import { QuestionPresenter } from '../../../questions/interface/presenter/question.presenter';
import { UserPresenter } from '../../../user/interface/presenter/user.presenter';
import { MAP_RESULT_EXAM_STATUS } from '../../constant';
import type { UserExamEntity } from '../../domain/entity/user-exam.entity';
import { UserExamSchedulePresenter } from './schedule.presenter';
import { UserExamSettingPresenter } from './setting.presenter';

export class AnswerQuestionPresenter {
  @ApiProperty({
    type: QuestionPresenter,
  })
  question?: QuestionPresenter;

  @ApiProperty()
  answerOrder?: number;

  @ApiProperty()
  answerValue?: string | boolean;
}

export class UserExamPresenter {
  @ApiProperty()
  id?: string;

  @ApiProperty({
    type: ExamPresenter,
  })
  templateExam?: ExamPresenter;

  @ApiProperty({
    type: UserPresenter,
  })
  user?: UserPresenter;

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

  @ApiProperty({
    type: UserExamSchedulePresenter,
  })
  schedule: UserExamSchedulePresenter;

  @ApiProperty()
  score: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  numberOfCorrectAnswer?: number;

  @ApiProperty()
  resultStatus: string;

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
    this.user = entity.userEntity
      ? new UserPresenter(entity.userEntity)
      : undefined;
    this.code = entity.code;
    this.name = entity.name;
    this.description = entity.description;
    this.schedule = entity.schedule;
    this.setting = entity.setting;
    this.status = entity.status;
    this.type = entity.type;
    this.score = entity.score || 0;
    this.total = entity.total || 0;
    this.numberOfCorrectAnswer = entity.numberOfCorrectAnswer;
    this.resultStatus = MAP_RESULT_EXAM_STATUS[entity.resultStatus];
    this.questionBankType = entity.questionBankType;
    this.questions = (entity.questions || []).map((answerQuestionEntity) => ({
      question:
        answerQuestionEntity.questionEntity &&
        new QuestionPresenter(answerQuestionEntity.questionEntity),
      answerOrder: answerQuestionEntity.answerOrder,
      answerValue: answerQuestionEntity.answerValue,
    }));
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
