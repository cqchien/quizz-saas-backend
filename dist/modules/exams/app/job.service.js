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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobExamService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const moment_1 = __importDefault(require("moment"));
const constants_1 = require("../../../constants");
const constant_1 = require("../constant");
const exam_repository_1 = require("../infra/exam.repository");
let JobExamService = class JobExamService {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }
    async handleStatusExam() {
        const examEntities = await this.examRepository.findAllExams();
        await Promise.all(examEntities.map(async (exam) => {
            const schedules = exam.schedules.map((schedule) => {
                if (schedule.status === constant_1.SCHEDULE_STATUS.COMPLETED) {
                    return schedule;
                }
                const now = (0, moment_1.default)().utc().format(constants_1.FORMAT_FULL_TIME);
                const endDate = (0, moment_1.default)(schedule.endTime)
                    .utc()
                    .format(constants_1.FORMAT_FULL_TIME);
                const startDate = (0, moment_1.default)(schedule.startTime)
                    .utc()
                    .format(constants_1.FORMAT_FULL_TIME);
                if (now >= endDate) {
                    return Object.assign(Object.assign({}, schedule), { status: constant_1.SCHEDULE_STATUS.COMPLETED });
                }
                if (now >= startDate && now < endDate) {
                    return Object.assign(Object.assign({}, schedule), { status: constant_1.SCHEDULE_STATUS.IN_PROGRESS });
                }
                return schedule;
            });
            await this.examRepository.update(Object.assign(Object.assign({}, exam), { schedules }));
        }));
    }
};
__decorate([
    (0, schedule_1.Cron)(constant_1.UPDATE_EXAM_STATUS_TIME.toString()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobExamService.prototype, "handleStatusExam", null);
JobExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exam_repository_1.ExamRepository])
], JobExamService);
exports.JobExamService = JobExamService;
//# sourceMappingURL=job.service.js.map