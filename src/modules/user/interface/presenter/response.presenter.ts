import { ApiProperty } from '@nestjs/swagger';

import { UserPresenter } from './user.presenter';

export class UserResponsePresenter {
  @ApiProperty({ type: UserPresenter })
  data: UserPresenter;

  constructor(data: UserPresenter) {
    this.data = data;
  }
}
