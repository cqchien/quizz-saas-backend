import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { QuestionPresenter } from '../../../questions/interface/presenter/question.presenter';
import { UserPresenter } from '../../../user/interface/presenter/user.presenter';
import { UserExamPresenter } from '../../../user-exam/interface/presenter/user-exam.presenter';
import { QUESTION_BANK_TYPE } from '../../constant';
import type { ExamEntity } from '../../domain/entity/exam.entity';
import { SchedulePresenter } from './schedule.presenter';
import { SettingPresenter } from './setting.presenter';

export class ExamPresenter {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  defaultQuestionNumber: number;

  @ApiProperty()
  time: number;

  @ApiProperty()
  type: string;

  @ApiProperty({
    enum: QUESTION_BANK_TYPE,
  })
  questionBankType: string;

  @ApiProperty({
    type: QuestionPresenter,
    isArray: true,
  })
  questions: QuestionPresenter[];

  @ApiProperty({
    type: SettingPresenter,
  })
  setting: SettingPresenter;

  @ApiProperty({
    type: SchedulePresenter,
    isArray: true,
  })
  schedules: SchedulePresenter[];

  @ApiProperty({
    type: UserExamPresenter,
  })
  userExams?: UserExamPresenter[];

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiPropertyOptional()
  createdBy?: UserPresenter;

  @ApiPropertyOptional()
  updatedBy?: UserPresenter;

  constructor(entity: ExamEntity) {
    this.id = entity.id;
    this.code = entity.code;
    this.name = entity.name;
    this.description = entity.description;
    this.defaultQuestionNumber = entity.defaultQuestionNumber;
    this.type = entity.type;
    this.questionBankType = entity.questionBankType;
    this.questions = (entity.questionEntities || []).map(
      (questionEntity) => new QuestionPresenter(questionEntity),
    );
    this.setting = entity.setting;
    this.schedules = entity.schedules.map(
      (schedule) => new SchedulePresenter(schedule),
    );
    this.userExams = (entity.userExams || []).map(
      (userExamEntity) => new UserExamPresenter(userExamEntity),
    );
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.createdBy = entity.createdByEntity
      ? new UserPresenter(entity.createdByEntity)
      : undefined;
    this.updatedBy = entity.updatedByEntity
      ? new UserPresenter(entity.updatedByEntity)
      : undefined;
  }
}
