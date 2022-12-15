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
exports.UserExamController = void 0;
const nestjs_swagger_api_exception_decorator_1 = require("@nanogiants/nestjs-swagger-api-exception-decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_meta_dto_1 = require("../../../common/dto/page-meta.dto");
const page_options_dto_1 = require("../../../common/dto/page-options.dto");
const decorators_1 = require("../../../decorators");
const server_error_exception_1 = require("../../../exceptions/server-error.exception");
const user_entity_1 = require("../../user/domain/entity/user.entity");
const user_exam_service_1 = require("../app/user-exam.service");
const user_answer_exam_dto_1 = require("./dto/user-answer-exam.dto");
const response_presenter_1 = require("./presenter/response.presenter");
const user_exam_presenter_1 = require("./presenter/user-exam.presenter");
let UserExamController = class UserExamController {
    constructor(userExamService) {
        this.userExamService = userExamService;
    }
    async getAll(user, pageOptionsDto) {
        const { data, total } = await this.userExamService.getAll(user, pageOptionsDto);
        const userExamPresenters = (data || []).map((examEntity) => new user_exam_presenter_1.UserExamPresenter(examEntity));
        const pageMetaPresenters = new page_meta_dto_1.PageMetaDto(pageOptionsDto, total);
        return new response_presenter_1.UserExamResponsePresenter(userExamPresenters, pageMetaPresenters);
    }
    async getOverview(user, userExamId) {
        const examEntity = await this.userExamService.getOverview(user, userExamId);
        const userExamPresenter = new user_exam_presenter_1.UserExamPresenter(examEntity);
        return new response_presenter_1.UserExamResponsePresenter(userExamPresenter);
    }
    async takeExam(user, userExamId) {
        const examEntity = await this.userExamService.takeExam(user, userExamId);
        const userExamPresenter = new user_exam_presenter_1.UserExamPresenter(examEntity);
        return new response_presenter_1.UserExamResponsePresenter(userExamPresenter);
    }
    async submit(user, answers, userExamId) {
        const examEntity = await this.userExamService.submit(user, userExamId, answers);
        const userExamPresenter = new user_exam_presenter_1.UserExamPresenter(examEntity);
        return new response_presenter_1.UserExamResponsePresenter(userExamPresenter);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.UserExamResponsePresenter,
        description: 'Get information of the exam by user',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        page_options_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], UserExamController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id/overview'),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.UserExamResponsePresenter,
        description: 'Get overview information of the exam by user',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], UserExamController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)(':id/take-exam'),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.UserExamResponsePresenter,
        description: 'Get information of the exam by user',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], UserExamController.prototype, "takeExam", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.UserExamResponsePresenter,
        description: 'User submit the exam',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        user_answer_exam_dto_1.UserAnswersDto, String]),
    __metadata("design:returntype", Promise)
], UserExamController.prototype, "submit", null);
UserExamController = __decorate([
    (0, common_1.Controller)('user-exams'),
    (0, swagger_1.ApiTags)('users-exams'),
    __metadata("design:paramtypes", [user_exam_service_1.UserExamService])
], UserExamController);
exports.UserExamController = UserExamController;
//# sourceMappingURL=user-exam.controller.js.map