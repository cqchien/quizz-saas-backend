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
exports.UserExamRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_exam_schema_1 = require("../domain/user-exam.schema");
let UserExamRepository = class UserExamRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findByCondition(options, isHideResult = false) {
        const { id } = options, rest = __rest(options, ["id"]);
        const formatedOptions = id ? Object.assign({ _id: id }, rest) : Object.assign({}, rest);
        const populateOptions = isHideResult && '-options.value';
        const userExamEntity = await this.repository
            .findOne(formatedOptions)
            .populate('templateExam user questions.question', populateOptions)
            .lean()
            .exec();
        if (!userExamEntity) {
            return;
        }
        return this.toEntity(userExamEntity);
    }
    async create(userExamEntity) {
        const user = await this.repository.create(userExamEntity);
        return this.toEntity(user.toObject());
    }
    async update(userExamEntity) {
        await this.repository.updateOne({ _id: userExamEntity.id }, Object.assign(Object.assign({}, userExamEntity), { _id: userExamEntity.id }));
        return this.findByCondition({
            id: userExamEntity.id || '',
            user: userExamEntity.user,
        }, true);
    }
    async getAll(query = {}, pageOptions) {
        const userExamQuery = this.repository.find(Object.assign({}, query));
        if (pageOptions) {
            const total = await userExamQuery.clone().count();
            const userExamEntity = await userExamQuery
                .limit(pageOptions.take)
                .skip(pageOptions.skip)
                .populate('templateExam')
                .sort({ updatedAt: -1 })
                .lean()
                .exec();
            return {
                data: userExamEntity.map((examEntity) => this.toEntity(examEntity)),
                total,
            };
        }
        const userExamEntity = await userExamQuery
            .sort({ updatedAt: -1 })
            .populate('user')
            .lean()
            .exec();
        return userExamEntity.map((examEntity) => this.toEntity(examEntity));
    }
    toEntity(userExam) {
        var _a, _b, _c;
        const schedules = (((_a = userExam.templateExam) === null || _a === void 0 ? void 0 : _a.schedules) || []).map((schedule) => {
            var _a, _b;
            return (Object.assign(Object.assign({}, schedule), { assignedGroup: (_b = (_a = schedule.assignedGroup) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString() }));
        });
        return {
            id: userExam._id.toString(),
            templateExam: (_b = userExam.templateExam) === null || _b === void 0 ? void 0 : _b._id.toString(),
            templateExamEntity: Object.assign(Object.assign({}, userExam.templateExam), { id: (_c = userExam.templateExam) === null || _c === void 0 ? void 0 : _c._id.toString(), questions: [], schedules, createdBy: undefined, updatedBy: undefined }),
            user: userExam.user._id.toString(),
            userEntity: Object.assign(Object.assign({}, userExam.user), { id: userExam.user._id.toString() }),
            setting: userExam.setting,
            code: userExam.code,
            name: userExam.name,
            description: userExam.description,
            status: userExam.status,
            type: userExam.type,
            score: userExam.score,
            total: userExam.total,
            resultStatus: userExam.resultStatus,
            questionBankType: userExam.questionBankType,
            questions: (userExam.questions || []).map((answerQuestion) => {
                var _a, _b;
                return (Object.assign(Object.assign({}, answerQuestion), { question: (_a = answerQuestion.question) === null || _a === void 0 ? void 0 : _a._id.toString(), questionEntity: Object.assign(Object.assign({}, answerQuestion.question), { id: (_b = answerQuestion.question) === null || _b === void 0 ? void 0 : _b._id.toString() }) }));
            }),
            scheduleCode: userExam.scheduleCode,
            updatedAt: userExam.updatedAt,
            createdAt: userExam.createdAt,
        };
    }
};
UserExamRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_exam_schema_1.UserExam.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserExamRepository);
exports.UserExamRepository = UserExamRepository;
//# sourceMappingURL=user-exam.repository.js.map