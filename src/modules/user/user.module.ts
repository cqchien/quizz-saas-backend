import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from '../mail/mail.module';
import { UserService } from './app/user.service';
import { UserExamService } from './app/user-exam.service';
import { User, userSchema } from './domain/user.schema';
import { UserRepository } from './infra/user.repository';
import { UserController } from './interface/user.controller';
import { UserExamController } from './interface/user-exam.controller';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UserController, UserExamController],
  exports: [UserService, UserExamService],
  providers: [UserService, UserExamService, UserRepository],
})
export class UserModule {}
