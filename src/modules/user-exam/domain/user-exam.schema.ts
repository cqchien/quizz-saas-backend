/* eslint-disable no-invalid-this */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { NextFunction } from 'express';
import { SchemaTypes } from 'mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
import { Exam } from '../../exams/domain/exam.schema';
import { Question } from '../../questions/domain/question.schema';
import { User } from '../../user/domain/user.schema';
import type { UserExamEntity } from './entity/user-exam.entity';
import { UserExamSchedule } from './schedule.schema';
import { UserExamSetting } from './setting.schema';

@Schema()
export class AnswerQuestion {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Question.name,
  })
  question: Question;

  @Prop()
  answerOrder: number;

  @Prop({
    type: String || Boolean,
  })
  answerValue: string | boolean;
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
  templateExam: Exam;

  @Prop({
    required: true,
    index: true,
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({
    type: () => UserExamSchedule,
  })
  schedule: UserExamSchedule;

  @Prop({
    type: () => UserExamSetting,
  })
  setting: UserExamSetting;

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

  @Prop({
    default: 0,
  })
  score: number;

  @Prop({
    default: 0,
  })
  total: number;

  @Prop()
  resultStatus: string;

  @Prop()
  questionBankType: string;

  @Prop({ type: [examQuestionSchema] })
  questions: AnswerQuestion[];
}

export const userExamSchema = SchemaFactory.createForClass(UserExam);
export type UserExamDocument = UserExam & Document;

userExamSchema.pre<UserExamEntity>(
  'save',
  function (this: UserExamEntity, next: NextFunction) {
    const now = new Date();

    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now;
    }

    next();
  },
);
