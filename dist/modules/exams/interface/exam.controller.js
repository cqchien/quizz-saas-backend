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
exports.ExamController = void 0;
const nestjs_swagger_api_exception_decorator_1 = require("@nanogiants/nestjs-swagger-api-exception-decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_meta_dto_1 = require("../../../common/dto/page-meta.dto");
const page_options_dto_1 = require("../../../common/dto/page-options.dto");
const role_type_1 = require("../../../constants/role-type");
const decorators_1 = require("../../../decorators");
const exam_not_found_exception_1 = require("../../../exceptions/exam/exam-not-found.exception");
const exam_save_failed_exception_1 = require("../../../exceptions/exam/exam-save-failed.exception");
const server_error_exception_1 = require("../../../exceptions/server-error.exception");
const user_entity_1 = require("../../user/domain/entity/user.entity");
const exam_service_1 = require("../app/exam.service");
const exam_dto_1 = require("./dto/exam.dto");
const query_dto_1 = require("./dto/query.dto");
const exam_presenter_1 = require("./presenter/exam.presenter");
const response_presenter_1 = require("./presenter/response.presenter");
let ExamController = class ExamController {
    constructor(examService) {
        this.examService = examService;
    }
    async getAllQuestions(user, pageOptionsDto, queryDto) {
        const { data, total } = await this.examService.findAll(user, queryDto, pageOptionsDto);
        const questionPresenters = (data || []).map((question) => new exam_presenter_1.ExamPresenter(question));
        const pageMetaPresenters = new page_meta_dto_1.PageMetaDto(pageOptionsDto, total);
        return new response_presenter_1.ExamResponsePresenter(questionPresenters, pageMetaPresenters);
    }
    async createExam(user, examDto) {
        const examEntity = await this.examService.createExam(user, examDto);
        const examPresenter = new exam_presenter_1.ExamPresenter(examEntity);
        return new response_presenter_1.ExamResponsePresenter(examPresenter);
    }
    async updateExam(user, examId, examDto) {
        const examEntity = await this.examService.update(user, examId, examDto);
        const examPresenter = new exam_presenter_1.ExamPresenter(examEntity);
        return new response_presenter_1.ExamResponsePresenter(examPresenter);
    }
    async getDetailQuestion(user, examId) {
        const examEntity = await this.examService.findOne(user, { id: examId });
        const examPresenter = new exam_presenter_1.ExamPresenter(examEntity);
        return new response_presenter_1.ExamResponsePresenter(examPresenter);
    }
    async getOverView(user, examId) {
        const examEntity = await this.examService.getOverview(user, examId);
        const examPresenter = new exam_presenter_1.ExamPresenter(examEntity);
        return new response_presenter_1.ExamResponsePresenter(examPresenter);
    }
    async deleteExam(user, examId) {
        await this.examService.delete(user, examId);
        return new response_presenter_1.ExamResponsePresenter({});
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.ExamResponsePresenter,
        description: 'Get all exams successfully',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        page_options_dto_1.PageOptionsDto,
        query_dto_1.QueryExamDto]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [exam_save_failed_exception_1.ExamSaveFailedException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.ExamResponsePresenter,
        description: 'Exam is created successfully',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, exam_dto_1.ExamDto]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "createExam", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [
        exam_not_found_exception_1.ExamNotFoundException,
        exam_save_failed_exception_1.ExamSaveFailedException,
        server_error_exception_1.ServerErrorException,
    ]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.ExamResponsePresenter,
        description: 'Exam is update successfully',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String, exam_dto_1.ExamDto]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "updateExam", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [exam_not_found_exception_1.ExamNotFoundException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.ExamResponsePresenter,
        description: 'Get detail information of the exam successfully',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getDetailQuestion", null);
__decorate([
    (0, common_1.Get)(':id/overview'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [exam_not_found_exception_1.ExamNotFoundException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.ExamResponsePresenter,
        description: 'Get detail information of the exam successfully',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getOverView", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Auth)([role_type_1.RoleType.ADMIN, role_type_1.RoleType.USER]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [exam_not_found_exception_1.ExamNotFoundException, server_error_exception_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.ExamResponsePresenter,
        description: 'Successfully Delete',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "deleteExam", null);
ExamController = __decorate([
    (0, common_1.Controller)('exams'),
    (0, swagger_1.ApiTags)('exams'),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
exports.ExamController = ExamController;
//# sourceMappingURL=exam.controller.js.map