import 'moment-timezone';

import { Injectable } from '@nestjs/common';
import SendGrid from '@sendgrid/mail';
import moment from 'moment';

import { FORMAT_FULL_TIME } from '../../constants/date-time';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { Schedule } from '../exams/domain/entity/schedule.entity';
import type { UserEntity } from '../user/domain/entity/user.entity';
import type { UserExamEntity } from '../user-exam/domain/entity/user-exam.entity';
import { informChangePassword } from './templates/change-password';
import { informTakeExam } from './templates/inform-take-exam';

@Injectable()
export class MailService {
  constructor(private configService: ApiConfigService) {
    SendGrid.setApiKey(this.configService.getSendGridApiKey());
  }

  replacer(tpl: string, data) {
    // access to {{some_word}}
    // not contain white space ^\s
    // match regex ^{^{ ^}^}
    return tpl.replace(
      /{{([^\s^{}]+)?}}/g,
      function ($1: string, $2: string | number) {
        return data[$2];
      },
    );
  }

  async sendEmailChangePassword(user: UserEntity, token: string) {
    const magicLink = `${process.env.API_URL}/change-password?token=${token}`;
    const html = this.replacer(informChangePassword.body, {
      name: user.name,
      magicLink,
    });

    const subject = informChangePassword.title;

    const mail: SendGrid.MailDataRequired = {
      to: user.email,
      subject,
      from: 'chien.cq@geekup.vn',
      html,
    };

    const transport = await SendGrid.send(mail);
    console.info(`Email successfully dispatched to ${mail.to}`);

    return transport;
  }

  async sendEmailInformUserTakeExam(
    user: UserEntity,
    exam: UserExamEntity,
    schedule: Schedule,
  ) {
    const magicLink = `${process.env.API_URL}/user-exams/${exam.id}/take-exam`;
    const html = this.replacer(informTakeExam.body, {
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
    });

    const subject = informTakeExam.title;

    const mail: SendGrid.MailDataRequired = {
      to: user.email,
      subject,
      from: 'chien.cq@geekup.vn',
      html,
    };

    const transport = await SendGrid.send(mail);
    console.info(`Email successfully dispatched to ${mail.to}`);

    return transport;
  }
}
