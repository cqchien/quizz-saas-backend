import type { ExamEntity } from '../../../exams/domain/entity/exam.entity';
import type { QuestionEntity } from '../../../questions/domain/entity/question.entity';
import type { UserEntity } from '../../../user/domain/entity/user.entity';
import type { UserExamScheduleEntity } from './schedule.entity';
import type { UserExamSettingEntity } from './setting.entity';

export class AnswerQuestionEntity {
  question: string;

  questionEntity?: QuestionEntity;

  answerOrder?: number;

  answerValue?: string | boolean;
}

export class UserExamEntity {
  id?: string;

  templateExam: string;

  templateExamEntity?: ExamEntity;

  user: string;

  userEntity?: UserEntity;

  schedule: UserExamScheduleEntity;

  setting: UserExamSettingEntity;

  code: string;

  name: string;

  description: string;

  type: string;

  questionBankType: string;

  status: string; // Not started, in-progress, submitted

  score: number;

  total: number;

  resultStatus: string;

  numberOfCorrectAnswer?: number;

  questions?: AnswerQuestionEntity[];

  updatedAt?: Date;

  createdAt?: Date;
}
