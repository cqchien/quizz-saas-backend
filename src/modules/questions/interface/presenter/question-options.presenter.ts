import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QuestionOptionsPresenter {
  @ApiProperty()
  order: number;

  @ApiProperty()
  @IsOptional()
  option: string;
}
