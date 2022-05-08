import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { RoleType } from '../../../constants/role-type';
import { Auth } from '../../../decorators';
import { QuestionService } from '../app/question.service';
import { QuestionCreateDto } from '../domain/dto/question.create.dto';
import { QuestionResponseSerialization } from '../serialization/question.response.serialization';

@Controller('question')
@ApiTags('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuestionResponseSerialization,
    description: 'Successfully created',
  })
  async createQuestion(
    @Body() questionCreateDto: QuestionCreateDto,
  ): Promise<QuestionResponseSerialization> {
    const createdUser = await this.questionService.createQuestion(
      questionCreateDto,
    );

    return createdUser;
  }

  @Get()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuestionResponseSerialization,
    description: 'Successfully Get All',
  })
  async getAllQuestions(
    @Query() getAllDto: PageOptionsDto,
  ): Promise<QuestionResponseSerialization> {
    const createdUser = await this.questionService.findAll(getAllDto);

    return createdUser;
  }
}
