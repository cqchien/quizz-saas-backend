import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuestionOptionsDto {
  @ApiPropertyOptional()
  option: string;

  @ApiPropertyOptional()
  value: boolean | string;
}
