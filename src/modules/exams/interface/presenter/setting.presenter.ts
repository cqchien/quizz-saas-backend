import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SettingPresenter {
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
  showCam: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  timePerQuestion: number;

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
