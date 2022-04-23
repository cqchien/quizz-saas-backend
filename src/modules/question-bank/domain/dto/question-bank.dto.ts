import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractSchemaDto } from '../../../../common/dto/abstract.schema.dto';
import { ApiEnumProperty } from '../../../../decorators';
import {
  HeuristicLevel,
  QuestionStatus,
  QuestionType,
} from '../../constant/enum';
import type { QuestionBank } from '../question-bank.schema';
import type { QuestionOptionsDto } from './question-options.dto';

export class QuestionBankDto extends AbstractSchemaDto {
  @ApiProperty()
  question: string;

  @ApiEnumProperty(() => QuestionType)
  type: QuestionType;

  @ApiEnumProperty(() => HeuristicLevel)
  heuristicLevel: HeuristicLevel;

  @ApiEnumProperty(() => QuestionStatus)
  status: QuestionStatus;

  @ApiPropertyOptional({ maximum: 10, minimum: 1 })
  level: number;

  @ApiPropertyOptional()
  topic: string;

  @ApiPropertyOptional()
  tags: string[];

  @ApiPropertyOptional()
  options: QuestionOptionsDto[];

  @ApiPropertyOptional()
  language: string;

  @ApiPropertyOptional()
  attachment: string[];

  @ApiPropertyOptional()
  isPrivate = false;

  @ApiPropertyOptional()
  createdBy: string;

  @ApiPropertyOptional()
  updatedBy: string;

  constructor(schema: QuestionBank) {
    super(schema);
    this.question = schema.question;
    this.type = schema.type;
    this.heuristicLevel = schema.heuristicLevel;
    this.status = schema.status;
    this.level = schema.level;
    this.topic = schema.topic;
    this.tags = schema.tags;
    this.options = schema.options;
    this.language = schema.language;
    this.attachment = schema.attachment;
    this.isPrivate = schema.isPrivate;
    this.createdBy = schema.createdBy;
    this.updatedBy = schema.updatedBy;
  }
}
