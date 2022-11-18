import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GroupPresenter } from '../../../group/interface/presenter/group.presenter';
import type { Schedule } from '../../domain/entity/schedule.entity';

export class SchedulePresenter {
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

  @ApiPropertyOptional({
    type: GroupPresenter,
  })
  assignedGroup?: GroupPresenter;

  constructor(schedule: Schedule) {
    this.code = schedule.code;
    this.time = schedule.time;
    this.endTime = schedule.endTime;
    this.startTime = schedule.startTime;
    this.status = schedule.status;
    this.assignedGroup = schedule.assignedGroupEntity
      ? new GroupPresenter(schedule.assignedGroupEntity)
      : undefined;
  }
}
