import { Exclude } from 'class-transformer';

import { QuestionUpdateDto } from './question.update.dto';

export class QuestionCreateDto extends QuestionUpdateDto {
  @Exclude()
  id: string;
}
