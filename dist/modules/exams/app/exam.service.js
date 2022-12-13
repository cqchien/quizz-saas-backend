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
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const role_type_1 = require("../../../constants/role-type");
const exam_1 = require("../../../exceptions/exam");
const group_service_1 = require("../../group/app/group.service");
const user_exam_service_1 = require("../../user-exam/app/user-exam.service");
const constant_1 = require("../constant");
const exam_repository_1 = require("../infra/exam.repository");
let ExamService = class ExamService {
    constructor(examRepository, userExamService, groupService) {
        this.examRepository = examRepository;
        this.userExamService = userExamService;
        this.groupService = groupService;
    }
    async createExam(user, examDto) {
        try {
            let error = '';
            const formattedSchedules = (examDto.schedules || []).map((schedule) => {
                if (this.checkTimePast(schedule.startTime)) {
                    error = 'Can not schedule for the past!';
                }
                if (!this.checkStartEndTime(schedule.startTime, schedule.endTime)) {
                    error = 'End time should be greater than start time.';
                }
                return Object.assign(Object.assign({}, schedule), { status: constant_1.SCHEDULE_STATUS.NOT_STARTED });
            });
            const uniqueSchedule = (0, lodash_1.uniqBy)(formattedSchedules, 'code');
            if (uniqueSchedule.length !== formattedSchedules.length) {
                error = 'Can not create with duplicated code in schedule';
            }
            if (error) {
                throw new exam_1.ExamSaveFailedException(error);
            }
            const examEntity = Object.assign(Object.assign({}, examDto), { schedules: formattedSchedules, createdBy: user.id, updatedBy: user.id });
            const exam = await this.examRepository.create(examEntity);
            await Promise.all((exam.schedules || []).map(async (schedule) => this.createUserExams(exam, schedule, user.id || '')));
            return exam;
        }
        catch (error) {
            console.error(error);
            throw new exam_1.ExamSaveFailedException(error.message || 'Create exam failed!');
        }
    }
    async update(user, examId, examDto) {
        let error = '';
        const existedExam = await this.examRepository.findByCondition({
            id: examId,
        });
        if (!existedExam) {
            throw new exam_1.ExamNotFoundException('Exam does not exist!!');
        }
        if (existedExam.createdBy !== user.id && user.role !== role_type_1.RoleType.ADMIN) {
            throw new exam_1.ExamSaveFailedException('User does not have permission to update this exam');
        }
        const newSchedules = [];
        const formattedSchedules = (examDto.schedules || []).map((schedule) => {
            const existedSchedule = existedExam.schedules.find((examSchedule) => schedule.code === examSchedule.code);
            if ((existedSchedule === null || existedSchedule === void 0 ? void 0 : existedSchedule.status) === constant_1.SCHEDULE_STATUS.COMPLETED) {
                return existedSchedule;
            }
            const isStartTimeChange = new Date(schedule.startTime).getTime() !==
                new Date((existedSchedule === null || existedSchedule === void 0 ? void 0 : existedSchedule.startTime) || '').getTime();
            const isEndTimeChange = new Date(schedule.endTime).getTime() !==
                new Date((existedSchedule === null || existedSchedule === void 0 ? void 0 : existedSchedule.endTime) || '').getTime();
            if (isStartTimeChange && this.checkTimePast(schedule.startTime)) {
                error = 'Can not schedule for the past!';
            }
            if ((isEndTimeChange || isStartTimeChange) &&
                !this.checkStartEndTime(schedule.startTime, schedule.endTime)) {
                error = 'End time should be greater than start time.';
            }
            if (!existedSchedule) {
                newSchedules.push(schedule);
            }
            return Object.assign(Object.assign({}, schedule), { status: existedSchedule
                    ? existedSchedule.status
                    : constant_1.SCHEDULE_STATUS.NOT_STARTED });
        });
        const uniqueSchedule = (0, lodash_1.uniqBy)(formattedSchedules, 'code');
        if (uniqueSchedule.length !== formattedSchedules.length) {
            error = 'Can not create with duplicated code in schedule';
        }
        if (error) {
            throw new exam_1.ExamSaveFailedException(error);
        }
        const examEntity = Object.assign(Object.assign(Object.assign({}, existedExam), examDto), { schedules: formattedSchedules, updatedAt: new Date(), updatedBy: user.id });
        const exam = await this.examRepository.update(examEntity);
        if (!exam) {
            throw new exam_1.ExamSaveFailedException('Update exam failed!');
        }
        await Promise.all(newSchedules.map(async (schedule) => this.createUserExams(exam, schedule, user.id || '')));
        return exam;
    }
    async findAll(user, queryExamDto, pageOptionsDto) {
        if (user.role === role_type_1.RoleType.ADMIN) {
            return this.examRepository.findAll(pageOptionsDto, queryExamDto);
        }
        return this.examRepository.findAll(pageOptionsDto, queryExamDto, user.id);
    }
    async delete(user, examId) {
        const existedQuestion = await this.examRepository.findByCondition({
            id: examId,
        });
        if (!existedQuestion) {
            throw new exam_1.ExamNotFoundException('Exam does not exist!!');
        }
        if (existedQuestion.createdBy !== user.id && user.role !== role_type_1.RoleType.ADMIN) {
            throw new exam_1.ExamSaveFailedException('User does not have permission to delete this exam');
        }
        await this.examRepository.delete(examId);
    }
    async findOne(user, options) {
        const query = user.role !== role_type_1.RoleType.ADMIN
            ? Object.assign(Object.assign({}, options), { createdBy: user.id || '' }) : options;
        const exam = await this.examRepository.findByCondition(query);
        if (!exam) {
            throw new exam_1.ExamNotFoundException('Exam does not exist or user not allow to get the exam!!');
        }
        return exam;
    }
    async getOverview(user, examId) {
        const query = user.role !== role_type_1.RoleType.ADMIN
            ? { id: examId, createdBy: user.id || '' }
            : { id: examId };
        const exam = await this.examRepository.findByCondition(query);
        if (!exam) {
            throw new exam_1.ExamNotFoundException('Exam does not exist or user not allow to get the exam!!');
        }
        const userExams = await this.userExamService.getUsersExamsByTemplate(examId);
        return Object.assign(Object.assign({}, exam), { userExams });
    }
    checkTimePast(date) {
        const now = new Date();
        const dateTime = new Date(date);
        return now.getTime() - dateTime.getTime() > 60 * 1000;
    }
    checkStartEndTime(startTime, endTime) {
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        return startDate.getTime() <= endDate.getTime();
    }
    async createUserExams(exam, schedule, userId) {
        try {
            if (!schedule.assignedGroup) {
                return this.userExamService.createExamForUser(userId, exam, schedule.code);
            }
            const members = await this.groupService.getMembers(schedule.assignedGroup);
            await Promise.all((members || []).map(async (memberEntity) => this.userExamService.createExamForUser(memberEntity.id || '', exam, schedule.code)));
        }
        catch (error) {
            console.error(error);
        }
    }
};
ExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exam_repository_1.ExamRepository,
        user_exam_service_1.UserExamService,
        group_service_1.GroupService])
], ExamService);
exports.ExamService = ExamService;
//# sourceMappingURL=exam.service.js.map