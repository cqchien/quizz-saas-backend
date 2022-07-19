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
exports.QuestionUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../constant/enum");
const question_options_dto_1 = require("./question-options.dto");
class QuestionUpdateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionUpdateDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_1.QuestionType,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QuestionUpdateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_1.HeuristicLevel,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QuestionUpdateDto.prototype, "heuristicLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_1.QuestionStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionUpdateDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maximum: 10, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QuestionUpdateDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionUpdateDto.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], QuestionUpdateDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: question_options_dto_1.QuestionOptionsDto,
        isArray: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], QuestionUpdateDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'vi' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionUpdateDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], QuestionUpdateDto.prototype, "attachment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], QuestionUpdateDto.prototype, "isPrivate", void 0);
exports.QuestionUpdateDto = QuestionUpdateDto;
//# sourceMappingURL=question.update.dto.js.map