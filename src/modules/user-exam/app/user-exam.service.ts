import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SCHEDULE_STATUS } from '../../exams/constant';
import type { ExamEntity } from '../../exams/domain/entity/exam.entity';
import type { Schedule } from '../../exams/domain/entity/schedule.entity';
import { MailService } from '../../mail/mail.service';
import { UserService } from '../../user/app/user.service';
import type { UserEntity } from '../../user/domain/entity/user.entity';
import { RESULT_EXAM_STATUS, USER_EXAM_STATUS } from '../constant';
import type {
  AnswerQuestionEntity,
  UserExamEntity,
} from '../domain/entity/user-exam.entity';
import { UserExamRepository } from '../infra/user-exam.repository';
import type { UserAnswersDto } from '../interface/dto/user-answer-exam.dto';

@Injectable()
export class UserExamService {
  constructor(
    private userExamRepository: UserExamRepository,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async createExamForUser(
    userId: string,
    exam: ExamEntity,
    scheduleCode: string,
  ) {
    // validate user
    const userEntity = await this.userService.findOne({
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
      user: userId,
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

    const userExam = await this.userExamRepository.create(userExamEntity);

    if (!userExam) {
      return;
    }

    // Send email to user
    await this.mailService.sendEmailInformUserTakeExam(
      userEntity,
      userExam,
      schedule,
    );

    return userExam;
  }

  public async getOverview(user: UserEntity, examId: string) {
    const exam = await this.userExamRepository.findByCondition({
      id: examId,
      user: user.id || '',
    });

    if (!exam || exam.status !== USER_EXAM_STATUS.SUBMITTED) {
      throw new NotFoundException(
        'Exam does not exist or user not allow to get the exam!!',
      );
    }

    const inProgressSchedule = exam.templateExamEntity?.schedules.find(
      (schedule) =>
        schedule.status === SCHEDULE_STATUS.COMPLETED &&
        schedule.code === exam.scheduleCode,
    );

    if (!inProgressSchedule) {
      throw new BadRequestException('Exam not allow to view.');
    }

    return exam;
  }

  public async takeExam(user: UserEntity, examId: string) {
    const exam = await this.userExamRepository.findByCondition(
      {
        id: examId,
        user: user.id || '',
      },
      true,
    );

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
        'Exam not allow to view or schedule does not exist.',
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
    return this.userExamRepository.update({
      ...exam,
      status: USER_EXAM_STATUS.IN_PROGRESS,
    });
  }

  public async getAll(user: UserEntity) {
    return this.userExamRepository.getAll({ user: user.id || '' });
  }

  public async getUsersExamsByTemplate(
    templateExamId: string,
  ): Promise<UserExamEntity[]> {
    return this.userExamRepository.getAll({
      templateExam: templateExamId,
    });
  }

  public async submit(
    user: UserEntity,
    examId: string,
    userAnswer: UserAnswersDto,
  ): Promise<UserExamEntity> {
    const { answers } = userAnswer;

    const exam = await this.userExamRepository.findByCondition({
      user: user.id || '',
      id: examId,
    });

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

    const percentResult = Math.round(
      (numberOfCorrectAnswer / (exam.questions || []).length) * 100,
    );

    const resultStatus =
      percentResult >= exam.setting.percentageToPass
        ? RESULT_EXAM_STATUS.PASS
        : RESULT_EXAM_STATUS.FAILED;

    const questions = (exam.questions || []).map((userAnswerQuestion) => {
      const userAnswerByQuestion = answers.find(
        (answer) => answer.questionId === userAnswerQuestion.question,
      );

      return <AnswerQuestionEntity>{
        question: userAnswerQuestion.question,
        answerOrder: userAnswerByQuestion?.answerOrder,
        answerValue: userAnswerByQuestion?.answerValue,
      };
    });

    const updatedExam = {
      ...exam,
      score: score > 0 ? score : 0,
      resultStatus,
      status: USER_EXAM_STATUS.SUBMITTED,
      questions,
    };

    const newExam = await this.userExamRepository.update(updatedExam);

    return {
      ...newExam,
      numberOfCorrectAnswer,
    };
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
