import { NotFoundException } from '@nestjs/common';

export class QuestionNotAllowToSave extends NotFoundException {
  constructor(message?: string) {
    super(message, 'error.question.not_allow_to_save');
  }
}
