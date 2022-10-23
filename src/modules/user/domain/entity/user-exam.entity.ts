import type { ExamEntity } from '../../../exams/domain/entity/exam.entity';
import type { QuestionEntity } from '../../../questions/domain/entity/question.entity';

class AnswerQuestion {
  question: string;

  questionEntity?: QuestionEntity;

  answerOrder?: number;

  answers?: string | boolean;
}

export class UserExamEntity {
  id?: string;

  templateExam: string;

  templateExamEntity?: ExamEntity;

  scheduleCode: string;

  code: string;

  name: string;

  description: string;

  type: string;

  questionBankType: string;

  questions?: AnswerQuestion[];

  status: string; // Not started, in-progress, submitted

  updatedAt?: Date;

  createdAt?: Date;
}
