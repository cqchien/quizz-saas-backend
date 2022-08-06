import { ApiProperty } from '@nestjs/swagger';

import { UserPresenter } from './user.presenter';

export class UserResponsePresenter {
  @ApiProperty({ type: UserPresenter })
  data: UserPresenter;

  @ApiProperty()
  success: boolean;

  constructor(data: UserPresenter) {
    this.data = data;
    this.success = true;
  }
}
