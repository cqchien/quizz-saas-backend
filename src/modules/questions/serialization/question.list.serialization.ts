import { Exclude, Type } from 'class-transformer';

import type {
  HeuristicLevel,
  QuestionStatus,
  QuestionType,
} from '../../question-bank/constant/enum';
import type { QuestionOptionsDto } from '../../question-bank/domain/dto/question-options.dto';
import { UserDocument } from '../../user/domain/user.schema';

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
