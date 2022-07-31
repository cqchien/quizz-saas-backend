import { BadRequestException } from '@nestjs/common';

export class UserNotSaveException extends BadRequestException {
  constructor(message: string) {
    super('error.user.not_save', message);
  }
}
