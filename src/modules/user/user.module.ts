import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './app/user.service';
import { UserModel, userSchema } from './domain/entity/user.schema';
import { UserRepository } from './domain/user.repository';
import { UserController } from './interface/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: userSchema }]),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, UserRepository],
})
export class UserModule {}
