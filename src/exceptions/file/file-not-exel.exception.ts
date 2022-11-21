import { BadRequestException } from '@nestjs/common';

export class FileNotExcelException extends BadRequestException {
  constructor(message?: string) {
    super(message, 'error.file.not-exel');
  }
}
