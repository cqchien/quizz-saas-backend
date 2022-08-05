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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../domain/user.schema");
let UserRepository = class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findByCondition(options) {
        const { id } = options, rest = __rest(options, ["id"]);
        const formatedOptions = id ? Object.assign({ _id: id }, rest) : Object.assign({}, rest);
        const userModel = await this.repository
            .findOne(formatedOptions)
            .lean()
            .exec();
        return this.toEntity(userModel);
    }
    async create(userEntity) {
        const user = await this.repository.create(userEntity);
        return this.toEntity(user.toObject());
    }
    toEntity(userModel) {
        if (!userModel) {
            return undefined;
        }
        return {
            id: userModel._id.toString(),
            name: userModel.name,
            role: userModel.role,
            email: userModel.email,
            password: userModel.password,
            phone: userModel.phone,
            avatar: userModel.avatar,
            createdAt: userModel.createdAt,
            updatedAt: userModel.updatedAt,
        };
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map