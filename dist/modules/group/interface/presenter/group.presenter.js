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
exports.GroupPresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../../constants");
const decorators_1 = require("../../../../decorators");
const user_presenter_1 = require("../../../user/interface/presenter/user.presenter");
class GroupPresenter {
    constructor(entity) {
        this.id = entity.id;
        this.name = entity.name;
        this.description = entity.description;
        this.members = (entity.memberEntities || []).map((memberEntity) => new user_presenter_1.UserPresenter(memberEntity));
        this.createdBy = entity.createdByEntity
            ? new user_presenter_1.UserPresenter(entity.createdByEntity)
            : undefined;
        this.updatedAt = entity.updatedAt;
        this.createdAt = entity.createdAt;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GroupPresenter.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], GroupPresenter.prototype, "name", void 0);
__decorate([
    (0, decorators_1.ApiEnumProperty)(() => constants_1.RoleType),
    __metadata("design:type", String)
], GroupPresenter.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: user_presenter_1.UserPresenter,
        isArray: true,
    }),
    __metadata("design:type", Array)
], GroupPresenter.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: user_presenter_1.UserPresenter,
    }),
    __metadata("design:type", user_presenter_1.UserPresenter)
], GroupPresenter.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], GroupPresenter.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], GroupPresenter.prototype, "createdAt", void 0);
exports.GroupPresenter = GroupPresenter;
//# sourceMappingURL=group.presenter.js.map