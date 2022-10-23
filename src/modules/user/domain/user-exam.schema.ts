import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
import { Exam } from '../../exams/domain/exam.schema';
import { Question } from '../../questions/domain/question.schema';

@Schema()
export class AnswerQuestion {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Question.name,
  })
  question: string;

  @Prop()
  answerOrder: number;

  @Prop({
    type: String || Boolean,
  })
  answers: string | boolean;
}
export const examQuestionSchema = SchemaFactory.createForClass(AnswerQuestion);

@Schema()
export class UserExam extends AbstractSchema {
  @Prop({
    required: true,
    index: true,
    type: SchemaTypes.ObjectId,
    ref: Exam.name,
  })
  templateExam: string;

  @Prop()
  scheduleCode: string;

  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  status: string;

  @Prop()
  type: string;

  @Prop()
  questionBankType: string;

  @Prop({ type: [examQuestionSchema] })
  questions: AnswerQuestion[];
}

export const userExamSchema = SchemaFactory.createForClass(UserExam);
export type UserExamDocument = UserExam & Document;
