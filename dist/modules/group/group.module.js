"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GroupModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const shared_module_1 = require("../../shared/shared.module");
const auth_module_1 = require("../auth/auth.module");
const mail_module_1 = require("../mail/mail.module");
const user_module_1 = require("../user/user.module");
const group_service_1 = require("./app/group.service");
const group_schema_1 = require("./domain/group.schema");
const group_repository_1 = require("./infra/group.repository");
const group_controller_1 = require("./interface/group.controller");
let GroupModule = GroupModule_1 = class GroupModule {
};
GroupModule = GroupModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            user_module_1.UserModule,
            GroupModule_1,
            mail_module_1.MailModule,
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([{ name: group_schema_1.Group.name, schema: group_schema_1.groupSchema }]),
        ],
        controllers: [group_controller_1.GroupController],
        exports: [group_service_1.GroupService, group_repository_1.GroupRepository],
        providers: [group_service_1.GroupService, group_repository_1.GroupRepository],
    })
], GroupModule);
exports.GroupModule = GroupModule;
//# sourceMappingURL=group.module.js.map