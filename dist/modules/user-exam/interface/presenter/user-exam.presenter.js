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
exports.UserExamPresenter = exports.AnswerQuestionPresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
const exam_presenter_1 = require("../../../exams/interface/presenter/exam.presenter");
const question_presenter_1 = require("../../../questions/interface/presenter/question.presenter");
const user_presenter_1 = require("../../../user/interface/presenter/user.presenter");
const constant_1 = require("../../constant");
const setting_presenter_1 = require("./setting.presenter");
class AnswerQuestionPresenter {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: question_presenter_1.QuestionPresenter,
    }),
    __metadata("design:type", question_presenter_1.QuestionPresenter)
], AnswerQuestionPresenter.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AnswerQuestionPresenter.prototype, "answerOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], AnswerQuestionPresenter.prototype, "answerValue", void 0);
exports.AnswerQuestionPresenter = AnswerQuestionPresenter;
class UserExamPresenter {
    constructor(entity) {
        this.id = entity.id;
        this.templateExam = entity.templateExamEntity
            ? new exam_presenter_1.ExamPresenter(entity.templateExamEntity)
            : undefined;
        this.user = entity.userEntity
            ? new user_presenter_1.UserPresenter(entity.userEntity)
            : undefined;
        this.code = entity.code;
        this.name = entity.name;
        this.description = entity.description;
        this.scheduleCode = entity.scheduleCode;
        this.setting = entity.setting;
        this.status = entity.status;
        this.type = entity.type;
        this.score = entity.score || 0;
        this.total = entity.total || 0;
        this.numberOfCorrectAnswer = entity.numberOfCorrectAnswer;
        this.resultStatus = constant_1.MAP_RESULT_EXAM_STATUS[entity.resultStatus];
        this.questionBankType = entity.questionBankType;
        this.questions = (entity.questions || []).map((answerQuestionEntity) => ({
            question: answerQuestionEntity.questionEntity &&
                new question_presenter_1.QuestionPresenter(answerQuestionEntity.questionEntity),
            answerOrder: answerQuestionEntity.answerOrder,
            answerValue: answerQuestionEntity.answerValue,
        }));
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserExamPresenter.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: exam_presenter_1.ExamPresenter,
    }),
    __metadata("design:type", exam_presenter_1.ExamPresenter)
], UserExamPresenter.prototype, "templateExam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: user_presenter_1.UserPresenter,
    }),
    __metadata("design:type", user_presenter_1.UserPresenter)
], UserExamPresenter.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: setting_presenter_1.UserExamSettingPresenter,
    }),
    __metadata("design:type", setting_presenter_1.UserExamSettingPresenter)
], UserExamPresenter.prototype, "setting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserExamPresenter.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserExamPresenter.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserExamPresenter.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserExamPresenter.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserExamPresenter.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserExamPresenter.prototype, "scheduleCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserExamPresenter.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserExamPresenter.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserExamPresenter.prototype, "numberOfCorrectAnswer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserExamPresenter.prototype, "resultStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserExamPresenter.prototype, "questionBankType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: AnswerQuestionPresenter,
        isArray: true,
    }),
    __metadata("design:type", Array)
], UserExamPresenter.prototype, "questions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], UserExamPresenter.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], UserExamPresenter.prototype, "updatedAt", void 0);
exports.UserExamPresenter = UserExamPresenter;
//# sourceMappingURL=user-exam.presenter.js.map