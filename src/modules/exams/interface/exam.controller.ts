import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../../constants/role-type';
import { Auth, AuthUser } from '../../../decorators';
import { ExamNotFoundException } from '../../../exceptions/exam/exam-not-found.exception';
import { ExamSaveFailedException } from '../../../exceptions/exam/exam-save-failed.exception';
import { ServerErrorException } from '../../../exceptions/server-error.exception';
import { User } from '../../user/domain/user.schema';
import { ExamService } from '../app/exam.service';
import { ExamDto } from './dto/exam.dto';
import { ExamPresenter } from './presenter/exam.presenter';
import { ExamResponsePresenter } from './presenter/response.presenter';

@Controller('exams')
@ApiTags('exams')
export class ExamController {
  constructor(private examService: ExamService) {}

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

  @Get(':id')
  @Auth([RoleType.ADMIN, RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [ExamNotFoundException])
  @ApiOkResponse({
    type: ExamResponsePresenter,
    description: 'Get detail information of the questions successfully',
  })
  async getDetailQuestion(
    @AuthUser() user: User,
    @Param('id') questionId: string,
  ) {
    const examEntity = await this.examService.findOne(user, { id: questionId });

    const examPresenter = new ExamPresenter(examEntity);

    return new ExamResponsePresenter(examPresenter);
  }
}
