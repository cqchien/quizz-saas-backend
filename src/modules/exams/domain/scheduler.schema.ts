import { Prop } from '@nestjs/mongoose';

export class Scheduler {
  @Prop({
    index: true,
    unique: true,
    required: true,
  })
  code: string;

  @Prop()
  status: string;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;
}
