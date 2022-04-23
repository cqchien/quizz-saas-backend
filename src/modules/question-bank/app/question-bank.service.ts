import { Injectable } from '@nestjs/common';

import { QuestionBankRepository } from '../infra/question-bank.repository';

@Injectable()
export class QuestionBankService {
  constructor(
    private readonly questionBankRepository: QuestionBankRepository,
  ) {}
}
