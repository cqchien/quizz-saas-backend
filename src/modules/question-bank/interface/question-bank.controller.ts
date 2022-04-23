import { Controller } from '@nestjs/common';

import type { QuestionBankService } from '../app/question-bank.service';

@Controller('question-bank')
export class QuestionBankController {
  public readonly questionBankService: QuestionBankService;
}
