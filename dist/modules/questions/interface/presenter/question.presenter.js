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
exports.QuestionPresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
class QuestionPresenter {
    constructor(entity) {
        this.id = entity.id;
        this.question = entity.question;
        this.type = entity.type;
        this.heuristicLevel = entity.heuristicLevel;
        this.status = entity.status;
        this.level = entity.level;
        this.topic = entity.topic;
        this.tags = entity.tags;
        this.options = entity.options;
        this.language = entity.language;
        this.attachments = entity.attachments;
        this.mode = entity.mode;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
        this.createdBy = entity.createdBy;
        this.updatedBy = entity.updatedBy;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "heuristicLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maximum: 10, minimum: 1 }),
    __metadata("design:type", Number)
], QuestionPresenter.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], QuestionPresenter.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], QuestionPresenter.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'vi' }),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], QuestionPresenter.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], QuestionPresenter.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], QuestionPresenter.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionPresenter.prototype, "updatedBy", void 0);
exports.QuestionPresenter = QuestionPresenter;
//# sourceMappingURL=question.presenter.js.map