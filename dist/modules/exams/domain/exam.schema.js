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
exports.examSchema = exports.Exam = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../../../common/abstract.schema");
const question_schema_1 = require("../../questions/domain/question.schema");
const user_schema_1 = require("../../user/domain/user.schema");
const schedule_schema_1 = require("./schedule.schema");
const setting_schema_1 = require("./setting.schema");
let Exam = class Exam extends abstract_schema_1.AbstractSchema {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
    }),
    __metadata("design:type", String)
], Exam.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
    }),
    __metadata("design:type", String)
], Exam.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Exam.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Exam.prototype, "defaultQuestionNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Exam.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Exam.prototype, "questionBankType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: mongoose_2.SchemaTypes.ObjectId,
                ref: question_schema_1.Question.name,
            },
        ],
    }),
    __metadata("design:type", Array)
], Exam.prototype, "questions", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", user_schema_1.User)
], Exam.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", user_schema_1.User)
], Exam.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => setting_schema_1.Setting }),
    __metadata("design:type", setting_schema_1.Setting)
], Exam.prototype, "setting", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [schedule_schema_1.scheduleSchema] }),
    __metadata("design:type", Array)
], Exam.prototype, "schedules", void 0);
Exam = __decorate([
    (0, mongoose_1.Schema)()
], Exam);
exports.Exam = Exam;
exports.examSchema = mongoose_1.SchemaFactory.createForClass(Exam);
exports.examSchema.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
//# sourceMappingURL=exam.schema.js.map