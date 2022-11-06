import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class ScheduleDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  time: number;

  @ApiProperty()
  @IsDate()
  startTime: Date;

  @ApiProperty()
  @IsDate()
  endTime: Date;

  @ApiPropertyOptional()
  @IsOptional()
  assignedGroup: string;
}
