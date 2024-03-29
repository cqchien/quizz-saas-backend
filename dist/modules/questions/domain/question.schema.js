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
exports.questionSchema = exports.Question = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../../../common/abstract.schema");
let Question = class Question extends abstract_schema_1.AbstractSchema {
};
__decorate([
    (0, mongoose_1.Prop)({ index: 'text' }),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'type', type: String, index: true }),
    __metadata("design:type", String)
], Question.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'heuristic_level', type: String }),
    __metadata("design:type", String)
], Question.prototype, "heuristicLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'status', type: String }),
    __metadata("design:type", String)
], Question.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'quantity_level', max: 10, min: 1 }),
    __metadata("design:type", Number)
], Question.prototype, "level", void 0);
__decorate([
    (0, mongoose_1.Prop)({ name: 'options', type: Array }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Question.prototype, "topic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], index: true }),
    __metadata("design:type", Array)
], Question.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Question.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Question.prototype, "attachments", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Question.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", String)
], Question.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", String)
], Question.prototype, "updatedBy", void 0);
Question = __decorate([
    (0, mongoose_1.Schema)()
], Question);
exports.Question = Question;
exports.questionSchema = mongoose_1.SchemaFactory.createForClass(Question);
exports.questionSchema.index({ question: 'text' }, {
    name: 'question-full-text-search',
    default_language: 'en-US',
    language_override: 'en-US',
});
exports.questionSchema.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
//# sourceMappingURL=question.schema.js.map