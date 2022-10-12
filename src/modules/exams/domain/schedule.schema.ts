import { Prop } from '@nestjs/mongoose';

export class Schedule {
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
