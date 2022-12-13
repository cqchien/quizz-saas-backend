"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const group_module_1 = require("../group/group.module");
const user_exam_module_1 = require("../user-exam/user-exam.module");
const exam_service_1 = require("./app/exam.service");
const job_service_1 = require("./app/job.service");
const exam_schema_1 = require("./domain/exam.schema");
const exam_repository_1 = require("./infra/exam.repository");
const exam_controller_1 = require("./interface/exam.controller");
let ExamModule = class ExamModule {
};
ExamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            group_module_1.GroupModule,
            user_exam_module_1.UserExamModule,
            mongoose_1.MongooseModule.forFeature([{ name: exam_schema_1.Exam.name, schema: exam_schema_1.examSchema }]),
        ],
        controllers: [exam_controller_1.ExamController],
        exports: [exam_service_1.ExamService],
        providers: [exam_service_1.ExamService, job_service_1.JobExamService, exam_repository_1.ExamRepository],
    })
], ExamModule);
exports.ExamModule = ExamModule;
//# sourceMappingURL=exam.module.js.map