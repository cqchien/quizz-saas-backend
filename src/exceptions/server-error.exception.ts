import { InternalServerErrorException } from '@nestjs/common';

export class ServerErrorException extends InternalServerErrorException {
  constructor() {
    super('Server error!!', 'error.server.interval_server_error');
  }
}
