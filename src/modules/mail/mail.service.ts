import 'moment-timezone';

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import moment from 'moment';

import { FORMAT_FULL_TIME } from '../../constants/date-time';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { Schedule } from '../exams/domain/entity/schedule.entity';
import type { UserEntity } from '../user/domain/entity/user.entity';
import type { UserExamEntity } from '../user-exam/domain/entity/user-exam.entity';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ApiConfigService,
  ) {}

  async sendEmailInformUserTakeExam(
    user: UserEntity,
    exam: UserExamEntity,
    schedule: Schedule,
  ) {
    const magicLink = `${process.env.API_URL}/user-exams/${exam.id}/take-exam`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Your "${exam.name}" exam is scheduled.`,
      template: './inform-take-exam',
      context: {
        name: user.name,
        examName: exam.name,
        description: exam.description,
        numOfQuestion: exam.questions?.length || 0,
        startTime: moment
          .tz(schedule.startTime, this.configService.getTimeZone())
          .format(FORMAT_FULL_TIME),
        endTime: moment
          .tz(schedule.endTime, this.configService.getTimeZone())
          .format(FORMAT_FULL_TIME),
        magicLink,
      },
    });
  }
}
