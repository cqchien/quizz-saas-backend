import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QuestionOptionsDto {
  @ApiProperty()
  @IsOptional()
  order: number;

  @ApiProperty()
  @IsOptional()
  option: string;

  @ApiProperty()
  @IsOptional()
  value: string | boolean;
}
