import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from '../mail/mail.module';
import { GroupService } from './app/group.service';
import { Group, groupSchema } from './domain/group.schema';
import { GroupController } from './interface/group.controller';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: Group.name, schema: groupSchema }]),
  ],
  controllers: [GroupController],
  exports: [GroupService],
  providers: [GroupService],
})
export class GroupModule {}
