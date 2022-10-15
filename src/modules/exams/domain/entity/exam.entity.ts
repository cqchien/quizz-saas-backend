import type { QuestionEntity } from '../../../questions/domain/entity/question.entity';
import type { UserEntity } from '../../../user/domain/entity/user.entity';
import type { Schedule } from './schedule.entity';
import type { Setting } from './setting.entity';

export class ExamEntity {
  id?: string;

  code: string;

  name: string;

  description: string;

  defaultQuestionNumber: number;

  time: number;

  status: string;

  type: string;

  quesstionBankType: string;

  questions: string[];

  questionEntities?: QuestionEntity[];

  setting: Setting;

  schedules: Schedule[];

  updatedAt?: Date;

  createdAt?: Date;

  createdBy?: string;

  createdByEntity?: UserEntity;

  updatedBy?: string;

  updatedByEntity?: UserEntity;
}
