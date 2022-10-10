import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SettingDto {
  @ApiPropertyOptional()
  @IsOptional()
  plusScorePerQuestion: number;

  @ApiPropertyOptional()
  @IsOptional()
  minusScorePerQuestion: number;

  @ApiPropertyOptional()
  @IsOptional()
  viewPassQuestion: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  viewNextQuestion: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  showAllQuestion: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  timePerQuestion: string;

  @ApiPropertyOptional()
  @IsOptional()
  shufflingExams: number;

  @ApiPropertyOptional()
  @IsOptional()
  hideResult: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  percentageToPass: number;
}
