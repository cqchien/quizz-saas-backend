import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryGroupDto {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;
}
