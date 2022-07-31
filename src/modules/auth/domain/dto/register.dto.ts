import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { Trim } from '../../../../decorators/transform.decorators';

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
