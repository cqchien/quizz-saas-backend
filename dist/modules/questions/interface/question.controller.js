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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_options_dto_1 = require("../../../common/dto/page-options.dto");
const role_type_1 = require("../../../constants/role-type");
const decorators_1 = require("../../../decorators");
const question_service_1 = require("../app/question.service");
const question_create_dto_1 = require("../domain/dto/question.create.dto");
const question_update_dto_1 = require("../domain/dto/question.update.dto");
const question_response_serialization_1 = require("../serialization/question.response.serialization");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async createQuestion(questionCreateDto) {
        const question = await this.questionService.createQuestion(questionCreateDto);
        return question;
    }
    async getAllQuestions(getAllDto) {
        const questions = await this.questionService.findAll(getAllDto);
        return questions;
    }
    async getDetailQuestion(questionId) {
        const question = await this.questionService.findOne(questionId);
        return question;
    }
    async updateQuestion(questionId, questionUpdateDto) {
        const question = await this.questionService.updateQuestion(questionId, questionUpdateDto);
        return question;
    }
    async deleteQuestion(questionId) {
        const question = await this.questionService.deleteQuestion(questionId);
        return question;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: question_response_serialization_1.QuestionResponseSerialization,
        description: 'Successfully created',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_create_dto_1.QuestionCreateDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: question_response_serialization_1.QuestionResponseSerialization,
        description: 'Successfully Get All',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.Get)(':questionId'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: question_response_serialization_1.QuestionResponseSerialization,
        description: 'Successfully Get Detail',
    }),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getDetailQuestion", null);
__decorate([
    (0, common_1.Put)(':questionId'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: question_response_serialization_1.QuestionResponseSerialization,
        description: 'Successfully Update',
    }),
    __param(0, (0, common_1.Param)('questionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, question_update_dto_1.QuestionUpdateDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)(':questionId'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: question_response_serialization_1.QuestionResponseSerialization,
        description: 'Successfully Delete',
    }),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "deleteQuestion", null);
QuestionController = __decorate([
    (0, common_1.Controller)('question'),
    (0, swagger_1.ApiTags)('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map