import { ApiProperty } from '@nestjs/swagger';

export class SchedulerPresenter {
  @ApiProperty()
  code: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;
}
