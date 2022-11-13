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
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/page-meta.dto';
import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { Auth, AuthUser } from '../../../decorators';
import { ServerErrorException } from '../../../exceptions/server-error.exception';
import { UserEntity } from '../../user/domain/entity/user.entity';
import { UserExamService } from '../app/user-exam.service';
import { UserAnswersDto } from './dto/user-answer-exam.dto';
import { UserExamResponsePresenter } from './presenter/response.presenter';
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
    type: UserExamResponsePresenter,
    description: 'Get information of the exam by user',
  })
  async getAll(
    @AuthUser() user: UserEntity,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    const { data, total } = await this.userExamService.getAll(
      user,
      pageOptionsDto,
    );

    const userExamPresenters = (data || []).map(
      (examEntity) => new UserExamPresenter(examEntity),
    );

    const pageMetaPresenters = new PageMetaDto(pageOptionsDto, total);

    return new UserExamResponsePresenter(
      userExamPresenters,
      pageMetaPresenters,
    );
  }

  @Get(':id/overview')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: UserExamResponsePresenter,
    description: 'Get overview information of the exam by user',
  })
  async getOverview(
    @AuthUser() user: UserEntity,
    @Param('id') userExamId: string,
  ) {
    const examEntity = await this.userExamService.getOverview(user, userExamId);
    const userExamPresenter = new UserExamPresenter(examEntity);

    return new UserExamResponsePresenter(userExamPresenter);
  }

  @Get(':id/take-exam')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: UserExamResponsePresenter,
    description: 'Get information of the exam by user',
  })
  async takeExam(
    @AuthUser() user: UserEntity,
    @Param('id') userExamId: string,
  ) {
    const examEntity = await this.userExamService.takeExam(user, userExamId);
    const userExamPresenter = new UserExamPresenter(examEntity);

    return new UserExamResponsePresenter(userExamPresenter);
  }

  @Post(':id/submit')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiException(() => [NotFoundException, ServerErrorException])
  @ApiOkResponse({
    type: UserExamResponsePresenter,
    description: 'User submit the exam',
  })
  async submit(
    @AuthUser() user: UserEntity,
    @Body() answers: UserAnswersDto,
    @Param('id') userExamId: string,
  ) {
    const examEntity = await this.userExamService.submit(
      user,
      userExamId,
      answers,
    );
    const userExamPresenter = new UserExamPresenter(examEntity);

    return new UserExamResponsePresenter(userExamPresenter);
  }
}
