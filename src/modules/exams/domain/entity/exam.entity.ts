import type { QuestionEntity } from '../../../questions/domain/entity/question.entity';
import type { UserEntity } from '../../../user/domain/entity/user.entity';
import type { UserExamEntity } from '../../../user-exam/domain/entity/user-exam.entity';
import type { Schedule } from './schedule.entity';
import type { Setting } from './setting.entity';

export class ExamEntity {
  id?: string;

  code: string;

  name: string;

  description: string;

  defaultQuestionNumber: number;

  type: string;

  questionBankType: string;

  questions: string[];

  questionEntities?: QuestionEntity[];

  setting: Setting;

  schedules: Schedule[];

  userExams?: UserExamEntity[];

  updatedAt?: Date;

  createdAt?: Date;

  createdBy?: string;

  createdByEntity?: UserEntity;

  updatedBy?: string;

  updatedByEntity?: UserEntity;
}
