import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../user/domain/dtos/user.dto';
import type { UserGetSerialization } from '../../user/serialization/user.get.serialization';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: UserGetSerialization, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
