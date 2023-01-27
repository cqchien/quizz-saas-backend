import { ApiProperty } from '@nestjs/swagger';

import type { UserExamScheduleEntity } from '../../domain/entity/schedule.entity';

export class UserExamSchedulePresenter {
  @ApiProperty()
  code: string;

  @ApiProperty()
  time: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  status?: string;

  constructor(schedule: UserExamScheduleEntity) {
    this.code = schedule.code;
    this.time = schedule.time;
    this.endTime = schedule.endTime;
    this.startTime = schedule.startTime;
    this.status = schedule.status;
  }
}
