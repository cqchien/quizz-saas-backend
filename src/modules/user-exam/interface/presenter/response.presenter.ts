import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PageMetaDto } from '../../../../common/dto/page-meta.dto';
import { UserExamPresenter } from './user-exam.presenter';

export class UserExamResponsePresenter {
  @ApiProperty({
    type: UserExamPresenter || [UserExamPresenter],
  })
  data: UserExamPresenter | UserExamPresenter[];

  @ApiProperty()
  success: boolean;

  @ApiPropertyOptional()
  meta?: PageMetaDto;

  constructor(
    data: UserExamPresenter | UserExamPresenter[],
    meta?: PageMetaDto,
  ) {
    this.data = data;
    this.meta = meta;
    this.success = true;
  }
}
