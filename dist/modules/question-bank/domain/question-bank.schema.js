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
exports.questionBankSchema = exports.QuestionBank = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../../../common/abstract.schema");
const user_schema_1 = require("../../user/domain/user.schema");
const enum_1 = require("../constant/enum");
let QuestionBank = class QuestionBank extends abstract_schema_1.AbstractSchema {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], QuestionBank.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'question_type', type: String }),
    __metadata("design:type", Number)
], QuestionBank.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'heuristic_level', type: String }),
    __metadata("design:type", Number)
], QuestionBank.prototype, "heuristicLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'question_status', type: String }),
    __metadata("design:type", Number)
], QuestionBank.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'quantity_level', max: 10, min: 1 }),
    __metadata("design:type", Number)
], QuestionBank.prototype, "level", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'quantity_level', type: Array }),
    __metadata("design:type", Array)
], QuestionBank.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], QuestionBank.prototype, "topic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], QuestionBank.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], QuestionBank.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], QuestionBank.prototype, "attachment", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], QuestionBank.prototype, "isPrivate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.User.name,
    }),
    __metadata("design:type", String)
], QuestionBank.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.User.name,
    }),
    __metadata("design:type", String)
], QuestionBank.prototype, "updatedBy", void 0);
QuestionBank = __decorate([
    (0, mongoose_1.Schema)()
], QuestionBank);
exports.QuestionBank = QuestionBank;
exports.questionBankSchema = mongoose_1.SchemaFactory.createForClass(QuestionBank);
exports.questionBankSchema.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
//# sourceMappingURL=question-bank.schema.js.map