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
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/page-meta.dto';
import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { RoleType } from '../../../constants/role-type';
import { Auth, AuthUser } from '../../../decorators';
import { ExamNotFoundException } from '../../../exceptions/exam/exam-not-found.exception';
import { ExamSaveFailedException } from '../../../exceptions/exam/exam-save-failed.exception';
import { ServerErrorException } from '../../../exceptions/server-error.exception';
import { User } from '../../user/domain/user.schema';
import { ExamService } from '../app/exam.service';
import type { ExamEntity } from '../domain/entity/exam.entity';
import { ExamDto } from './dto/exam.dto';
import { QueryExamDto } from './dto/query.dto';
import { ExamPresenter } from './presenter/exam.presenter';
import { ExamResponsePresenter } from './presenter/response.presenter';

@Controller('exams')
@ApiTags('exams')
export class ExamController {
  constructor(private examService: ExamService) {}

  @Get()
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ExamResponsePresenter,
    description: 'Get all exams successfully',
  })
  async getAllQuestions(
    @AuthUser() user: User,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() queryDto: QueryExamDto,
  ): Promise<ExamResponsePresenter> {
    const { data, total } = await this.examService.findAll(
      user,
      queryDto,
      pageOptionsDto,
    );

    const questionPresenters = (data || []).map(
      (question: ExamEntity) => new ExamPresenter(question),
    );

    const pageMetaPresenters = new PageMetaDto(pageOptionsDto, total);

    return new ExamResponsePresenter(questionPresenters, pageMetaPresenters);
  }

  @Post()
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [ExamSaveFailedException, ServerErrorException])
  @ApiOkResponse({
    type: ExamResponsePresenter,
    description: 'Exam is created successfully',
  })
  async createExam(@AuthUser() user: User, @Body() examDto: ExamDto) {
    const examEntity = await this.examService.createExam(user, examDto);
    const examPresenter = new ExamPresenter(examEntity);

    return new ExamResponsePresenter(examPresenter);
  }

  @Put(':id')
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [
    ExamNotFoundException,
    ExamSaveFailedException,
    ServerErrorException,
  ])
  @ApiOkResponse({
    type: ExamResponsePresenter,
    description: 'Exam is update successfully',
  })
  async updateExam(
    @AuthUser() user: User,
    @Param('id') examId: string,
    @Body() examDto: ExamDto,
  ) {
    const examEntity = await this.examService.update(user, examId, examDto);
    const examPresenter = new ExamPresenter(examEntity);

    return new ExamResponsePresenter(examPresenter);
  }

  @Get(':id')
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [ExamNotFoundException])
  @ApiOkResponse({
    type: ExamResponsePresenter,
    description: 'Get detail information of the exam successfully',
  })
  async getDetailQuestion(@AuthUser() user: User, @Param('id') examId: string) {
    const examEntity = await this.examService.findOne(user, { id: examId });

    const examPresenter = new ExamPresenter(examEntity);

    return new ExamResponsePresenter(examPresenter);
  }

  @Delete(':id')
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [ExamNotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: ExamResponsePresenter,
    description: 'Successfully Delete',
  })
  async deleteQuestion(
    @AuthUser() user: User,
    @Param('questionId') questionId: string,
  ): Promise<ExamResponsePresenter> {
    await this.examService.delete(user, questionId);

    return new ExamResponsePresenter({});
  }

  @Get(':id/take-exam')
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [ExamNotFoundException])
  @ApiOkResponse({
    type: ExamResponsePresenter,
    description: 'Take the exam successfully',
  })
  async takeExam(
    @AuthUser() user: User,
    @Param('id') examId: string,
    @Query('code') scheduleCode: string,
  ) {
    const examEntity = await this.examService.takeExam(
      user,
      examId,
      scheduleCode,
    );

    const examPresenter = new ExamPresenter(examEntity);

    return new ExamResponsePresenter(examPresenter);
  }
}
