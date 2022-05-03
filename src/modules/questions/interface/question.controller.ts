import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../../constants/role-type';
import { Auth } from '../../../decorators';
import { QuestionService } from '../app/question.service';
import { QuestionCreateDto } from '../domain/dto/question.create.dto';
import { QuestionGetSerialization } from '../serialization/question.get.serialization';

@Controller('question')
@ApiTags('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuestionGetSerialization,
    description: 'Successfully created',
  })
  async createQuestion(
    @Body() questionCreateDto: QuestionCreateDto,
  ): Promise<QuestionGetSerialization> {
    const createdUser = await this.questionService.createQuestion(
      questionCreateDto,
    );

    return createdUser;
  }
}
