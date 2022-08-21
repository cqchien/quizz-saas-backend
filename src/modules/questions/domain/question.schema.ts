/* eslint-disable no-invalid-this */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { NextFunction } from 'express';
import type { Document } from 'mongoose';
import { Types } from 'mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
import { User } from '../../user/domain/user.schema';
import type { QuestionOptionsDto } from '../interface/dto/question-options.dto';
import type { QuestionEntity } from './entity/question.entity';

@Schema()
export class Question extends AbstractSchema {
  @Prop()
  question: string;

  @Prop({ name: 'ype', type: String })
  type: string;

  @Prop({ name: 'heuristic_level', type: String })
  heuristicLevel: string;

  @Prop({ name: 'status', type: String })
  status: string;

  @Prop({ name: 'quantity_level', max: 10, min: 1 })
  level: number;

  @Prop({ name: 'options', type: Array })
  options: QuestionOptionsDto[];

  @Prop()
  topic: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop()
  language: string;

  @Prop({ type: [String] })
  attachments: string[];

  @Prop()
  mode: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: User.name,
  })
  createdBy: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: User.name,
  })
  updatedBy: string;
}

export const questionSchema = SchemaFactory.createForClass(Question);
export type QuestionDocument = Question & Document;

questionSchema.pre<QuestionEntity>(
  'save',
  function (this: QuestionEntity, next: NextFunction) {
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now;
    }

    next();
  },
);
