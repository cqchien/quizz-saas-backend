import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuestionBankService } from './app/question-bank.service';
import {
  QuestionBank,
  questionBankSchema,
} from './domain/question-bank.schema';
import { QuestionBankRepository } from './infra/question-bank.repository';
import { QuestionBankController } from './interface/question-bank.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionBank.name, schema: questionBankSchema },
    ]),
  ],
  exports: [],
  controllers: [QuestionBankController],
  providers: [QuestionBankService, QuestionBankRepository],
})
export class QuestionBankModule {}
