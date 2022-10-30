import { BadRequestException } from '@nestjs/common';

export class FileNotExelException extends BadRequestException {
  constructor(message?: string) {
    super(message, 'error.file.not-exel');
  }
}
