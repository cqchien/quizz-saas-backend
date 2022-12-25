import { ApiProperty } from '@nestjs/swagger';

import type { UserEntity } from '../../../user/domain/entity/user.entity';
import { UserPresenter } from '../../../user/interface/presenter/user.presenter';
import type { QuestionEntity } from '../../domain/entity/question.entity';
import type { QuestionOptionsPresenter } from './question-options.presenter';

export class QuestionPresenter {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  heuristicLevel: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ maximum: 10, minimum: 1 })
  level?: number;

  @ApiProperty()
  topic?: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  options: QuestionOptionsPresenter[];

  @ApiProperty({ default: 'vi' })
  language: string;

  @ApiProperty()
  attachments?: string[];

  @ApiProperty()
  mode: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  createdBy?: UserPresenter;

  @ApiProperty()
  updatedBy?: string;

  constructor(entity: QuestionEntity) {
    this.id = entity.id;
    this.question = entity.question;
    this.type = entity.type;
    this.heuristicLevel = entity.heuristicLevel;
    this.status = entity.status;
    this.level = entity.level;
    this.topic = entity.topic;
    this.tags = entity.tags;
    this.options = entity.options;
    this.language = entity.language;
    this.attachments = entity.attachments;
    this.mode = entity.mode;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.createdBy = entity.createdBy
      ? new UserPresenter(entity.createdBy as unknown as UserEntity)
      : undefined;
    this.updatedBy = entity.updatedBy;
  }
}
