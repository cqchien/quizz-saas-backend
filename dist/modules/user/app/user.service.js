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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../domain/user.schema");
const user_get_serialization_1 = require("../serialization/user.get.serialization");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    findOne(findData) {
        return this.userModel.findOne(findData).lean().exec();
    }
    async createUser(userRegisterDto) {
        const existedUser = await this.userModel.findOne({
            email: userRegisterDto.email,
        });
        if (existedUser) {
            throw new common_1.ConflictException({
                statusCode: common_1.HttpStatus.CONFLICT,
                message: 'user.error.emailExist',
            });
        }
        const user = new this.userModel(userRegisterDto);
        await user.save();
        const userDetail = await this.userModel
            .findOne({
            _id: user._id,
        })
            .lean();
        return this.serializationUserGet(userDetail);
    }
    serializationUserGet(data) {
        return (0, class_transformer_1.plainToInstance)(user_get_serialization_1.UserGetSerialization, data);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map