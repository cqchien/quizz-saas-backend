import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { QUESTION_BANK_TYPE } from '../../constant';
import { SchedulerDto } from './scheduler.dto';
import { SettingDto } from './setting.dto';

export class ExamDto {
  @ApiProperty()
  @IsString()
  code: string;

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

  @ApiProperty({
    type: SchedulerDto,
    isArray: true,
  })
  scheduler: SchedulerDto[];
}
