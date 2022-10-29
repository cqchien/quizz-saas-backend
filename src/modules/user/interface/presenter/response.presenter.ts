import { ApiProperty } from '@nestjs/swagger';

import { UserPresenter } from './user.presenter';
import { UserExamPresenter } from './user-exam.presenter';

export class UserResponsePresenter {
  @ApiProperty({
    type: UserPresenter || UserExamPresenter || [UserExamPresenter],
  })
  data: UserPresenter | UserExamPresenter | UserExamPresenter[];

  @ApiProperty()
  success: boolean;

  constructor(data: UserPresenter | UserExamPresenter | UserExamPresenter[]) {
    this.data = data;
    this.success = true;
  }
}
