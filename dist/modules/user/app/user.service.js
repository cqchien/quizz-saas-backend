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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../common/utils");
const role_type_1 = require("../../../constants/role-type");
const user_exist_exception_1 = require("../../../exceptions/user/user-exist.exception");
const user_not_found_exception_1 = require("../../../exceptions/user/user-not-found.exception");
const user_save_failed_exception_1 = require("../../../exceptions/user/user-save-failed.exception");
const user_repository_1 = require("../infra/user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOne(options) {
        const user = await this.userRepository.findByCondition(options);
        if (!user) {
            throw new user_not_found_exception_1.UserNotFoundException('User does not exist!!');
        }
        return user;
    }
    async findAll(opts) {
        return this.userRepository.findAll(opts);
    }
    async createUser(userRegisterDto) {
        const existedUser = await this.userRepository.findByCondition({
            email: userRegisterDto.email,
        });
        if (existedUser) {
            throw new user_exist_exception_1.UserExistException('User is existed!!');
        }
        const userEntity = Object.assign(Object.assign({}, userRegisterDto), { password: (0, utils_1.generateHash)(userRegisterDto.password), role: role_type_1.RoleType.USER });
        const user = await this.userRepository.create(userEntity);
        if (!user) {
            throw new user_save_failed_exception_1.UserSaveFailedException('Create user failed!');
        }
        return user;
    }
    async changePassword(userId, changePasswordDto) {
        if (changePasswordDto.password !== changePasswordDto.confirmedPassword) {
            throw new common_1.BadRequestException('Password does not match.');
        }
        const existedUser = await this.userRepository.findByCondition({
            id: userId,
        });
        if (!existedUser) {
            throw new user_exist_exception_1.UserExistException('User does not exist!!');
        }
        const userEntity = Object.assign(Object.assign({}, existedUser), { password: (0, utils_1.generateHash)(changePasswordDto.password) });
        const user = await this.userRepository.update(userEntity);
        if (!user) {
            throw new user_save_failed_exception_1.UserSaveFailedException('Change password for user failed!');
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map