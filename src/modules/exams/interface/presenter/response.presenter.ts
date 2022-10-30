import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../../common/dto/page-meta.dto';
import { ExamPresenter } from './exam.presenter';

export class ExamResponsePresenter {
  @ApiProperty({ type: ExamPresenter || [ExamPresenter] || {} })
  data: ExamPresenter | ExamPresenter[] | Record<string, string>;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  meta?: PageMetaDto;

  constructor(
    data: ExamPresenter | ExamPresenter[] | Record<string, string>,
    meta?: PageMetaDto,
  ) {
    this.data = data;
    this.meta = meta;
    this.success = true;
  }
}
