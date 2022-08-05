import { ConflictException } from '@nestjs/common';

export class UserExistException extends ConflictException {
  constructor(message: string) {
    super(message, 'error.user.exist');
  }
}
