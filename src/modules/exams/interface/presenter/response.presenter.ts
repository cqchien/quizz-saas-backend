import { ApiProperty } from '@nestjs/swagger';

import { ExamPresenter } from './exam.presenter';

export class ExamResponsePresenter {
  @ApiProperty({ type: ExamPresenter })
  data: ExamPresenter;

  @ApiProperty()
  success: boolean;

  constructor(data: ExamPresenter) {
    this.data = data;
    this.success = true;
  }
}
