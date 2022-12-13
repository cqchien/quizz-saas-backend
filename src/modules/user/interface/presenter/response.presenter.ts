import { ApiProperty } from '@nestjs/swagger';

import { UserPresenter } from './user.presenter';

export class UserResponsePresenter {
  @ApiProperty({
    type: UserPresenter || [UserPresenter],
  })
  data: UserPresenter | UserPresenter[];

  @ApiProperty()
  success: boolean;

  constructor(data: UserPresenter | UserPresenter[]) {
    this.data = data;
    this.success = true;
  }
}
