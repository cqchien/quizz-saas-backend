import { NotFoundException } from '@nestjs/common';

export class ExamNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message, 'error.exam.not_found');
  }
}
