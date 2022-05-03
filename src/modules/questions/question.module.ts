import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { QuestionService } from './app/question.service';
import { Question, questionSchema } from './domain/question.schema';
import { QuestionController } from './interface/question.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      { name: Question.name, schema: questionSchema },
    ]),
  ],
  exports: [],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
