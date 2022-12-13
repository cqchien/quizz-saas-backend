"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./modules/auth/auth.module");
const exam_module_1 = require("./modules/exams/exam.module");
const group_module_1 = require("./modules/group/group.module");
const question_module_1 = require("./modules/questions/question.module");
const user_module_1 = require("./modules/user/user.module");
const user_exam_module_1 = require("./modules/user-exam/user-exam.module");
const api_config_service_1 = require("./shared/services/api-config.service");
const shared_module_1 = require("./shared/shared.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [shared_module_1.SharedModule],
                useFactory: () => ({
                    uri: 'mongodb+srv://caochientp1:chiengu0@devconnector.3mowt.mongodb.net/quizz-saas?retryWrites=true&w=majority',
                }),
                inject: [api_config_service_1.ApiConfigService],
            }),
            user_module_1.UserModule,
            user_exam_module_1.UserExamModule,
            auth_module_1.AuthModule,
            question_module_1.QuestionModule,
            exam_module_1.ExamModule,
            group_module_1.GroupModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map