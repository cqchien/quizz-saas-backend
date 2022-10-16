import { Prop } from '@nestjs/mongoose';

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
}
