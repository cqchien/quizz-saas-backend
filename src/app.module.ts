import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './modules/auth/auth.module';
import { ExamModule } from './modules/exams/exam.module';
import { GroupModule } from './modules/group/group.module';
import { QuestionModule } from './modules/questions/question.module';
import { UserModule } from './modules/user/user.module';
import { UserExamModule } from './modules/user-exam/user-exam.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: () => ({
        uri: 'mongodb://knowled:knowled@mongo/knowled',
      }),
      inject: [ApiConfigService],
    }),
    UserModule,
    UserExamModule,
    AuthModule,
    QuestionModule,
    ExamModule,
    GroupModule,
  ],
})
export class AppModule {}
