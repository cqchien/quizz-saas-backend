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
exports.UserPresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../../constants");
const decorators_1 = require("../../../../decorators");
class UserPresenter {
    constructor(entity) {
        var _a, _b;
        this.id = entity.id || ((_b = (_a = entity) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString());
        this.name = entity.name;
        this.role = entity.role;
        this.email = entity.email;
        this.avatar = entity.avatar;
        this.phone = entity.phone;
        this.updatedAt = entity.updatedAt;
        this.createdAt = entity.createdAt;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserPresenter.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserPresenter.prototype, "name", void 0);
__decorate([
    (0, decorators_1.ApiEnumProperty)(() => constants_1.RoleType),
    __metadata("design:type", String)
], UserPresenter.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserPresenter.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserPresenter.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserPresenter.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], UserPresenter.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], UserPresenter.prototype, "createdAt", void 0);
exports.UserPresenter = UserPresenter;
//# sourceMappingURL=user.presenter.js.map