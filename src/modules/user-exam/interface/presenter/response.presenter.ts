import { ApiProperty } from '@nestjs/swagger';

import { UserExamPresenter } from './user-exam.presenter';

export class UserExamResponsePresenter {
  @ApiProperty({
    type: UserExamPresenter || [UserExamPresenter],
  })
  data: UserExamPresenter | UserExamPresenter[];

  @ApiProperty()
  success: boolean;

  constructor(data: UserExamPresenter | UserExamPresenter[]) {
    this.data = data;
    this.success = true;
  }
}
