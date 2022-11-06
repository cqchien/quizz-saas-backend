import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

import { Group } from '../../group/domain/group.schema';

export class Schedule {
  @Prop({
    index: true,
    required: true,
  })
  code: string;

  @Prop()
  time: number;

  @Prop()
  status: string;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({
    index: true,
    type: SchemaTypes.ObjectId,
    ref: Group.name,
  })
  assignedGroup?: Group;
}

export const scheduleSchema = SchemaFactory.createForClass(Schedule);
