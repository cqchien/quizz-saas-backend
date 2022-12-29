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
const jsonwebtoken_1 = require("jsonwebtoken");
const exceptions_1 = require("../../../exceptions");
const user_service_1 = require("../../user/app/user.service");
const user_presenter_1 = require("../../user/interface/presenter/user.presenter");
const auth_service_1 = require("../app/auth.service");
const change_password_dto_1 = require("./dto/change-password.dto");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const login_presenter_1 = require("./presenter/login.presenter");
const response_presenter_1 = require("./presenter/response.presenter");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    getToken(res) {
        const privateKey = `
    -----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEAh0jHFwkkWXZ45jCuE+hCRUWVrL2/VXhqGGa8BmbqPo18d1lo
    rUfDuYkjQZvQaO4HfCURmpwhzPrgErUt7ztuv3dRbDsHRIlIbSgDWdE2AsDrjhsN
    bpSiXZPsuDL4wuKYwY4U478p9ugtuqai8bNOEomLz41qcVil1nTa6yxCyzPTsOlg
    rYFD2C/VWcjHin+895WD5aekGxYq+u1XowSien/XhVNHjW6ZbickMKx0994gIK3+
    ulhCuU+kGd7MR0DL8qFrLmQtT2ttOPolP5uxy9fFSSVxCNQrTLApjIRH4nAOzgLv
    wh5dOEBw3FBbVvQGczgb5ajDw4X4z/TV1XqLYQIDAQABAoIBAAMLwWBIVlk9jq+r
    nErCU6YmwL3FvKpoanabzwtTmz3u7nTLNn0yyMJLVzfvobnQFKrv1HlzPxtT8XI4
    YjUxBM+CqKqXumRZlS/wewFVYZp+pJsTqrnw9qYl2cpEqwdLxenTOK8PR3sJu5hY
    jsIDggwurL8+wU0VpG+7fC+X9LXJn76/8tAZPxG88zmvKCYwokimBjaZwC2b8F99
    CE6c9QwCjXIFBdc3j0gmYx/Zc5tNRoyVm0acHCF/nrTHfhOLS0+R2tm2xMMKuEl+
    vKnPkpUSreJElW+ohI2F8XCyUUOsYUsSmbe5fklFTa5pEmOoJBYnnKNuYmRLF/Mg
    Nhvy5AECgYEAvG+LM9AZ0tqcN/SQPMYHtK5qRSssRgej7Px8jbO583X5wsjaHz94
    shvQo0ppid8Fsgnwg9v3ccjD1ybA+dxgD+rhi8Nn8vEcyOrgwGFE8wlE+/aaXwtr
    4erKlwTxh9AW1cN/cg5l8B8PbjyE6Lh+JltgqxJbmXwkUli83OAQxWECgYEAt8p7
    Ckb/NTmO+vBqVLqutX3NnX/FhR1TbbTPI7bAjisIZ18bYEePACuyDKlPCbfOqhOi
    NikN5h6Y+OS5uEHN3BiMsfu5FFof9V1wNfDwBfFhyv2aLthoN63SibCSDWAUuHKN
    VGtZFv04yEsbmpHKSrJeLCAfVuabeplTUmu5hgECgYAG2U8H7RJjNYrkBcGQU+pH
    yOcX6H/Nc82jeXHVfKjPjoQrbj1vUVFDt/sXVEcNucttMytIv5/4xMFJeqEc88OS
    EIluGQYYMGdJbjAJDgABjV6ygb4Ook2jgnMmlglpVEjgMCDbtmZCGf7nlM+H3dzH
    7B5RWXN22qo/S/ZhWMuDQQKBgQCwCiSiKnDGVVRrbZ4bfBhdxJsOsdTKdNV1bks9
    xQ1Y30UUZld9d+0z16aaVA1dnI45/8ZOpDIo6cPSGpr9LyJ0H5ub2yViphSYW6Bg
    OmBdAOCPoytslWH1euv/cH3ki9Qs+6P9aTkTOQaLas2M1vnxZDmpgDckcIwZ+QSD
    HKW+AQKBgQCePhbvYAcuQ8xAHo5XZ9PRanTzD9OLO3Kl6Z8J1GasCQtRrLVLJghe
    iJCFr6/gVKWx5/Wjeau3k22LMXrLNAYML8q4on1BnWx8C2uJK62Tu9Zh4cTK4xjZ
    uJkr2sINb10vlE57J9/RZFSkPae5QqpHSGskTWnhdqgqQmmhZNGuQg==
    -----END RSA PRIVATE KEY-----
    `;
        const payload = {
            sub: '123',
            name: 'chien.cq',
            exp: Math.floor(Date.now() / 1000) + 60 * 1000000,
        };
        const token = (0, jsonwebtoken_1.sign)(payload, privateKey, { algorithm: 'HS256' });
        res.set('content-type', 'application/json');
        res.status(200);
        res.send(JSON.stringify({
            token,
        }));
    }
    async userLogin(userLoginDto) {
        const user = await this.authService.validateUser(userLoginDto);
        const token = await this.authService.createAccessToken({
            userId: user.id,
            role: user.role,
        });
        const userPresenter = new user_presenter_1.UserPresenter(user);
        const loginPresenter = new login_presenter_1.LoginPresenter(userPresenter, token);
        return new response_presenter_1.AuthResponsePresenter(loginPresenter);
    }
    async userRegister(userRegisterDto) {
        const user = await this.userService.createUser(userRegisterDto);
        const userPresenter = new user_presenter_1.UserPresenter(user);
        return new response_presenter_1.AuthResponsePresenter(userPresenter);
    }
    async userChangePassword(token, changePasswordDto) {
        const user = await this.authService.verifyAccessToken(token);
        const updatedUser = await this.userService.changePassword(user.id || '', changePasswordDto);
        const userPresenter = new user_presenter_1.UserPresenter(updatedUser);
        return new response_presenter_1.AuthResponsePresenter(userPresenter);
    }
};
__decorate([
    (0, common_1.Post)('jwt'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getToken", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.AuthResponsePresenter,
        description: 'User info with access token',
    }),
    (0, nestjs_swagger_api_exception_decorator_1.ApiException)(() => [exceptions_1.UserNotFoundException]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.AuthResponsePresenter,
        description: 'Successfully Registered',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.UserRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: response_presenter_1.AuthResponsePresenter,
        description: 'Successfully Change Password',
    }),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userChangePassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map