import { Exclude, Type } from 'class-transformer';

import { UserDocument } from '../../user/domain/user.schema';
import type {
  HeuristicLevel,
  QuestionStatus,
  QuestionType,
} from '../constant/enum';
import type { QuestionOptionsDto } from '../domain/dto/question-options.dto';

export class QuestionListSerialization {
  @Type(() => String)
  readonly _id: string;

  readonly type: QuestionType;

  readonly heuristicLevel: HeuristicLevel;

  readonly status: QuestionStatus;

  readonly level: number;

  readonly topic: string;

  readonly tags: string[];

  readonly language: string;

  readonly isPrivate: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  @Exclude()
  readonly __v: number;

  @Exclude()
  readonly options: QuestionOptionsDto[];

  @Exclude()
  readonly createdBy: UserDocument;

  @Exclude()
  readonly updatedBy: UserDocument;

  @Exclude()
  readonly attachment: string[];
}
