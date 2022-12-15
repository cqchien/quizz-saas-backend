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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("../../../common/utils");
const constants_1 = require("../../../constants");
const user_not_found_exception_1 = require("../../../exceptions/user/user-not-found.exception");
const api_config_service_1 = require("../../../shared/services/api-config.service");
const user_service_1 = require("../../user/app/user.service");
const token_presenter_1 = require("../interface/presenter/token.presenter");
let AuthService = class AuthService {
    constructor(jwtService, configService, userService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
    }
    async createAccessToken(data) {
        return new token_presenter_1.TokenPresenter({
            expiresIn: this.configService.authConfig.jwtExpirationTime,
            accessToken: await this.jwtService.signAsync({
                userId: data.userId,
                type: constants_1.TokenType.ACCESS_TOKEN,
                role: data.role,
            }),
        });
    }
    async verifyAccessToken(token) {
        const result = await this.jwtService.verifyAsync(token);
        if (!(result === null || result === void 0 ? void 0 : result.userId)) {
            throw new common_1.UnauthorizedException();
        }
        const user = await this.userService.findOne({
            id: result.userId,
            role: result.role,
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
    async validateUser(userLoginDto) {
        const user = await this.userService.findOne({
            email: userLoginDto.email,
        });
        const isPasswordValid = await (0, utils_1.validateHash)(userLoginDto.password, user.password);
        if (!isPasswordValid) {
            throw new user_not_found_exception_1.UserNotFoundException('Wrong Password!');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        api_config_service_1.ApiConfigService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map