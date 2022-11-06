import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GroupModule } from '../group/group.module';
import { UserExamModule } from '../user-exam/user-exam.module';
import { ExamService } from './app/exam.service';
import { JobExamService } from './app/job.service';
import { Exam, examSchema } from './domain/exam.schema';
import { ExamRepository } from './infra/exam.repository';
import { ExamController } from './interface/exam.controller';

@Module({
  imports: [
    GroupModule,
    UserExamModule,
    MongooseModule.forFeature([{ name: Exam.name, schema: examSchema }]),
  ],
  controllers: [ExamController],
  exports: [ExamService],
  providers: [ExamService, JobExamService, ExamRepository],
})
export class ExamModule {}
