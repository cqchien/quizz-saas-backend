import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';

import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        uri: configService.getDatabaseUrl,
      }),
      inject: [ApiConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: configService.isDevelopment,
        },
      }),
      imports: [SharedModule],
      parser: I18nJsonParser,
      inject: [ApiConfigService],
    }),
    HealthCheckerModule,
  ],
})
export class AppModule {}
