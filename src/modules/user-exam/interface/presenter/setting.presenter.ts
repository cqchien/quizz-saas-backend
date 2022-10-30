import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserExamSettingPresenter {
  @ApiPropertyOptional()
  plusScorePerQuestion: number;

  @ApiPropertyOptional()
  minusScorePerQuestion: number;

  @ApiPropertyOptional()
  viewPassQuestion: boolean;

  @ApiPropertyOptional()
  viewNextQuestion: boolean;

  @ApiPropertyOptional()
  showAllQuestion: boolean;

  @ApiPropertyOptional()
  timePerQuestion: number;

  @ApiPropertyOptional()
  shufflingExams: number;

  @ApiPropertyOptional()
  hideResult: boolean;

  @ApiPropertyOptional()
  percentageToPass: number;
}
