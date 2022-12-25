import { Prop } from '@nestjs/mongoose';

export class Setting {
  @Prop()
  plusScorePerQuestion: number;

  @Prop()
  minusScorePerQuestion: number;

  @Prop()
  viewPassQuestion: boolean;

  @Prop()
  viewNextQuestion: boolean;

  @Prop()
  showCam: boolean;

  @Prop()
  timePerQuestion: number;

  @Prop()
  shufflingExams: number;

  @Prop()
  hideResult: boolean;

  @Prop()
  percentageToPass: number;
}
