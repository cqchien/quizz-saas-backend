import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { QuestionPresenter } from '../../../questions/interface/presenter/question.presenter';
import { UserPresenter } from '../../../user/interface/presenter/user.presenter';
import { QUESTION_BANK_TYPE } from '../../constant';
import type { ExamEntity } from '../../domain/entity/exam.entity';
import { SchedulerPresenter } from './scheduler.presenter';
import { SettingPresenter } from './setting.presenter';

export class ExamPresenter {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  defaultQuestionNumber: number;

  @ApiProperty()
  time: string;

  @ApiProperty()
  type: string;

  @ApiProperty({
    enum: QUESTION_BANK_TYPE,
  })
  quesstionBankType: string;

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
    type: SchedulerPresenter,
    isArray: true,
  })
  scheduler: SchedulerPresenter[];

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
    this.name = entity.name;
    this.description = entity.description;
    this.defaultQuestionNumber = entity.defaultQuestionNumber;
    this.time = entity.time;
    this.type = entity.type;
    this.quesstionBankType = entity.quesstionBankType;
    this.questions = (entity.questionEntities || []).map(
      (questionEntity) => new QuestionPresenter(questionEntity),
    );
    this.setting = entity.setting;
    this.scheduler = entity.scheduler;
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
