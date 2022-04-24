import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('question-bank')
@ApiTags('question-bank')
export class QuestionBankController {}
