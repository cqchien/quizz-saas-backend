import { Prop } from '@nestjs/mongoose';

export abstract class AbstractSchema {
  _id: string;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}
