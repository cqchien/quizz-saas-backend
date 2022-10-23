import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { ExamService } from './app/exam.service';
import { Exam, examSchema } from './domain/exam.schema';
import { ExamRepository } from './infra/exam.repository';
import { ExamController } from './interface/exam.controller';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Exam.name, schema: examSchema }]),
  ],
  controllers: [ExamController],
  exports: [ExamService],
  providers: [ExamService, ExamRepository],
})
export class ExamModule {}
