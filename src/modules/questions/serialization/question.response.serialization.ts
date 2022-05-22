import type { PageMetaDto } from '../../../common/dto/page-meta.dto';
import type { QuestionGetSerialization } from './question.get.serialization';
import type { QuestionListSerialization } from './question.list.serialization';

export class QuestionResponseSerialization {
  readonly data: QuestionGetSerialization | QuestionListSerialization[];

  readonly meta: PageMetaDto;
}
