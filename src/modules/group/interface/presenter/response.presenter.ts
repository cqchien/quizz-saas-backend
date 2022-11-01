import { ApiProperty } from '@nestjs/swagger';

import { GroupPresenter } from './group.presenter';

export class UserResponsePresenter {
  @ApiProperty({
    type: GroupPresenter || [GroupPresenter],
  })
  data: GroupPresenter | GroupPresenter[];

  @ApiProperty()
  success: boolean;

  constructor(data: GroupPresenter | GroupPresenter[]) {
    this.data = data;
    this.success = true;
  }
}
