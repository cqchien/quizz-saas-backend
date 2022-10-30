import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import path from 'path';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        transport: {
          host: configService.mailOptionsConfig.host,
          port: configService.mailOptionsConfig.port,
          secure: true,
          auth: {
            user: configService.mailOptionsConfig.user,
            pass: configService.mailOptionsConfig.pass,
          },
        },
        defaults: {
          from: configService.mailOptionsConfig.defaultFrom,
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
