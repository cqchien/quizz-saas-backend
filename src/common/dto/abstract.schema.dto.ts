import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import type { AbstractSchema } from '../abstract.schema';

export class AbstractSchemaDto {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(schema: AbstractSchema) {
    this._id = schema._id;
    this.createdAt = schema.createdAt;
    this.updatedAt = schema.updatedAt;
  }
}
