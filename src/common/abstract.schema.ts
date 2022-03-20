import { Prop } from '@nestjs/mongoose';
import type { Types } from 'mongoose';

import type { AbstractSchemaDto } from './dto/abstract.schema.dto';
import { DtoService } from './utils';

export abstract class AbstractSchema<
  T extends AbstractSchemaDto = AbstractSchemaDto,
> {
  _id: Types.ObjectId;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;

  abstract dtoClass: new (schema: AbstractSchema) => T;

  toDto() {
    return DtoService.toDto(this.dtoClass, this);
  }
}
