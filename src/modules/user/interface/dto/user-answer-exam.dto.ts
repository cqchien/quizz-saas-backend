import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserAnswerQuestionDto {
  @ApiProperty()
  questionId: string;

  @ApiProperty()
  @IsOptional()
  answerOrder: number;

  @ApiProperty()
  @IsOptional()
  answerValue: string | boolean;
}
