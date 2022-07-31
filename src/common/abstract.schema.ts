import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export abstract class AbstractSchema {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}
