import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
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
  UploadedFile,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/page-meta.dto';
import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { RoleType } from '../../../constants/role-type';
import { ApiFile, Auth, AuthUser } from '../../../decorators';
import { QuestionExistException } from '../../../exceptions/question/question-exist.exception';
import { QuestionNotFoundException } from '../../../exceptions/question/question-not-found.exception';
import { ServerErrorException } from '../../../exceptions/server-error.exception';
import { IFile } from '../../../interfaces/IFile';
import { User } from '../../user/domain/user.schema';
import { QuestionService } from '../app/question.service';
import type { QuestionEntity } from '../domain/entity/question.entity';
import { QueryQuestionDto } from './dto/query.dto';
import { QuestionDto } from './dto/question.dto';
import { QuestionPresenter } from './presenter/question.presenter';
import { QuestionResponsePresenter } from './presenter/response.presenter';

@Controller('questions')
@ApiTags('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [QuestionExistException, ServerErrorException])
  @ApiOkResponse({
    type: QuestionResponsePresenter,
    description: 'Question is created successfully',
  })
  async createQuestion(
    @AuthUser() user: User,
    @Body() questionDto: QuestionDto,
  ): Promise<QuestionResponsePresenter> {
    const questionEntity = await this.questionService.createQuestion(
      user,
      questionDto,
    );

    const questionPresenter = new QuestionPresenter(questionEntity);

    return new QuestionResponsePresenter(questionPresenter);
  }

  @Get()
  @Auth([RoleType.ADMIN, RoleType.USER])
  @ApiException(() => [ServerErrorException])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuestionResponsePresenter,
    description: 'Get all questions successfully',
  })
  async getAllQuestions(
    @AuthUser() user: User,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() queryDto: QueryQuestionDto,
  ): Promise<QuestionResponsePresenter> {
    const { data, total } = await this.questionService.findAll(
      user,
      queryDto,
      pageOptionsDto,
    );

    const questionPresenters = (data || []).map(
      (question: QuestionEntity) => new QuestionPresenter(question),
    );

    const pageMetaPresenters = new PageMetaDto(pageOptionsDto, total);

    return new QuestionResponsePresenter(
      questionPresenters,
      pageMetaPresenters,
    );
  }

  @Post('upload')
  @Auth([RoleType.ADMIN, RoleType.USER])
  @ApiException(() => [ServerErrorException])
  @ApiFile([{ name: 'file', isArray: false }])
  async uploadQuestions(
    @AuthUser() user: User,
    @UploadedFile() file: IFile,
  ): Promise<QuestionResponsePresenter> {
    const questions = await this.questionService.uploadQuestions(file, user);

    const questionPresenters = (questions || []).map(
      (question: QuestionEntity) => new QuestionPresenter(question),
    );

    return new QuestionResponsePresenter(questionPresenters);
  }

  @Get(':questionId')
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [QuestionNotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: QuestionResponsePresenter,
    description: 'Get detail information of the questions successfully',
  })
  async getDetailQuestion(
    @Param('questionId') questionId: string,
  ): Promise<QuestionResponsePresenter> {
    const questionEntity = await this.questionService.findOne({
      id: questionId,
    });

    const questionPresenter = new QuestionPresenter(questionEntity);

    return new QuestionResponsePresenter(questionPresenter);
  }

  @Put(':questionId')
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [QuestionNotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: QuestionResponsePresenter,
    description: 'Question is updated successfully',
  })
  async updateQuestion(
    @AuthUser() user: User,
    @Param('questionId') questionId: string,
    @Body() questionUpdateDto: QuestionDto,
  ): Promise<QuestionResponsePresenter> {
    const questionEntity = await this.questionService.updateQuestion(
      user,
      questionId,
      questionUpdateDto,
    );

    const questionPresenter = new QuestionPresenter(questionEntity);

    return new QuestionResponsePresenter(questionPresenter);
  }

  @Delete(':questionId')
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [QuestionNotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: QuestionResponsePresenter,
    description: 'Successfully Delete',
  })
  async deleteQuestion(
    @AuthUser() user: User,
    @Param('questionId') questionId: string,
  ): Promise<QuestionResponsePresenter> {
    await this.questionService.deleteQuestion(user, questionId);

    return new QuestionResponsePresenter();
  }
}
