import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import {
  HEURISTIC_LEVEL,
  MODE,
  QUESTION_STATUS,
  QUESTION_TYPE,
} from '../../constant';
import { QuestionOptionsDto } from './question-options.dto';

export class QuestionDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty({
    enum: QUESTION_TYPE,
  })
  @IsOptional()
  type: string;

  @ApiProperty({
    enum: HEURISTIC_LEVEL,
  })
  @IsOptional()
  heuristicLevel: string;

  @ApiProperty({
    enum: QUESTION_STATUS,
  })
  @IsOptional()
  status: string;

  @ApiProperty({ maximum: 10, minimum: 1 })
  @IsOptional()
  level: number;

  @ApiProperty()
  @IsOptional()
  topic: string;

  @ApiProperty()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    type: QuestionOptionsDto,
    isArray: true,
  })
  @IsOptional()
  options: QuestionOptionsDto[];

  @ApiProperty({ default: 'vi' })
  @IsOptional()
  language: string;

  @ApiProperty()
  @IsOptional()
  attachment: string[];

  @ApiProperty({
    enum: MODE,
  })
  @IsOptional()
  mode: string;
}
