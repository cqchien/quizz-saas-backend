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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const page_meta_dto_1 = require("../../../common/dto/page-meta.dto");
const context_provider_1 = require("../../../providers/context.provider");
const question_schema_1 = require("../domain/question.schema");
const question_get_serialization_1 = require("../interface/serialization/question.get.serialization");
const question_list_serialization_1 = require("../interface/serialization/question.list.serialization");
const question_response_serialization_1 = require("../interface/serialization/question.response.serialization");
let QuestionService = class QuestionService {
    constructor(questionModel) {
        this.questionModel = questionModel;
        this.createQuestion = async (questionCreateDto) => {
            const user = context_provider_1.ContextProvider.getAuthUser();
            const question = new this.questionModel(questionCreateDto);
            question.updatedBy = question.createdBy = (user === null || user === void 0 ? void 0 : user.id) || '';
            await question.save();
            const questionDetail = await this.questionModel
                .findOne({
                _id: question._id,
            })
                .lean()
                .populate('createdBy updatedBy');
            const questionSerialization = this.serializationQuestionGet(questionDetail);
            return this.serializationQuestionsResponse(questionSerialization);
        };
        this.updateQuestion = async (questionId, questionUpdateDto) => {
            const user = context_provider_1.ContextProvider.getAuthUser();
            const questionDetail = await this.questionModel.findOne({
                _id: questionId,
            });
            if (!questionDetail) {
                throw new common_1.NotFoundException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'user.error.notFound',
                });
            }
            const updatedQuestion = Object.assign(questionDetail, Object.assign(Object.assign({}, questionUpdateDto), { updatedBy: user === null || user === void 0 ? void 0 : user.id }));
            await this.questionModel.updateOne({ _id: questionId }, updatedQuestion);
            const questionResult = await this.questionModel
                .findOne({
                _id: questionId,
            })
                .lean()
                .populate('createdBy updatedBy');
            const questionSerialization = this.serializationQuestionGet(questionResult);
            return this.serializationQuestionsResponse(questionSerialization);
        };
        this.deleteQuestion = async (questionId) => {
            const questionDetail = await this.questionModel.findOne({
                _id: questionId,
            });
            if (!questionDetail) {
                throw new common_1.NotFoundException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'user.error.notFound',
                });
            }
            await this.questionModel.deleteOne({ _id: questionId });
            const questionSerialization = this.serializationQuestionGet(questionDetail);
            return this.serializationQuestionsResponse(questionSerialization);
        };
        this.findAll = async (options) => {
            let questionsQuery = this.questionModel.find();
            if (options.searchField) {
                questionsQuery = this.questionModel.find({
                    [options.searchField]: options.searchValue,
                });
            }
            if (options.order) {
                void questionsQuery.sort(options.order);
            }
            void questionsQuery.limit(options.take);
            void questionsQuery.skip(options.skip);
            const questions = await questionsQuery.lean();
            const questionsCount = await this.questionModel.countDocuments();
            const paginationMetaData = new page_meta_dto_1.PageMetaDto(options, questionsCount);
            const questionsSerialization = this.serializationQuestionsList(questions);
            return this.serializationQuestionsResponse(questionsSerialization, paginationMetaData);
        };
        this.findOne = async (questionId) => {
            const questionDetail = await this.questionModel
                .findOne({
                _id: questionId,
            })
                .lean()
                .populate('createdBy updatedBy');
            if (!questionDetail) {
                throw new common_1.NotFoundException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'user.error.notFound',
                });
            }
            const questionSerialization = this.serializationQuestionGet(questionDetail);
            return this.serializationQuestionsResponse(questionSerialization);
        };
    }
    serializationQuestionGet(data) {
        return (0, class_transformer_1.plainToInstance)(question_get_serialization_1.QuestionGetSerialization, data);
    }
    serializationQuestionsList(data) {
        return (0, class_transformer_1.plainToInstance)(question_list_serialization_1.QuestionListSerialization, data);
    }
    serializationQuestionsResponse(data, meta) {
        return (0, class_transformer_1.plainToInstance)(question_response_serialization_1.QuestionResponseSerialization, { data, meta });
    }
};
QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map