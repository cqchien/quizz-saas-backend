/* eslint-disable no-invalid-this */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { NextFunction } from 'express';
import { SchemaTypes } from 'mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
import { Question } from '../../questions/domain/question.schema';
import { User } from '../../user/domain/user.schema';
import type { ExamEntity } from './entity/exam.entity';

export class Setting {
  @Prop()
  plusScorePerQuestion: number;

  @Prop()
  minusScorePerQuestion: number;

  @Prop()
  viewPassQuestion: boolean;

  @Prop()
  viewNextQuestion: boolean;

  @Prop()
  showAllQuestion: boolean;

  @Prop()
  timePerQuestion: string;

  @Prop()
  shufflingExams: number;

  @Prop()
  hideResult: boolean;

  @Prop()
  percentageToPass: number;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;
}

@Schema()
export class Exam extends AbstractSchema {
  @Prop({
    required: true,
    index: true,
  })
  code: string;

  @Prop({
    required: true,
    index: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  defaultQuestionNumber: number;

  @Prop()
  time: string;

  @Prop()
  status: string;

  @Prop()
  type: string;

  @Prop()
  quesstionBankType: string;

  @Prop({
    type: [
      {
        type: SchemaTypes.ObjectId,
        ref: Question.name,
      },
    ],
  })
  questions: Question[];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  createdBy: User;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  updatedBy: User;

  @Prop({ type: () => Setting })
  setting: Setting;
}

export const examSchema = SchemaFactory.createForClass(Exam);
export type ExamDocument = Exam & Document;

examSchema.pre<ExamEntity>(
  'save',
  function (this: ExamEntity, next: NextFunction) {
    const now = new Date();

    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now;
    }

    next();
  },
);
