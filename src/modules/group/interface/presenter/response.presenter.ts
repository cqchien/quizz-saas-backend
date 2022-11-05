import { ApiProperty } from '@nestjs/swagger';

import { GroupPresenter } from './group.presenter';

export class GroupResponsePresenter {
  @ApiProperty({
    type: GroupPresenter || [GroupPresenter] || {},
  })
  data: GroupPresenter | GroupPresenter[] | Record<string, string>;

  @ApiProperty()
  success: boolean;

  constructor(
    data: GroupPresenter | GroupPresenter[] | Record<string, string>,
  ) {
    this.data = data;
    this.success = true;
  }
}
