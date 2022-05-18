import { Exclude, Transform, Type } from 'class-transformer';

import { UserDocument } from '../../user/domain/user.schema';
import type {
  HeuristicLevel,
  QuestionStatus,
  QuestionType,
} from '../constant/enum';
import type { QuestionOptionsDto } from '../domain/dto/question-options.dto';

export class QuestionGetSerialization {
  @Type(() => String)
  readonly _id: string;

  readonly type: QuestionType;

  readonly heuristicLevel: HeuristicLevel;

  readonly status: QuestionStatus;

  readonly level: number;

  readonly options: QuestionOptionsDto[];

  readonly topic: string;

  readonly tags: string[];

  readonly language: string;

  readonly attachment: string[];

  readonly isPrivate: boolean;

  @Transform(
    ({ value }) => ({
      name: value.name,
      role: value.role,
      email: value.email,
    }),
    { toClassOnly: true },
  )
  readonly createdBy: UserDocument;

  @Transform(
    // eslint-disable-next-line sonarjs/no-identical-functions
    ({ value }) => ({
      name: value.name,
      role: value.role,
      email: value.email,
    }),
    { toClassOnly: true },
  )
  readonly updatedBy: UserDocument;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  @Exclude()
  readonly __v: number;
}
