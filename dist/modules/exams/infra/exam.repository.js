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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const group_repository_1 = require("../../group/infra/group.repository");
const exam_schema_1 = require("../domain/exam.schema");
let ExamRepository = class ExamRepository {
    constructor(repository, groupRepository) {
        this.repository = repository;
        this.groupRepository = groupRepository;
    }
    async findByCondition(options) {
        const { id } = options, rest = __rest(options, ["id"]);
        const formatedOptions = id ? Object.assign({ _id: id }, rest) : Object.assign({}, rest);
        const exam = await this.repository
            .findOne(formatedOptions)
            .populate('questions schedules.assignedGroup', '-options.value')
            .lean()
            .exec();
        if (!exam) {
            return;
        }
        return this.toEntity(exam);
    }
    async create(examEntity) {
        const exam = await this.repository.create(examEntity);
        return this.findByCondition({
            id: exam._id.toString(),
        });
    }
    async update(examEntity) {
        await this.repository.updateOne({ _id: examEntity.id }, Object.assign(Object.assign({}, examEntity), { _id: examEntity.id }));
        return this.findByCondition({
            id: examEntity.id || '',
        });
    }
    async findAll(pageOptions, query, userId = '') {
        const { take, skip } = pageOptions;
        const extractQuery = {
            $or: [{ name: query.name }, { code: query.code }],
        };
        const examQuery = userId
            ? this.repository.find(Object.assign(Object.assign({}, extractQuery), { createdBy: userId }))
            : this.repository.find(Object.assign({}, extractQuery));
        const total = await examQuery.clone().count();
        const exams = await examQuery
            .populate('questions')
            .limit(take)
            .skip(skip)
            .sort({ updatedAt: -1 })
            .select('-questions.options -createdBy -updatedBy')
            .lean()
            .exec();
        return {
            data: exams.map((examModel) => this.toEntity(examModel)),
            total,
        };
    }
    async delete(examId) {
        await this.repository.deleteOne({ _id: examId });
    }
    async findAllExams() {
        const examModels = await this.repository.find().lean().exec();
        return examModels.map((examModel) => this.toEntity(examModel));
    }
    toEntity(exam) {
        var _a, _b, _c, _d;
        return {
            id: exam._id.toString(),
            code: exam.code,
            name: exam.name,
            description: exam.description,
            defaultQuestionNumber: exam.defaultQuestionNumber,
            type: exam.type,
            questionBankType: exam.questionBankType,
            questions: (exam.questions || []).map((question) => question._id.toString()),
            questionEntities: (exam.questions || []).map((question) => (Object.assign(Object.assign({}, question), { id: question._id.toString() }))),
            setting: exam.setting,
            schedules: (exam.schedules || []).map((schedule) => {
                var _a;
                return (Object.assign(Object.assign({}, schedule), { assignedGroup: (_a = schedule.assignedGroup) === null || _a === void 0 ? void 0 : _a._id.toString(), assignedGroupEntity: schedule.assignedGroup
                        ? this.groupRepository.toEntity(schedule.assignedGroup)
                        : undefined }));
            }),
            updatedAt: exam.updatedAt,
            createdAt: exam.createdAt,
            createdBy: (_b = (_a = exam.createdBy) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString(),
            updatedBy: (_d = (_c = exam.updatedBy) === null || _c === void 0 ? void 0 : _c._id) === null || _d === void 0 ? void 0 : _d.toString(),
        };
    }
};
ExamRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exam_schema_1.Exam.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        group_repository_1.GroupRepository])
], ExamRepository);
exports.ExamRepository = ExamRepository;
//# sourceMappingURL=exam.repository.js.map