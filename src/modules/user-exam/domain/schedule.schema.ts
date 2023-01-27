import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class UserExamSchedule {
  @Prop()
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
