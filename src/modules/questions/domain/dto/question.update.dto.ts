import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import {
  HeuristicLevel,
  QuestionStatus,
  QuestionType,
} from '../../constant/enum';
import { QuestionOptionsDto } from './question-options.dto';

export class QuestionUpdateDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty({
    enum: QuestionType,
  })
  @IsOptional()
  type: QuestionType;

  @ApiProperty({
    enum: HeuristicLevel,
  })
  @IsOptional()
  heuristicLevel: HeuristicLevel;

  @ApiProperty({
    enum: QuestionStatus,
  })
  @IsOptional()
  status: QuestionStatus;

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

  @ApiProperty({ default: false })
  @IsOptional()
  isPrivate: boolean;
}
