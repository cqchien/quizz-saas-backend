import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from '../mail/mail.module';
import { UserService } from './app/user.service';
import { User, userSchema } from './domain/user.schema';
import { UserRepository } from './infra/user.repository';
import { UserController } from './interface/user.controller';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, UserRepository],
})
export class UserModule {}
