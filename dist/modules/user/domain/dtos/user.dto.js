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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const abstract_schema_dto_1 = require("../../../../common/dto/abstract.schema.dto");
const constants_1 = require("../../../../constants");
const decorators_1 = require("../../../../decorators");
class UserDto extends abstract_schema_dto_1.AbstractSchemaDto {
    constructor(schema) {
        super(schema);
        this.name = schema.name;
        this.role = schema.role;
        this.email = schema.email;
        this.avatar = schema.avatar;
        this.phone = schema.phone;
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, decorators_1.ApiEnumProperty)(() => constants_1.RoleType),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "phone", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map