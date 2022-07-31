import { ApiProperty } from '@nestjs/swagger';

import { UserPresenter } from '../../../user/domain/presenter/user.presenter';
import { TokenPresenter } from './token.presenter';

export class LoginPresenter {
  @ApiProperty({ type: UserPresenter })
  user: UserPresenter;

  @ApiProperty({ type: TokenPresenter })
  token: TokenPresenter;

  constructor(user: UserPresenter, token: TokenPresenter) {
    this.user = user;
    this.token = token;
  }
}
