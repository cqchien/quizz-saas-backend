import { InternalServerErrorException } from '@nestjs/common';

export class ServerErrorException extends InternalServerErrorException {
  constructor(message?: string) {
    super(message || 'Server error!!', 'error.server.interval_server_error');
  }
}
