import type { QuestionEntity } from '../../../questions/domain/entity/question.entity';
import type { UserEntity } from '../../../user/domain/entity/user.entity';

class Setting {
  plusScorePerQuestion: number;

  minusScorePerQuestion: number;

  viewPassQuestion: boolean;

  viewNextQuestion: boolean;

  showAllQuestion: boolean;

  timePerQuestion: string;

  shufflingExams: number; // the number of the exam need to be generate for shuffling

  hideResult: boolean;

  percentageToPass: number;

  startTime: Date;

  endTime: Date;
}

export class ExamEntity {
  id?: string;

  code: string;

  name: string;

  description: string;

  defaultQuestionNumber: number;

  time: string;

  status: string;

  type: string;

  quesstionBankType: string;

  questions: string[];

  questionEntities?: QuestionEntity[];

  setting: Setting;

  updatedAt?: Date;

  createdAt?: Date;

  createdBy?: string;

  createdByEntity?: UserEntity;

  updatedBy?: string;

  updatedByEntity?: UserEntity;
}
