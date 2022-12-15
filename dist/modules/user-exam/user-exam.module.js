"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExamModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mail_module_1 = require("../mail/mail.module");
const user_module_1 = require("../user/user.module");
const user_exam_service_1 = require("./app/user-exam.service");
const user_exam_schema_1 = require("./domain/user-exam.schema");
const user_exam_repository_1 = require("./infra/user-exam.repository");
const user_exam_controller_1 = require("./interface/user-exam.controller");
let UserExamModule = class UserExamModule {
};
UserExamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            mail_module_1.MailModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_exam_schema_1.UserExam.name, schema: user_exam_schema_1.userExamSchema },
            ]),
        ],
        controllers: [user_exam_controller_1.UserExamController],
        exports: [user_exam_service_1.UserExamService],
        providers: [user_exam_service_1.UserExamService, user_exam_repository_1.UserExamRepository],
    })
], UserExamModule);
exports.UserExamModule = UserExamModule;
//# sourceMappingURL=user-exam.module.js.map