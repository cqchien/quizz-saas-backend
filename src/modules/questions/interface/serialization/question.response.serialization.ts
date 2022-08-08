import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../../common/dto/page-meta.dto';
import type { QuestionGetSerialization } from './question.get.serialization';
import type { QuestionListSerialization } from './question.list.serialization';

export class QuestionResponseSerialization {
  @ApiProperty()
  readonly data: QuestionGetSerialization | QuestionListSerialization[];

  @ApiProperty()
  readonly meta?: PageMetaDto;

  constructor(
    data: QuestionGetSerialization | QuestionListSerialization[],
    meta?: PageMetaDto
  ) {
    this.data = data;
    this.meta = meta;
  }
}
