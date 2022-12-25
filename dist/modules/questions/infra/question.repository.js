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
exports.QuestionRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constant_1 = require("../constant");
const question_schema_1 = require("../domain/question.schema");
let QuestionRepository = class QuestionRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findByCondition(options) {
        const { id } = options, rest = __rest(options, ["id"]);
        const formatedOptions = id ? Object.assign({ _id: id }, rest) : Object.assign({}, rest);
        const questionModel = await this.repository
            .findOne(formatedOptions)
            .lean()
            .populate('createdBy updatedBy')
            .exec();
        return this.toEntity(questionModel);
    }
    async findAll(pageOptions, queryDto, mode = '', userId = '') {
        var _a, _b;
        const { take, skip } = pageOptions;
        const { topic, tags, question, createdBy } = queryDto;
        let query = {};
        const tmp = [];
        if (topic) {
            tmp.push({ topic });
        }
        if (tags) {
            tmp.push({ tags: { $in: tags.split(',') } });
        }
        if (topic || tags) {
            query = Object.assign(Object.assign({}, query), { $or: [...tmp] });
        }
        let andQuery = [];
        if (question) {
            andQuery = [
                ...andQuery,
                {
                    $text: {
                        $search: question,
                    },
                },
            ];
        }
        if (createdBy) {
            andQuery = [...andQuery, { createdBy }];
        }
        if (mode === constant_1.MODE.PUBLIC) {
            andQuery = [...andQuery, { mode }];
        }
        else {
            if (userId) {
                andQuery =
                    mode === constant_1.MODE.PRIVATE
                        ? [...andQuery, { createdBy: userId }]
                        : [
                            ...andQuery,
                            {
                                $or: [{ createdBy: userId }, { mode: constant_1.MODE.PUBLIC }],
                            },
                        ];
            }
        }
        query = Object.assign(Object.assign({}, query), { $and: [...andQuery] });
        if (!query['$or'] || ((_a = query['$or']) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            delete query['$or'];
        }
        if (!query['$and'] || ((_b = query['$and']) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            delete query['$and'];
        }
        const questionsQuery = this.repository.find(Object.assign({}, query));
        const total = await questionsQuery.clone().count();
        const questions = await questionsQuery
            .populate('createdBy')
            .limit(take)
            .skip(skip)
            .sort({ updatedAt: -1 })
            .lean()
            .exec();
        return {
            data: questions.map((questionModel) => this.toEntity(questionModel)),
            total,
        };
    }
    async create(questionEntity) {
        const question = await this.repository.create(questionEntity);
        return this.toEntity(question.toObject());
    }
    async createMultiple(questionEntity) {
        const questions = await this.repository.insertMany(questionEntity);
        return questions.map((question) => this.toEntity(question.toObject()));
    }
    async update(questionEntity) {
        await this.repository.updateOne({ _id: questionEntity.id }, Object.assign(Object.assign({}, questionEntity), { _id: questionEntity.id }));
        return this.findByCondition({ id: questionEntity.id || '' });
    }
    async delete(questionId) {
        await this.repository.deleteOne({ _id: questionId });
    }
    toEntity(questionModel) {
        var _a;
        if (!questionModel) {
            return undefined;
        }
        return {
            id: (_a = questionModel._id) === null || _a === void 0 ? void 0 : _a.toString(),
            question: questionModel.question,
            type: questionModel.type,
            heuristicLevel: questionModel.heuristicLevel,
            status: questionModel.status,
            level: questionModel.level,
            topic: questionModel.topic,
            tags: questionModel.tags,
            options: questionModel.options.map((questionOption) => ({
                order: questionOption.order,
                option: questionOption.option,
                value: questionOption.value,
            })),
            language: questionModel.language,
            attachments: questionModel.attachments,
            mode: questionModel.mode,
            createdBy: questionModel.createdBy,
            updatedBy: questionModel.updatedBy,
            createdAt: questionModel.createdAt,
            updatedAt: questionModel.updatedAt,
        };
    }
};
QuestionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuestionRepository);
exports.QuestionRepository = QuestionRepository;
//# sourceMappingURL=question.repository.js.map