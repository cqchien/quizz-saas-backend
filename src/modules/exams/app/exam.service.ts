import { BadRequestException, Injectable } from '@nestjs/common';

import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { RoleType } from '../../../constants/role-type';
import {
  ExamNotFoundException,
  ExamSaveFailedException,
} from '../../../exceptions/exam';
import type { UserEntity } from '../../user/domain/entity/user.entity';
import { EXAM_STATUS, SCHEDULER_STATUS } from '../constant';
import type { ExamEntity } from '../domain/entity/exam.entity';
import type { Scheduler } from '../domain/entity/scheduler.entity';
import { ExamRepository } from '../infra/exam.repository';
import type { ExamDto } from '../interface/dto/exam.dto';
import type { QueryExamDto } from '../interface/dto/query.dto';

@Injectable()
export class ExamService {
  constructor(private examRepository: ExamRepository) {}

  async createExam(user: UserEntity, examDto: ExamDto): Promise<ExamEntity> {
    try {
      let error = '';

      const formattedScheduler = examDto.scheduler.map(
        (scheduler): Scheduler => {
          if (this.checkTimePast(scheduler.startTime)) {
            error = 'Can not schedule for the past!';
          }

          if (!this.checkStartEndTime(scheduler.startTime, scheduler.endTime)) {
            error = 'End time should be greater than start time.';
          }

          return {
            ...scheduler,
            status: SCHEDULER_STATUS.NOT_STARTED,
          };
        },
      );

      if (error) {
        throw new ExamSaveFailedException(error);
      }

      const examEntity: ExamEntity = {
        ...examDto,
        status: EXAM_STATUS.NOT_STARTED,
        scheduler: formattedScheduler,
        createdBy: user.id,
        updatedBy: user.id,
      };

      const exam = await this.examRepository.create(examEntity);

      return exam;
    } catch (error) {
      throw new ExamSaveFailedException(
        (error as Error).message || 'Create exam failed!',
      );
    }
  }

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

    const formattedScheduler = examDto.scheduler.map((scheduler): Scheduler => {
      let status = scheduler.status;

      if (!status) {
        if (this.checkTimePast(scheduler.startTime)) {
          error = 'Can not schedule for the past!';
        } else if (
          !this.checkStartEndTime(scheduler.startTime, scheduler.endTime)
        ) {
          error = 'End time should be greater than start time.';
        } else {
          status = SCHEDULER_STATUS.NOT_STARTED;
        }
      }

      return {
        ...scheduler,
        status,
      };
    });

    if (error) {
      throw new ExamSaveFailedException(error);
    }

    const examEntity: ExamEntity = {
      ...existedExam,
      ...examDto,
      scheduler: formattedScheduler,
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
    const query = user.id ? { ...options, createdBy: user.id } : options;
    const exam = await this.examRepository.findByCondition(query);

    if (!exam) {
      throw new ExamNotFoundException(
        'Exam does not exist or user not allow to get the exam!!',
      );
    }

    return exam;
  }

  public async takeExam(user: UserEntity, examId: string): Promise<ExamEntity> {
    const exam = await this.examRepository.findByCondition({
      id: examId,
    });

    if (!exam) {
      throw new ExamNotFoundException(
        'Exam does not exist or user not allow to get the exam!!',
      );
    }

    const inProgressScheduler = exam.scheduler.find(
      (scheduler) => scheduler.status === SCHEDULER_STATUS.IN_PROGRESS,
    );

    if (!inProgressScheduler) {
      throw new ExamNotFoundException('Exam have not start yet.');
    }

    if (
      exam.status !== EXAM_STATUS.IN_PROGRESS ||
      !this.checkValidTakeExam(
        inProgressScheduler.startTime,
        inProgressScheduler.endTime,
      )
    ) {
      throw new BadRequestException(
        'You can view the exam when it has started and during the test.',
      );
    }

    return exam;
  }

  private checkTimePast(date: Date) {
    const now = new Date();
    const dateTime = new Date(date);

    return now.getTime() < dateTime.getTime();
  }

  private checkStartEndTime(startTime: Date, endTime: Date) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    return startDate.getTime() <= endDate.getTime();
  }

  private checkValidTakeExam(startTime: Date, endTime: Date) {
    const now = new Date();
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    return (
      startDate.getTime() <= now.getTime() && now.getTime() <= endDate.getTime()
    );
  }
}
