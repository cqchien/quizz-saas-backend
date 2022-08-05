import { BadRequestException } from '@nestjs/common';

export class UserSaveFailedException extends BadRequestException {
  constructor(message: string) {
    super(message, 'error.user.save_failed');
  }
}
