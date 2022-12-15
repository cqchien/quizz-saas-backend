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
exports.GroupController = void 0;
const nestjs_swagger_api_exception_decorator_1 = require("@nanogiants/nestjs-swagger-api-exception-decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../decorators");
const exceptions_1 = require("../../../exceptions");
const user_entity_1 = require("../../user/domain/entity/user.entity");
const group_service_1 = require("../app/group.service");
const group_dto_1 = require("./dto/group.dto");
const query_dto_1 = require("./dto/query.dto");
const group_presenter_1 = require("./presenter/group.presenter");
const response_presenter_1 = require("./presenter/response.presenter");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async getAll(user, query) {
        const groupEntities = await this.groupService.findAll(user, query);
        const groupPresenters = groupEntities.map((groupEntity) => new group_presenter_1.GroupPresenter(groupEntity));
        return new response_presenter_1.GroupResponsePresenter(groupPresenters);
    }
    parseFile(file) {
        return this.groupService.parseFile(file);
    }
    async getOne(user, groupId) {
        const groupEntity = await this.groupService.findOne(user, groupId);
        const groupPresenter = new group_presenter_1.GroupPresenter(groupEntity);
        return new response_presenter_1.GroupResponsePresenter(groupPresenter);
    }
    async create(user, createGroupDto) {
        const groupEntity = await this.groupService.createGroup(user, createGroupDto);
        const groupPresenter = new group_presenter_1.GroupPresenter(groupEntity);
        return new response_presenter_1.GroupResponsePresenter(groupPresenter);
    }
    async update(user, groupId, createGroupDto) {
        const groupEntity = await this.groupService.updateOne(user, groupId, createGroupDto);
        const groupPresenter = new group_presenter_1.GroupPresenter(groupEntity);
        return new response_presenter_1.GroupResponsePresenter(groupPresenter);
    }
    async delete(user, groupId) {
        await this.groupService.delete(user, groupId);
        return new response_presenter_1.GroupResponsePresenter({});
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException, exceptions_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.GroupResponsePresenter,
        description: 'Get all groups',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        query_dto_1.QueryGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/parse'),
    (0, decorators_1.Auth)([]),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [exceptions_1.ServerErrorException]),
    (0, decorators_1.ApiFile)([{ name: 'file', isArray: false }]),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "parseFile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException, exceptions_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.GroupResponsePresenter,
        description: 'Get information of the group',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException, exceptions_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.GroupResponsePresenter,
        description: 'Get information of current user',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        group_dto_1.GroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException, exceptions_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.GroupResponsePresenter,
        description: 'Get information of current user',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String, group_dto_1.GroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException, exceptions_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.GroupResponsePresenter,
        description: 'Get information of current user',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "delete", null);
GroupController = __decorate([
    (0, common_1.Controller)('groups'),
    (0, swagger_1.ApiTags)('groups'),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupController);
exports.GroupController = GroupController;
//# sourceMappingURL=group.controller.js.map