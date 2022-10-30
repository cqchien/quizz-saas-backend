import { ApiProperty } from '@nestjs/swagger';

import { UserPresenter } from '../../../user/interface/presenter/user.presenter';
import { LoginPresenter } from './login.presenter';

export class AuthResponsePresenter {
  @ApiProperty({ type: LoginPresenter || UserPresenter })
  data: LoginPresenter | UserPresenter;

  @ApiProperty()
  success: boolean;

  constructor(data: LoginPresenter | UserPresenter) {
    this.data = data;
    this.success = true;
  }
}
