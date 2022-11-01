import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import moment from 'moment';

import { FORMAT_FULL_TIME } from '../../../constants';
import { SCHEDULE_STATUS, UPDATE_EXAM_STATUS_TIME } from '../constant';
import { ExamRepository } from '../infra/exam.repository';

@Injectable()
export class JobExamService {
  constructor(private examRepository: ExamRepository) {}

  @Cron(UPDATE_EXAM_STATUS_TIME.toString())
  public async handleStatusExam() {
    // Get all exams with status of the schedule not completed
    const examEntities = await this.examRepository.findExamNotCompleted();
    await Promise.all(
      examEntities.map(async (exam) => {
        const schedules = exam.schedules.map((schedule) => {
          const now = moment().utc().format(FORMAT_FULL_TIME);
          const endDate = moment(schedule.endTime)
            .utc()
            .format(FORMAT_FULL_TIME);
          const startDate = moment(schedule.startTime)
            .utc()
            .format(FORMAT_FULL_TIME);

          if (now === endDate) {
            return {
              ...schedule,
              status: SCHEDULE_STATUS.COMPLETED,
            };
          }

          if (now === startDate) {
            return {
              ...schedule,
              status: SCHEDULE_STATUS.IN_PROGRESS,
            };
          }

          return schedule;
        });

        await this.examRepository.update({ ...exam, schedules });
      }),
    );
  }
}
