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
exports.ExamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constant_1 = require("../../constant");
const schedule_dto_1 = require("./schedule.dto");
const setting_dto_1 = require("./setting.dto");
class ExamDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExamDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExamDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExamDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExamDto.prototype, "defaultQuestionNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExamDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: constant_1.QUESTION_BANK_TYPE,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExamDto.prototype, "questionBankType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], ExamDto.prototype, "questions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", setting_dto_1.SettingDto)
], ExamDto.prototype, "setting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: schedule_dto_1.ScheduleDto,
        isArray: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], ExamDto.prototype, "schedules", void 0);
exports.ExamDto = ExamDto;
//# sourceMappingURL=exam.dto.js.map