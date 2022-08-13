import { ConflictException } from '@nestjs/common';

export class QuestionExistException extends ConflictException {
  constructor(message: string) {
    super(message, 'error.question.exist');
  }
}
