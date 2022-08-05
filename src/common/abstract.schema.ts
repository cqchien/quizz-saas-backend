import { Prop } from '@nestjs/mongoose';
import type { Types } from 'mongoose';

export abstract class AbstractSchema {
  _id: Types.ObjectId;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}
