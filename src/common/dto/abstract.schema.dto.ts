import { ApiProperty } from '@nestjs/swagger';

import type { AbstractSchema } from '../abstract.schema';

export class AbstractSchemaDto {
  @ApiProperty()
  _id: string;

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
