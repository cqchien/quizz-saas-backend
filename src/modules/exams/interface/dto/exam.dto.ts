import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { QUESTION_BANK_TYPE } from '../../constant';

class SettingDto {
  @ApiProperty()
  plusScorePerQuestion: number;

  @ApiProperty()
  minusScorePerQuestion: number;

  @ApiProperty()
  viewPassQuestion: boolean;

  @ApiProperty()
  viewNextQuestion: boolean;

  @ApiProperty()
  showAllQuestion: boolean;

  @ApiProperty()
  timePerQuestion: string;

  @ApiProperty()
  shufflingExams: number;

  @ApiProperty()
  hideResult: boolean;

  @ApiProperty()
  percentageToPass: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;
}

export class ExamDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  defaultQuestionNumber: number;

  @ApiProperty()
  @IsString()
  time: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty({
    enum: QUESTION_BANK_TYPE,
  })
  @IsOptional()
  quesstionBankType: string;

  @ApiProperty()
  @IsNotEmpty()
  questions: string[];

  @ApiProperty()
  @IsNotEmpty()
  setting: SettingDto;
}
