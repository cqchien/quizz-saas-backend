import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class SchedulerDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsDate()
  startTime: Date;

  @ApiProperty()
  @IsDate()
  endTime: Date;
}
