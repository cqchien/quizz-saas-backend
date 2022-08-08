import { BadRequestException } from '@nestjs/common';

export class QuestionSaveFailedException extends BadRequestException {
  constructor(message: string) {
    super(message, "error.question.save_failed");
  }
}
