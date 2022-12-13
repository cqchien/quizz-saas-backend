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
exports.ExamPresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
const question_presenter_1 = require("../../../questions/interface/presenter/question.presenter");
const user_presenter_1 = require("../../../user/interface/presenter/user.presenter");
const user_exam_presenter_1 = require("../../../user-exam/interface/presenter/user-exam.presenter");
const constant_1 = require("../../constant");
const schedule_presenter_1 = require("./schedule.presenter");
const setting_presenter_1 = require("./setting.presenter");
class ExamPresenter {
    constructor(entity) {
        this.id = entity.id;
        this.code = entity.code;
        this.name = entity.name;
        this.description = entity.description;
        this.defaultQuestionNumber = entity.defaultQuestionNumber;
        this.type = entity.type;
        this.questionBankType = entity.questionBankType;
        this.questions = (entity.questionEntities || []).map((questionEntity) => new question_presenter_1.QuestionPresenter(questionEntity));
        this.setting = entity.setting;
        this.schedules = (entity.schedules || []).map((schedule) => new schedule_presenter_1.SchedulePresenter(schedule));
        this.userExams = (entity.userExams || []).map((userExamEntity) => new user_exam_presenter_1.UserExamPresenter(userExamEntity));
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
        this.createdBy = entity.createdByEntity
            ? new user_presenter_1.UserPresenter(entity.createdByEntity)
            : undefined;
        this.updatedBy = entity.updatedByEntity
            ? new user_presenter_1.UserPresenter(entity.updatedByEntity)
            : undefined;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExamPresenter.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExamPresenter.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExamPresenter.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ExamPresenter.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ExamPresenter.prototype, "defaultQuestionNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ExamPresenter.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExamPresenter.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: constant_1.QUESTION_BANK_TYPE,
    }),
    __metadata("design:type", String)
], ExamPresenter.prototype, "questionBankType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: question_presenter_1.QuestionPresenter,
        isArray: true,
    }),
    __metadata("design:type", Array)
], ExamPresenter.prototype, "questions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: setting_presenter_1.SettingPresenter,
    }),
    __metadata("design:type", setting_presenter_1.SettingPresenter)
], ExamPresenter.prototype, "setting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: schedule_presenter_1.SchedulePresenter,
        isArray: true,
    }),
    __metadata("design:type", Array)
], ExamPresenter.prototype, "schedules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: user_exam_presenter_1.UserExamPresenter,
    }),
    __metadata("design:type", Array)
], ExamPresenter.prototype, "userExams", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], ExamPresenter.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], ExamPresenter.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", user_presenter_1.UserPresenter)
], ExamPresenter.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", user_presenter_1.UserPresenter)
], ExamPresenter.prototype, "updatedBy", void 0);
exports.ExamPresenter = ExamPresenter;
//# sourceMappingURL=exam.presenter.js.map