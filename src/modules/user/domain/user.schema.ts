import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
import { RoleType } from '../../../constants';
import { UserDto } from './dtos/user.dto';

export type UserDocument = User & Document;

@Schema()
export class User extends AbstractSchema<UserDto> {
  @Prop()
  name: string;

  @Prop({ type: String, enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;

  dtoClass = UserDto;
}

export const userSchema = SchemaFactory.createForClass(User);
