import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../../shared/shared.module';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { GroupService } from './app/group.service';
import { Group, groupSchema } from './domain/group.schema';
import { GroupRepository } from './infra/group.repository';
import { GroupController } from './interface/group.controller';

@Module({
  imports: [
    SharedModule,
    UserModule,
    GroupModule,
    MailModule,
    MongooseModule.forFeature([{ name: Group.name, schema: groupSchema }]),
  ],
  controllers: [GroupController],
  exports: [GroupService, GroupRepository],
  providers: [GroupService, GroupRepository],
})
export class GroupModule {}
