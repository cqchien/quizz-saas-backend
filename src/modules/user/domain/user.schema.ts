/* eslint-disable no-invalid-this */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
import { generateHash } from '../../../common/utils';
import { RoleType } from '../../../constants';

@Schema()
export class User extends AbstractSchema {
  @Prop({
    required: true,
    index: true,
  })
  name: string;

  @Prop({ type: String, enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Prop({
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;
}

export const userSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

userSchema.pre<UserDocument>('save', function (this, next) {
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  this.password = generateHash(this.password);

  next();
});
