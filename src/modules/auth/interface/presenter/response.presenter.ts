import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../../../user/domain/entity/user.entity';
import { LoginPresenter } from './login.presenter';

export class AuthResponsePresenter {
  @ApiProperty({ type: LoginPresenter || UserEntity })
  data: LoginPresenter | UserEntity;

  constructor(data: LoginPresenter | UserEntity) {
    this.data = data;
  }
}
