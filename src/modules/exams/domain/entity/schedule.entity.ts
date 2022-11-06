import type { GroupEntity } from '../../../group/domain/entity/group.entity';

export class Schedule {
  code: string;

  time: number;

  status?: string;

  startTime: Date;

  endTime: Date;

  assignedGroup?: string;

  assignedGroupEntity?: GroupEntity;
}
