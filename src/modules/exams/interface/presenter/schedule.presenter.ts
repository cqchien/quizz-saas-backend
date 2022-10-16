import { ApiProperty } from '@nestjs/swagger';

export class SchedulePresenter {
  @ApiProperty()
  code: string;

  @ApiProperty()
  time: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;
}
