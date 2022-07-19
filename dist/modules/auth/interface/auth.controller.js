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
exports.AuthController = void 0;
const nestjs_swagger_api_exception_decorator_1 = require("@nanogiants/nestjs-swagger-api-exception-decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("../../user/app/user.service");
const user_get_serialization_1 = require("../../user/serialization/user.get.serialization");
const auth_service_1 = require("../app/auth.service");
const LoginPayloadDto_1 = require("../dto/LoginPayloadDto");
const UserLoginDto_1 = require("../dto/UserLoginDto");
const UserRegisterDto_1 = require("../dto/UserRegisterDto");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async userLogin(userLoginDto) {
        const user = await this.authService.validateUser(userLoginDto);
        const token = await this.authService.createAccessToken({
            userId: user._id,
            role: user.role,
        });
        return new LoginPayloadDto_1.LoginPayloadDto(user, token);
    }
    async userRegister(userRegisterDto) {
        const createdUser = await this.userService.createUser(userRegisterDto);
        return createdUser;
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: LoginPayloadDto_1.LoginPayloadDto,
        description: 'User info with access token',
    }),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [common_1.NotFoundException]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginDto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: user_get_serialization_1.UserGetSerialization,
        description: 'Successfully Registered',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterDto_1.UserRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegister", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map