import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SCHEDULE_STATUS } from '../../exams/constant';
import type { ExamEntity } from '../../exams/domain/entity/exam.entity';
import { MailService } from '../../mail/mail.service';
import { USER_EXAM_STATUS } from '../constant';
import type { UserEntity } from '../domain/entity/user.entity';
import type { UserExamEntity } from '../domain/entity/user-exam.entity';
import { UserRepository } from '../infra/user.repository';

@Injectable()
export class UserExamService {
  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async createExamForUser(
    userId: string,
    exam: ExamEntity,
    scheduleCode: string,
  ) {
    // validate user
    const userEntity = await this.userRepository.findByCondition({
      id: userId,
    });

    const schedule = exam.schedules.find(
      (scheduleEntity) => scheduleEntity.code === scheduleCode,
    );

    if (!userEntity || !schedule) {
      return;
    }

    const questionsUserExam = exam.questions.map((questionId) => ({
      question: questionId,
    }));

    const userExamEntity: UserExamEntity = {
      templateExam: exam.id || '',
      scheduleCode,
      setting: exam.setting,
      code: exam.code,
      name: exam.name,
      description: exam.description,
      type: exam.type,
      questionBankType: exam.questionBankType,
      status: USER_EXAM_STATUS.NOT_STARTED,
      questions: questionsUserExam,
    };

    const updatedUserEntity = {
      ...userEntity,
      exams: userEntity.exams
        ? [...userEntity.exams, userExamEntity]
        : [userExamEntity],
    };

    const updatedUser = await this.userRepository.update(updatedUserEntity);

    const newExam = (updatedUser.exams || []).find(
      (userExam) =>
        userExam.templateExam === exam.id &&
        userExam.scheduleCode === schedule.code,
    );

    if (newExam) {
      // Send email to user
      await this.mailService.sendEmailInformUserTakeExam(
        userEntity,
        newExam,
        schedule,
      );
    }

    return updatedUser;
  }

  public async takeExam(user: UserEntity, examId: string) {
    const exam = await this.userRepository.findExam(user.id || '', examId);

    if (!exam) {
      throw new NotFoundException(
        'Exam does not exist or user not allow to get the exam!!',
      );
    }

    const inProgressSchedule = exam.templateExamEntity?.schedules.find(
      (schedule) =>
        schedule.status === SCHEDULE_STATUS.IN_PROGRESS &&
        schedule.code === exam.scheduleCode,
    );

    if (!inProgressSchedule) {
      throw new BadRequestException(
        'Schedule have not start yet or does not exist.',
      );
    }

    if (
      !this.checkValidTakeExam(
        inProgressSchedule.startTime,
        inProgressSchedule.endTime,
      )
    ) {
      throw new BadRequestException(
        'You can view the exam when it has started and during the test.',
      );
    }

    // Change status of the exam to in_progress when user view detail of the exam
    return this.userRepository.updateUserExam(user.id || '', {
      ...exam,
      status: USER_EXAM_STATUS.IN_PROGRESS,
    });
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
