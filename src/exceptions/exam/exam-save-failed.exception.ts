import { BadRequestException } from '@nestjs/common';

export class ExamSaveFailedException extends BadRequestException {
  constructor(message: string) {
    super(message, 'error.exam.save_failed');
  }
}
