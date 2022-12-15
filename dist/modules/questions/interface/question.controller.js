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
const nestjs_swagger_api_exception_decorator_1 = require("@nanogiants/nestjs-swagger-api-exception-decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_meta_dto_1 = require("../../../common/dto/page-meta.dto");
const page_options_dto_1 = require("../../../common/dto/page-options.dto");
const role_type_1 = require("../../../constants/role-type");
const decorators_1 = require("../../../decorators");
const question_exist_exception_1 = require("../../../exceptions/question/question-exist.exception");
const question_not_found_exception_1 = require("../../../exceptions/question/question-not-found.exception");
const server_error_exception_1 = require("../../../exceptions/server-error.exception");
const user_entity_1 = require("../../user/domain/entity/user.entity");
const question_service_1 = require("../app/question.service");
const query_dto_1 = require("./dto/query.dto");
const question_dto_1 = require("./dto/question.dto");
const question_presenter_1 = require("./presenter/question.presenter");
const response_presenter_1 = require("./presenter/response.presenter");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async createQuestion(user, questionDto) {
        const questionEntity = await this.questionService.createQuestion(user, questionDto);
        const questionPresenter = new question_presenter_1.QuestionPresenter(questionEntity);
        return new response_presenter_1.QuestionResponsePresenter(questionPresenter);
    }
    async getAllQuestions(user, pageOptionsDto, queryDto) {
        const { data, total } = await this.questionService.findAll(user, queryDto, pageOptionsDto);
        const questionPresenters = (data || []).map((question) => new question_presenter_1.QuestionPresenter(question));
        const pageMetaPresenters = new page_meta_dto_1.PageMetaDto(pageOptionsDto, total);
        return new response_presenter_1.QuestionResponsePresenter(questionPresenters, pageMetaPresenters);
    }
    async uploadQuestions(user, file) {
        const questions = await this.questionService.uploadQuestions(file, user);
        const questionPresenters = (questions || []).map((question) => new question_presenter_1.QuestionPresenter(question));
        return new response_presenter_1.QuestionResponsePresenter(questionPresenters);
    }
    async getDetailQuestion(questionId) {
        const questionEntity = await this.questionService.findOne({
            id: questionId,
        });
        const questionPresenter = new question_presenter_1.QuestionPresenter(questionEntity);
        return new response_presenter_1.QuestionResponsePresenter(questionPresenter);
    }
    async updateQuestion(user, questionId, questionUpdateDto) {
        const questionEntity = await this.questionService.updateQuestion(user, questionId, questionUpdateDto);
        const questionPresenter = new question_presenter_1.QuestionPresenter(questionEntity);
        return new response_presenter_1.QuestionResponsePresenter(questionPresenter);
    }
    async deleteQuestion(user, questionId) {
        await this.questionService.deleteQuestion(user, questionId);
        return new response_presenter_1.QuestionResponsePresenter();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [question_exist_exception_1.QuestionExistException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.QuestionResponsePresenter,
        description: 'Question is created successfully',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        question_dto_1.QuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [server_error_exception_1.ServerErrorException]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.QuestionResponsePresenter,
        description: 'Get all questions successfully',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        page_options_dto_1.PageOptionsDto,
        query_dto_1.QueryQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [server_error_exception_1.ServerErrorException]),
    (0, decorators_1.ApiFile)([{ name: 'file', isArray: false }]),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "uploadQuestions", null);
__decorate([
    (0, common_1.Get)(':questionId'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [question_not_found_exception_1.QuestionNotFoundException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.QuestionResponsePresenter,
        description: 'Get detail information of the questions successfully',
    }),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getDetailQuestion", null);
__decorate([
    (0, common_1.Put)(':questionId'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [question_not_found_exception_1.QuestionNotFoundException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.QuestionResponsePresenter,
        description: 'Question is updated successfully',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('questionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String, question_dto_1.QuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)(':questionId'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [question_not_found_exception_1.QuestionNotFoundException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.QuestionResponsePresenter,
        description: 'Successfully Delete',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "deleteQuestion", null);
QuestionController = __decorate([
    (0, common_1.Controller)('questions'),
    (0, swagger_1.ApiTags)('questions'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map