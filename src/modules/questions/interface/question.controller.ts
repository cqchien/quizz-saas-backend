import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { RoleType } from '../../../constants/role-type';
import { Auth } from '../../../decorators';
import { QuestionService } from '../app/question.service';
import { QuestionCreateDto } from '../domain/dto/question.create.dto';
import { QuestionUpdateDto } from '../domain/dto/question.update.dto';
import { QuestionGetSerialization } from './serialization/question.get.serialization';
import { QuestionResponseSerialization } from './serialization/question.response.serialization';

@Controller('questions')
@ApiTags('questions')
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
    @Body() questionCreateDto: QuestionCreateDto
  ): Promise<QuestionResponseSerialization> {
    const questionEntity = await this.questionService.createQuestion(
      questionCreateDto
    );

    const questionGetSerialization = new QuestionGetSerialization(
      questionEntity
    );

    return new QuestionResponseSerialization(questionGetSerialization);
  }

  @Get()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuestionResponseSerialization,
    description: 'Successfully Get All',
  })
  async getAllQuestions(
    @Query() getAllDto: PageOptionsDto
  ): Promise<QuestionResponseSerialization> {
    const questions = await this.questionService.findAll(getAllDto);

    return questions;
  }

  @Get(':questionId')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuestionResponseSerialization,
    description: 'Successfully Get Detail',
  })
  async getDetailQuestion(
    @Param('questionId') questionId: string
  ): Promise<QuestionResponseSerialization> {
    const questionEntity = await this.questionService.findOne({
      id: questionId,
    });

    const questionGetSerialization = new QuestionGetSerialization(
      questionEntity
    );

    return new QuestionResponseSerialization(questionGetSerialization);
  }

  @Put(':questionId')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuestionResponseSerialization,
    description: 'Successfully Update',
  })
  async updateQuestion(
    @Param('questionId') questionId: string,
    @Body() questionUpdateDto: QuestionUpdateDto
  ): Promise<QuestionResponseSerialization> {
    const question = await this.questionService.updateQuestion(
      questionId,
      questionUpdateDto
    );

    return question;
  }

  @Delete(':questionId')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuestionResponseSerialization,
    description: 'Successfully Delete',
  })
  async deleteQuestion(
    @Param('questionId') questionId: string
  ): Promise<QuestionResponseSerialization> {
    const question = await this.questionService.deleteQuestion(questionId);

    return question;
  }
}
