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
exports.AuthResponsePresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../user/domain/entity/user.entity");
const login_presenter_1 = require("./login.presenter");
class AuthResponsePresenter {
    constructor(data) {
        this.data = data;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: login_presenter_1.LoginPresenter || user_entity_1.UserEntity }),
    __metadata("design:type", Object)
], AuthResponsePresenter.prototype, "data", void 0);
exports.AuthResponsePresenter = AuthResponsePresenter;
//# sourceMappingURL=response.presenter.js.map