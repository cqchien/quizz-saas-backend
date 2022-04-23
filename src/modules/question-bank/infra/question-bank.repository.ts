import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { QuestionBankDocument } from '../domain/question-bank.schema';
import { QuestionBank } from '../domain/question-bank.schema';

@Injectable()
export class QuestionBankRepository {
  constructor(
    @InjectModel(QuestionBank.name)
    private questionBankModel: Model<QuestionBankDocument>,
  ) {}
}
