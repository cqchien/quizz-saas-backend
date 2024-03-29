import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { QuestionService } from './app/question.service';
import { Question, questionSchema } from './domain/question.schema';
import { QuestionRepository } from './infra/question.repository';
import { QuestionController } from './interface/question.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      { name: Question.name, schema: questionSchema },
    ]),
    SharedModule,
  ],
  exports: [QuestionService],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
})
export class QuestionModule {}
