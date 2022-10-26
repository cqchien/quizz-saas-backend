import { ApiProperty } from '@nestjs/swagger';

import { UserPresenter } from './user.presenter';
import { UserExamPresenter } from './user-exam.presenter';

export class UserResponsePresenter {
  @ApiProperty({ type: UserPresenter || UserExamPresenter })
  data: UserPresenter | UserExamPresenter;

  @ApiProperty()
  success: boolean;

  constructor(data: UserPresenter | UserExamPresenter) {
    this.data = data;
    this.success = true;
  }
}
