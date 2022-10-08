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

import { Auth, AuthUser } from '../../../decorators';
import { ServerErrorException } from '../../../exceptions';
import { ExamNotFoundException } from '../../../exceptions/exam/exam-not-found.exception';
import { ExamSaveFailedException } from '../../../exceptions/exam/exam-save-failed.exception';
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
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [ExamSaveFailedException, ServerErrorException])
  @ApiOkResponse({
    type: ExamResponsePresenter,
    description: 'Question is created successfully',
  })
  async createExam(@AuthUser() user: User, @Body() examDto: ExamDto) {
    const examEntity = await this.examService.createExam(user, examDto);
    const examPresenter = new ExamPresenter(examEntity);

    return new ExamResponsePresenter(examPresenter);
  }

  @Get(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [ExamNotFoundException])
  @ApiOkResponse({
    type: ExamResponsePresenter,
    description: 'Get detail information of the questions successfully',
  })
  async getDetailQuestion(@Param('id') questionId: string) {
    const examEntity = await this.examService.findOne({
      id: questionId,
    });

    const examPresenter = new ExamPresenter(examEntity);

    return new ExamResponsePresenter(examPresenter);
  }
}
