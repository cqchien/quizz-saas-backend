import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserAnswerQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty()
  @IsOptional()
  answerOrder: number;

  @ApiProperty()
  @IsOptional()
  answerValue: string | boolean;
}

export class UserAnswersDto {
  @ApiProperty({
    type: UserAnswerQuestionDto,
    isArray: true,
  })
  @IsNotEmpty()
  answers: UserAnswerQuestionDto[];
}
