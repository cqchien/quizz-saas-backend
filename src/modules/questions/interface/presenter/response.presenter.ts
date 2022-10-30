import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../../common/dto/page-meta.dto';
import { QuestionPresenter } from './question.presenter';

export class QuestionResponsePresenter {
  @ApiProperty({ type: QuestionPresenter || [QuestionPresenter] })
  data: QuestionPresenter | QuestionPresenter[] | undefined;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  meta?: PageMetaDto;

  constructor(
    data?: QuestionPresenter | QuestionPresenter[],
    meta?: PageMetaDto,
  ) {
    this.data = data ? data : undefined;
    this.success = true;
    this.meta = meta;
  }
}
