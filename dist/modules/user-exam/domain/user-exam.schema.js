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
exports.userExamSchema = exports.UserExam = exports.examQuestionSchema = exports.AnswerQuestion = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../../../common/abstract.schema");
const exam_schema_1 = require("../../exams/domain/exam.schema");
const question_schema_1 = require("../../questions/domain/question.schema");
const user_schema_1 = require("../../user/domain/user.schema");
const setting_schema_1 = require("./setting.schema");
let AnswerQuestion = class AnswerQuestion {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: question_schema_1.Question.name,
    }),
    __metadata("design:type", question_schema_1.Question)
], AnswerQuestion.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], AnswerQuestion.prototype, "answerOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String || Boolean,
    }),
    __metadata("design:type", Object)
], AnswerQuestion.prototype, "answerValue", void 0);
AnswerQuestion = __decorate([
    (0, mongoose_1.Schema)()
], AnswerQuestion);
exports.AnswerQuestion = AnswerQuestion;
exports.examQuestionSchema = mongoose_1.SchemaFactory.createForClass(AnswerQuestion);
let UserExam = class UserExam extends abstract_schema_1.AbstractSchema {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: exam_schema_1.Exam.name,
    }),
    __metadata("design:type", exam_schema_1.Exam)
], UserExam.prototype, "templateExam", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: user_schema_1.User.name,
    }),
    __metadata("design:type", user_schema_1.User)
], UserExam.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserExam.prototype, "scheduleCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: () => setting_schema_1.UserExamSetting,
    }),
    __metadata("design:type", setting_schema_1.UserExamSetting)
], UserExam.prototype, "setting", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserExam.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserExam.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserExam.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserExam.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserExam.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    __metadata("design:type", Number)
], UserExam.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    __metadata("design:type", Number)
], UserExam.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserExam.prototype, "resultStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserExam.prototype, "questionBankType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.examQuestionSchema] }),
    __metadata("design:type", Array)
], UserExam.prototype, "questions", void 0);
UserExam = __decorate([
    (0, mongoose_1.Schema)()
], UserExam);
exports.UserExam = UserExam;
exports.userExamSchema = mongoose_1.SchemaFactory.createForClass(UserExam);
exports.userExamSchema.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
//# sourceMappingURL=user-exam.schema.js.map