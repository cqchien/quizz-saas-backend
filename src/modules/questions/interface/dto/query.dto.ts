import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { StringFieldOptional } from '../../../../decorators';
import { QUESTION_BANK_TYPE } from '../../../exams/constant';

export class QueryQuestionDto {
  @StringFieldOptional()
  @IsOptional()
  question: string;

  @StringFieldOptional()
  @IsOptional()
  tags: string;

  @StringFieldOptional()
  @IsOptional()
  topic: string;

  @StringFieldOptional()
  @IsOptional()
  createdBy: string;

  @ApiPropertyOptional({
    type: QUESTION_BANK_TYPE,
  })
  @IsOptional()
  type: string;
}
