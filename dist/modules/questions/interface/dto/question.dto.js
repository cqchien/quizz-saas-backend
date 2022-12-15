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
exports.QuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constant_1 = require("../../constant");
const question_options_dto_1 = require("./question-options.dto");
class QuestionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: constant_1.QUESTION_TYPE,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: constant_1.HEURISTIC_LEVEL,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "heuristicLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: constant_1.QUESTION_STATUS,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maximum: 10, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QuestionDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], QuestionDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: question_options_dto_1.QuestionOptionsDto,
        isArray: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], QuestionDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'en' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], QuestionDto.prototype, "attachment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: constant_1.MODE,
        default: constant_1.MODE.PUBLIC,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "mode", void 0);
exports.QuestionDto = QuestionDto;
//# sourceMappingURL=question.dto.js.map