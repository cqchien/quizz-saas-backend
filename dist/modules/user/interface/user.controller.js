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
exports.UserController = void 0;
const nestjs_swagger_api_exception_decorator_1 = require("@nanogiants/nestjs-swagger-api-exception-decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_type_1 = require("../../../constants/role-type");
const decorators_1 = require("../../../decorators");
const exceptions_1 = require("../../../exceptions");
const user_service_1 = require("../app/user.service");
const user_entity_1 = require("../domain/entity/user.entity");
const response_presenter_1 = require("./presenter/response.presenter");
const user_presenter_1 = require("./presenter/user.presenter");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getCurrentUser(user) {
        const userEntity = await this.userService.findOne({ email: user.email });
        const userPresenter = new user_presenter_1.UserPresenter(userEntity);
        return new response_presenter_1.UserResponsePresenter(userPresenter);
    }
    async getUsers() {
        const userEntities = await this.userService.findAll({
            role: role_type_1.RoleType.USER,
        });
        const userPresenters = userEntities.map((entity) => new user_presenter_1.UserPresenter(entity));
        return new response_presenter_1.UserResponsePresenter(userPresenters);
    }
};
__decorate([
    (0, common_1.Get)('me'),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [exceptions_1.UserNotFoundException, exceptions_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.UserResponsePresenter,
        description: 'Get information of current user',
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)([]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [exceptions_1.UserNotFoundException, exceptions_1.ServerErrorException]),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.UserResponsePresenter,
        description: 'Get information of list users',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map