import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super('error.user.not_found', message);
  }
}
