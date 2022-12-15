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
exports.GroupResponsePresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
const group_presenter_1 = require("./group.presenter");
class GroupResponsePresenter {
    constructor(data) {
        this.data = data;
        this.success = true;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: group_presenter_1.GroupPresenter || [group_presenter_1.GroupPresenter] || {},
    }),
    __metadata("design:type", Object)
], GroupResponsePresenter.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], GroupResponsePresenter.prototype, "success", void 0);
exports.GroupResponsePresenter = GroupResponsePresenter;
//# sourceMappingURL=response.presenter.js.map