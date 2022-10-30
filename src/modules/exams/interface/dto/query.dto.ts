import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryExamDto {
  @ApiPropertyOptional()
  @IsOptional()
  code: string;
}
