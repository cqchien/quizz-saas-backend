import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { StringFieldOptional } from '../../../../decorators';
import { QUESTION_BANK_TYPE } from '../../../exams/constant';

export class QueryQuestionDto {
  @StringFieldOptional()
  question: string;

  @StringFieldOptional()
  tags: string;

  @StringFieldOptional()
  topic: string;

  @ApiPropertyOptional({
    type: QUESTION_BANK_TYPE,
  })
  @IsOptional()
  type: string;
}
