import { ApiProperty } from '@nestjs/swagger';

export class SchedulePresenter {
  @ApiProperty()
  code: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;
}
