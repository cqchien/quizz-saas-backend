import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { UserExamService } from './app/user-exam.service';
import { UserExam, userExamSchema } from './domain/user-exam.schema';
import { UserExamRepository } from './infra/user-exam.repository';
import { UserExamController } from './interface/user-exam.controller';

@Module({
  imports: [
    UserModule,
    MailModule,
    MongooseModule.forFeature([
      { name: UserExam.name, schema: userExamSchema },
    ]),
  ],
  controllers: [UserExamController],
  exports: [UserExamService],
  providers: [UserExamService, UserExamRepository],
})
export class UserExamModule {}
