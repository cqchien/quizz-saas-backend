import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../../decorators';
import { ServerErrorException } from '../../../exceptions/server-error.exception';
import { UserExamService } from '../app/user-exam.service';
import { UserEntity } from '../domain/entity/user.entity';
import type { UserAnswerQuestionDto } from './dto/user-answer-exam.dto';
import { UserResponsePresenter } from './presenter/response.presenter';
import { UserExamPresenter } from './presenter/user-exam.presenter';

@Controller('user-exams')
@ApiTags('users-exams')
export class UserExamController {
  constructor(private userExamService: UserExamService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: UserResponsePresenter,
    description: 'Get information of the exam by user',
  })
  async getAll(@AuthUser() user: UserEntity) {
    const examEntities = await this.userExamService.getAll(user);
    const userExamPresenters = examEntities.map(
      (examEntity) => new UserExamPresenter(examEntity),
    );

    return new UserResponsePresenter(userExamPresenters);
  }

  @Get(':id/take-exam')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: UserResponsePresenter,
    description: 'Get information of the exam by user',
  })
  async takeExam(
    @AuthUser() user: UserEntity,
    @Param('id') userExamId: string,
  ) {
    const examEntity = await this.userExamService.takeExam(user, userExamId);
    const userExamPresenter = new UserExamPresenter(examEntity);

    return new UserResponsePresenter(userExamPresenter);
  }

  @Post(':id/submit')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: UserResponsePresenter,
    description: 'User submit the exam',
  })
  async submit(
    @AuthUser() user: UserEntity,
    @Body() answers: UserAnswerQuestionDto[],
    @Param('id') userExamId: string,
  ) {
    const examEntity = await this.userExamService.submit(
      user,
      userExamId,
      answers,
    );
    const userExamPresenter = new UserExamPresenter(examEntity);

    return new UserResponsePresenter(userExamPresenter);
  }
}
