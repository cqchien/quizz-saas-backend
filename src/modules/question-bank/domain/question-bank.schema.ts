import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document } from 'mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
import { HeuristicLevel, QuestionStatus, QuestionType } from '../constant/enum';
import { QuestionBankDto } from './dto/question-bank.dto';
import { QuestionOptionsDto } from './dto/question-options.dto';

export type QuestionBankDocument = QuestionBank & Document;

@Schema()
export class QuestionBank extends AbstractSchema<QuestionBankDto> {
  @Prop()
  question: string;

  @Prop({ name: 'question_type', type: 'enum' })
  type: QuestionType;

  @Prop({ name: 'heuristic_level', type: 'enum' })
  heuristicLevel: HeuristicLevel;

  @Prop({ name: 'question_status', type: 'enum' })
  status: QuestionStatus;

  @Prop({ name: 'quantity_level', max: 10, min: 1 })
  level: number;

  @Prop({ name: 'quantity_level', type: [QuestionOptionsDto] })
  options: QuestionOptionsDto[];

  @Prop()
  topic: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop()
  language: string;

  @Prop({ type: [String] })
  attachment: string[];

  @Prop()
  isPrivate: boolean;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  dtoClass = QuestionBankDto;
}

export const questionBankSchema = SchemaFactory.createForClass(QuestionBank);
