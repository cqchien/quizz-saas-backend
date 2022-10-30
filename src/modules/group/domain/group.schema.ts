/* eslint-disable no-invalid-this */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
import { User } from '../../user/domain/user.schema';

@Schema()
export class Group extends AbstractSchema {
  @Prop({
    required: true,
    index: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        type: SchemaTypes.ObjectId,
        ref: User.name,
      },
    ],
  })
  members: User[];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  createdBy: User;
}

export const groupSchema = SchemaFactory.createForClass(Group);
export type GroupDocument = Group & Document;
