import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SCHEDULE_STATUS } from '../../exams/constant';
import type { ExamEntity } from '../../exams/domain/entity/exam.entity';
import type { Schedule } from '../../exams/domain/entity/schedule.entity';
import { MailService } from '../../mail/mail.service';
import { RESULT_EXAM_STATUS, USER_EXAM_STATUS } from '../constant';
import type { UserEntity } from '../domain/entity/user.entity';
import type { UserExamEntity } from '../domain/entity/user-exam.entity';
import { UserRepository } from '../infra/user.repository';
import type { UserAnswersDto } from '../interface/dto/user-answer-exam.dto';

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
      score: 0,
      total: exam.setting.plusScorePerQuestion * exam.questions.length,
      resultStatus: RESULT_EXAM_STATUS.NOT_SET,
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
        'Exam not allow to view or does not exist.',
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

  public async getAll(user: UserEntity) {
    return this.userRepository.getAllExams(user.id || '');
  }

  public async submit(
    user: UserEntity,
    examId: string,
    userAnswer: UserAnswersDto,
  ) {
    const { answers } = userAnswer;

    const exam = await this.userRepository.findExam(user.id || '', examId);
    const userExamSchedule = (exam?.templateExamEntity?.schedules || []).find(
      (schedule: Schedule) => schedule.code === exam?.scheduleCode,
    );

    if (
      !exam ||
      exam.status === USER_EXAM_STATUS.SUBMITTED ||
      userExamSchedule?.status !== SCHEDULE_STATUS.IN_PROGRESS
    ) {
      throw new NotFoundException(
        'Exam does not exist or user not allow to submit the exam!!',
      );
    }

    // eslint-disable-next-line unicorn/no-array-reduce
    const questionMap = (exam.questions || []).reduce((map, answer) => {
      const correctOptions = (answer.questionEntity?.options || [])
        .filter((option) => option.value)
        .map((option) => option.order);
      map[answer.question.toString()] = correctOptions;

      return map;
    }, {});

    const correctAnswer = answers.filter((answer) =>
      questionMap[answer.questionId.toString()].includes(answer.answerOrder),
    );

    const numberOfCorrectAnswer = correctAnswer.length;
    const numberOfWrongAnswer =
      (exam.questions || []).length - numberOfCorrectAnswer;

    const score =
      exam.setting.plusScorePerQuestion * numberOfCorrectAnswer -
      exam.setting.minusScorePerQuestion * numberOfWrongAnswer;
    const resultStatus =
      Math.round((score / exam.total) * 100) >= exam.setting.percentageToPass
        ? RESULT_EXAM_STATUS.PASS
        : RESULT_EXAM_STATUS.FAILED;

    const updatedExam = {
      ...exam,
      score: score > 0 ? score : 0,
      resultStatus,
      status: USER_EXAM_STATUS.SUBMITTED,
    };

    // Send email report to user
    return this.userRepository.updateUserExam(user.id || '', updatedExam);
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
