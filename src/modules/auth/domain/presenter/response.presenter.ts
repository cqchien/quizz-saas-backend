import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../../user/domain/entity/user.entity';
import { LoginPresenter } from './login.presenter';

export class AuthResponsePresenter {
  @ApiProperty({ type: LoginPresenter || User })
  data: LoginPresenter | User;

  constructor(data: LoginPresenter | User) {
    this.data = data;
  }
}
