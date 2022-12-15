"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExamService = void 0;
const common_1 = require("@nestjs/common");
const role_type_1 = require("../../../constants/role-type");
const constant_1 = require("../../exams/constant");
const mail_service_1 = require("../../mail/mail.service");
const constant_2 = require("../../questions/constant");
const user_service_1 = require("../../user/app/user.service");
const constant_3 = require("../constant");
const user_exam_repository_1 = require("../infra/user-exam.repository");
let UserExamService = class UserExamService {
    constructor(userExamRepository, userService, mailService) {
        this.userExamRepository = userExamRepository;
        this.userService = userService;
        this.mailService = mailService;
    }
    async createExamForUser(userId, exam, scheduleCode) {
        const userEntity = await this.userService.findOne({
            id: userId,
        });
        const schedule = exam.schedules.find((scheduleEntity) => scheduleEntity.code === scheduleCode);
        if (!userEntity || !schedule) {
            return;
        }
        const questionsUserExam = exam.questions.map((questionId) => ({
            question: questionId,
        }));
        const userExamEntity = {
            templateExam: exam.id || '',
            user: userId,
            scheduleCode,
            setting: exam.setting,
            code: exam.code,
            name: exam.name,
            score: 0,
            total: exam.setting.plusScorePerQuestion * exam.questions.length,
            resultStatus: constant_3.RESULT_EXAM_STATUS.NOT_SET,
            description: exam.description,
            type: exam.type,
            questionBankType: exam.questionBankType,
            status: constant_3.USER_EXAM_STATUS.NOT_STARTED,
            questions: questionsUserExam,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const userExam = await this.userExamRepository.create(userExamEntity);
        if (!userExam) {
            return;
        }
        await this.sendEmailInformUser(userEntity, userExam, schedule);
        return userExam;
    }
    async sendEmailInformUser(userEntity, userExam, schedule) {
        try {
            await this.mailService.sendEmailInformUserTakeExam(userEntity, userExam, schedule);
        }
        catch (error) {
            console.error(error);
        }
    }
    async getOverview(user, examId) {
        const query = user.role === role_type_1.RoleType.ADMIN
            ? { id: examId }
            : { id: examId, user: user.id || '' };
        const userExam = await this.userExamRepository.findByCondition(query);
        if (!userExam || userExam.status !== constant_3.USER_EXAM_STATUS.SUBMITTED) {
            throw new common_1.NotFoundException('Exam does not exist or user not allow to get the exam!!');
        }
        const questionMap = this.getAnswerOfQuestions(userExam.questions || []);
        const correctAnswer = (userExam.questions || []).filter((answerQuestion) => questionMap[answerQuestion.question.toString()].includes(answerQuestion.answerOrder));
        return Object.assign(Object.assign({}, userExam), { numberOfCorrectAnswer: correctAnswer.length });
    }
    async takeExam(user, examId) {
        var _a;
        const exam = await this.userExamRepository.findByCondition({
            id: examId,
            user: user.id || '',
        }, true);
        if (!exam) {
            throw new common_1.NotFoundException('Exam does not exist or user not allow to get the exam!!');
        }
        if (exam.status === constant_3.USER_EXAM_STATUS.SUBMITTED) {
            throw new common_1.BadRequestException('Exam have already submitted!!');
        }
        const inProgressSchedule = (_a = exam.templateExamEntity) === null || _a === void 0 ? void 0 : _a.schedules.find((schedule) => schedule.status === constant_1.SCHEDULE_STATUS.IN_PROGRESS &&
            schedule.code === exam.scheduleCode);
        if (!inProgressSchedule) {
            throw new common_1.BadRequestException('Exam not allow to view or schedule does not exist.');
        }
        if (!this.checkValidTakeExam(inProgressSchedule.startTime, inProgressSchedule.endTime)) {
            throw new common_1.BadRequestException('You can view the exam when it has started and during the test.');
        }
        return this.userExamRepository.update(Object.assign(Object.assign({}, exam), { status: constant_3.USER_EXAM_STATUS.IN_PROGRESS }));
    }
    async getAll(user, pageOptionsDto) {
        const query = user.role !== role_type_1.RoleType.ADMIN ? { user: user.id || '' } : {};
        const userExams = (await this.userExamRepository.getAll(query, pageOptionsDto));
        return userExams;
    }
    async getUsersExamsByTemplate(templateExamId) {
        const userExams = (await this.userExamRepository.getAll({
            templateExam: templateExamId,
        }));
        return userExams;
    }
    async submit(user, examId, userAnswer) {
        var _a;
        const { answers } = userAnswer;
        const exam = await this.userExamRepository.findByCondition({
            user: user.id || '',
            id: examId,
        });
        const userExamSchedule = (((_a = exam === null || exam === void 0 ? void 0 : exam.templateExamEntity) === null || _a === void 0 ? void 0 : _a.schedules) || []).find((schedule) => schedule.code === (exam === null || exam === void 0 ? void 0 : exam.scheduleCode));
        if (!exam ||
            exam.status === constant_3.USER_EXAM_STATUS.SUBMITTED ||
            (userExamSchedule === null || userExamSchedule === void 0 ? void 0 : userExamSchedule.status) !== constant_1.SCHEDULE_STATUS.IN_PROGRESS) {
            throw new common_1.NotFoundException('Exam does not exist or user not allow to submit the exam!!');
        }
        const questionMap = this.getAnswerOfQuestions(exam.questions || []);
        const correctAnswer = answers.filter((answer) => questionMap[answer.questionId.toString()].includes(answer.answerOrder));
        const numberOfCorrectAnswer = correctAnswer.length;
        const numberOfWrongAnswer = (exam.questions || []).length - numberOfCorrectAnswer;
        const score = exam.setting.plusScorePerQuestion * numberOfCorrectAnswer -
            exam.setting.minusScorePerQuestion * numberOfWrongAnswer;
        const percentResult = exam.setting.plusScorePerQuestion
            ? Math.round((score / (exam.questions || []).length) *
                exam.setting.plusScorePerQuestion *
                100)
            : Math.round((numberOfCorrectAnswer / (exam.questions || []).length) * 100);
        const resultStatus = percentResult >= exam.setting.percentageToPass
            ? constant_3.RESULT_EXAM_STATUS.PASS
            : constant_3.RESULT_EXAM_STATUS.FAILED;
        const questions = (exam.questions || []).map((userAnswerQuestion) => {
            const userAnswerByQuestion = answers.find((answer) => answer.questionId === userAnswerQuestion.question);
            return {
                question: userAnswerQuestion.question,
                answerOrder: userAnswerByQuestion === null || userAnswerByQuestion === void 0 ? void 0 : userAnswerByQuestion.answerOrder,
                answerValue: userAnswerByQuestion === null || userAnswerByQuestion === void 0 ? void 0 : userAnswerByQuestion.answerValue,
            };
        });
        const updatedExam = Object.assign(Object.assign({}, exam), { score: score > 0 ? score : 0, resultStatus, status: constant_3.USER_EXAM_STATUS.SUBMITTED, questions, updatedAt: new Date() });
        const newExam = await this.userExamRepository.update(updatedExam);
        return Object.assign(Object.assign({}, newExam), { numberOfCorrectAnswer });
    }
    checkValidTakeExam(startTime, endTime) {
        const now = new Date();
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        return (startDate.getTime() <= now.getTime() && now.getTime() <= endDate.getTime());
    }
    getAnswerOfQuestions(questions) {
        return questions.reduce((map, answer) => {
            var _a, _b;
            const typeOfQuestion = (_a = answer.questionEntity) === null || _a === void 0 ? void 0 : _a.type;
            const correctOptions = (((_b = answer.questionEntity) === null || _b === void 0 ? void 0 : _b.options) || [])
                .filter((option) => option.value)
                .map((option) => typeOfQuestion === constant_2.QUESTION_TYPE.MULTIPLE_CHOICE
                ? option.order
                : option.value);
            map[answer.question.toString()] = correctOptions;
            return map;
        }, {});
    }
};
UserExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_exam_repository_1.UserExamRepository,
        user_service_1.UserService,
        mail_service_1.MailService])
], UserExamService);
exports.UserExamService = UserExamService;
//# sourceMappingURL=user-exam.service.js.map