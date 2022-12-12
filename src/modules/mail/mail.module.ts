import { Module } from '@nestjs/common';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { MailService } from './mail.service';

@Module({
  imports: [],
  providers: [MailService, ApiConfigService],
  exports: [MailService],
})
export class MailModule {}
