import { Injectable } from '@nestjs/common';
import { uniqBy } from 'lodash';

import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { RoleType } from '../../../constants/role-type';
import {
  ExamNotFoundException,
  ExamSaveFailedException,
} from '../../../exceptions/exam';
import type { UserEntity } from '../../user/domain/entity/user.entity';
import { UserExamService } from '../../user-exam/app/user-exam.service';
import { SCHEDULE_STATUS } from '../constant';
import type { ExamEntity } from '../domain/entity/exam.entity';
import type { Schedule } from '../domain/entity/schedule.entity';
import { ExamRepository } from '../infra/exam.repository';
import type { ExamDto } from '../interface/dto/exam.dto';
import type { QueryExamDto } from '../interface/dto/query.dto';
import type { ScheduleDto } from '../interface/dto/schedule.dto';

@Injectable()
export class ExamService {
  constructor(
    private examRepository: ExamRepository,
    private userExamService: UserExamService,
  ) {}

  async createExam(user: UserEntity, examDto: ExamDto): Promise<ExamEntity> {
    try {
      let error = '';

      const formattedSchedules = examDto.schedules.map((schedule): Schedule => {
        if (this.checkTimePast(schedule.startTime)) {
          error = 'Can not schedule for the past!';
        }

        if (!this.checkStartEndTime(schedule.startTime, schedule.endTime)) {
          error = 'End time should be greater than start time.';
        }

        return {
          ...schedule,
          status: SCHEDULE_STATUS.NOT_STARTED,
        };
      });

      const uniqueSchedule = uniqBy(formattedSchedules, 'code');

      if (uniqueSchedule.length !== formattedSchedules.length) {
        error = 'Can not create with duplicated code in schedule';
      }

      if (error) {
        throw new ExamSaveFailedException(error);
      }

      const examEntity: ExamEntity = {
        ...examDto,
        schedules: formattedSchedules,
        createdBy: user.id,
        updatedBy: user.id,
      };

      const exam = await this.examRepository.create(examEntity);

      await Promise.all(
        exam.schedules.map(async (schedule) =>
          // Create exam for user who created exam
          this.userExamService.createExamForUser(
            user.id || '',
            exam,
            schedule.code,
          ),
        ),
      );

      return exam;
    } catch (error) {
      throw new ExamSaveFailedException(
        (error as Error).message || 'Create exam failed!',
      );
    }
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public async update(
    user: UserEntity,
    examId: string,
    examDto: ExamDto,
  ): Promise<ExamEntity> {
    let error = '';

    const existedExam = await this.examRepository.findByCondition({
      id: examId,
    });

    if (!existedExam) {
      throw new ExamNotFoundException('Exam does not exist!!');
    }

    if (existedExam.createdBy !== user.id && user.role !== RoleType.ADMIN) {
      throw new ExamSaveFailedException(
        'User does not have permission to update this exam',
      );
    }

    const newSchedules: ScheduleDto[] = [];

    const formattedSchedules = examDto.schedules.map((schedule): Schedule => {
      const existedSchedule = existedExam.schedules.find(
        (examSchedule) => schedule.code === examSchedule.code,
      );

      if (existedSchedule?.status === SCHEDULE_STATUS.COMPLETED) {
        return existedSchedule;
      }

      if (this.checkTimePast(schedule.startTime)) {
        error = 'Can not schedule for the past!';
      }

      if (!this.checkStartEndTime(schedule.startTime, schedule.endTime)) {
        error = 'End time should be greater than start time.';
      }

      if (!existedSchedule) {
        newSchedules.push(schedule);
      }

      return {
        ...schedule,
        status: existedSchedule
          ? existedSchedule.status
          : SCHEDULE_STATUS.NOT_STARTED,
      };
    });

    await Promise.all(
      newSchedules.map(async (schedule) =>
        this.userExamService.createExamForUser(
          user.id || '',
          {
            ...existedExam,
            ...examDto,
          },
          schedule.code,
        ),
      ),
    );

    const uniqueSchedule = uniqBy(formattedSchedules, 'code');

    if (uniqueSchedule.length !== formattedSchedules.length) {
      error = 'Can not create with duplicated code in schedule';
    }

    if (error) {
      throw new ExamSaveFailedException(error);
    }

    const examEntity: ExamEntity = {
      ...existedExam,
      ...examDto,
      schedules: formattedSchedules,
      updatedAt: new Date(),
      updatedBy: user.id,
    };
    const exam = await this.examRepository.update(examEntity);

    if (!exam) {
      throw new ExamSaveFailedException('Update exam failed!');
    }

    return exam;
  }

  public async findAll(
    user: UserEntity,
    queryExamDto: QueryExamDto,
    pageOptionsDto: PageOptionsDto,
  ): Promise<{
    data: ExamEntity[];
    total: number;
  }> {
    if (user.role === RoleType.ADMIN) {
      return this.examRepository.findAll(pageOptionsDto, queryExamDto);
    }

    return this.examRepository.findAll(pageOptionsDto, queryExamDto, user.id);
  }

  public async delete(user: UserEntity, examId: string): Promise<void> {
    const existedQuestion = await this.examRepository.findByCondition({
      id: examId,
    });

    if (!existedQuestion) {
      throw new ExamNotFoundException('Exam does not exist!!');
    }

    if (existedQuestion.createdBy !== user.id && user.role !== RoleType.ADMIN) {
      throw new ExamSaveFailedException(
        'User does not have permission to delete this exam',
      );
    }

    await this.examRepository.delete(examId);
  }

  public async findOne(
    user: UserEntity,
    options: Record<string, string>,
  ): Promise<ExamEntity> {
    const query =
      user.role !== RoleType.ADMIN
        ? { ...options, createdBy: user.id || '' }
        : options;
    const exam = await this.examRepository.findByCondition(query);

    if (!exam) {
      throw new ExamNotFoundException(
        'Exam does not exist or user not allow to get the exam!!',
      );
    }

    return exam;
  }

  public async getOverview(user: UserEntity, examId: string) {
    const query =
      user.role !== RoleType.ADMIN
        ? { id: examId, createdBy: user.id || '' }
        : { id: examId };
    const exam = await this.examRepository.findByCondition(
      query as Record<string, string>,
    );

    if (!exam) {
      throw new ExamNotFoundException(
        'Exam does not exist or user not allow to get the exam!!',
      );
    }

    // Get user exams.
    const userExams = await this.userExamService.getUsersExamsByTemplate(
      examId,
    );

    return {
      ...exam,
      userExams,
    };
  }

  private checkTimePast(date: Date) {
    const now = new Date();
    const dateTime = new Date(date);

    return now.getTime() - dateTime.getTime() > 60 * 1000;
  }

  private checkStartEndTime(startTime: Date, endTime: Date) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    return startDate.getTime() <= endDate.getTime();
  }
}
