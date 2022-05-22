import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';
import { QuestionModule } from './modules/questions/question.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        uri: configService.getDatabaseUrl,
      }),
      inject: [ApiConfigService],
    }),
    UserModule,
    AuthModule,
    QuestionModule,
  ],
})
export class AppModule {}
