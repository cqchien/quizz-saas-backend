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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const role_type_1 = require("../../../constants/role-type");
const file_not_exel_exception_1 = require("../../../exceptions/file/file-not-exel.exception");
const question_exist_exception_1 = require("../../../exceptions/question/question-exist.exception");
const question_not_allow_to_save_exception_1 = require("../../../exceptions/question/question-not-allow-to-save.exception");
const question_not_found_exception_1 = require("../../../exceptions/question/question-not-found.exception");
const question_save_failed_exception_1 = require("../../../exceptions/question/question-save-failed.exception");
const server_error_exception_1 = require("../../../exceptions/server-error.exception");
const file_service_1 = require("../../../shared/services/file.service");
const validator_service_1 = require("../../../shared/services/validator.service");
const constant_1 = require("../../exams/constant");
const constant_2 = require("../constant");
const question_repository_1 = require("../infra/question.repository");
let QuestionService = class QuestionService {
    constructor(questionRepository, validatorService, fileService) {
        this.questionRepository = questionRepository;
        this.validatorService = validatorService;
        this.fileService = fileService;
    }
    async createQuestion(user, questionDto) {
        const existedQuestion = await this.questionRepository.findByCondition({
            question: questionDto.question,
        });
        if (existedQuestion) {
            throw new question_exist_exception_1.QuestionExistException('Question is existed!!');
        }
        const questionEntity = Object.assign(Object.assign({}, questionDto), { createdAt: new Date(), updatedAt: new Date(), createdBy: user.id, updatedBy: user.id });
        const question = await this.questionRepository.create(questionEntity);
        if (!question) {
            throw new question_save_failed_exception_1.QuestionSaveFailedException('Create question failed!');
        }
        return question;
    }
    async findOne(options) {
        const question = await this.questionRepository.findByCondition(options);
        if (!question) {
            throw new question_not_found_exception_1.QuestionNotFoundException('Question does not exist!!');
        }
        return question;
    }
    async findAll(user, queryDto, pageOptionsDto) {
        if (queryDto.type) {
            if (queryDto.type === constant_1.QUESTION_BANK_TYPE.SYSTEM) {
                return this.questionRepository.findAll(pageOptionsDto, queryDto, constant_2.MODE.PUBLIC);
            }
            return this.questionRepository.findAll(pageOptionsDto, queryDto, constant_2.MODE.PRIVATE, user.id);
        }
        if (user.role === role_type_1.RoleType.ADMIN) {
            return this.questionRepository.findAll(pageOptionsDto, queryDto);
        }
        return this.questionRepository.findAll(pageOptionsDto, queryDto, '', user.id);
    }
    async updateQuestion(user, questionId, questionDto) {
        const existedQuestion = await this.questionRepository.findByCondition({
            id: questionId,
        });
        if (!existedQuestion) {
            throw new question_not_found_exception_1.QuestionNotFoundException('Question does not exist!!');
        }
        const questionEntity = Object.assign(Object.assign({}, questionDto), { id: questionId, updatedAt: new Date(), updatedBy: user.id });
        const question = await this.questionRepository.update(questionEntity);
        if (!question) {
            throw new question_save_failed_exception_1.QuestionSaveFailedException('Update question failed!');
        }
        return question;
    }
    async deleteQuestion(user, questionId) {
        try {
            const existedQuestion = await this.questionRepository.findByCondition({
                id: questionId,
            });
            if (!existedQuestion) {
                throw new question_not_found_exception_1.QuestionNotFoundException('Question does not exist!!');
            }
            if (existedQuestion.createdBy !== user.id &&
                user.role !== role_type_1.RoleType.ADMIN) {
                throw new question_not_allow_to_save_exception_1.QuestionNotAllowToSave('User does not have permission to delete this question');
            }
            await this.questionRepository.delete(questionId);
        }
        catch (_a) {
            throw new server_error_exception_1.ServerErrorException();
        }
    }
    async uploadQuestions(file, user) {
        try {
            if (file && !this.validatorService.isExcel(file.mimetype)) {
                throw new file_not_exel_exception_1.FileNotExcelException('Only alow to upload exel file (.xlsx, .xls, .csv)');
            }
            const data = this.fileService.parseExcelFIle(file);
            const questionsToInsert = data.map((question) => {
                const questionType = question[constant_2.COLUMN_IMPORT_QUESTIONS.TYPE];
                const questionContent = question[constant_2.COLUMN_IMPORT_QUESTIONS.QUESTION];
                const correctAnswer = question[constant_2.COLUMN_IMPORT_QUESTIONS.CORRECT_ANSWER];
                const topic = question[constant_2.COLUMN_IMPORT_QUESTIONS.TOPIC];
                const tagNames = question[constant_2.COLUMN_IMPORT_QUESTIONS.TAGS];
                const level = question[constant_2.COLUMN_IMPORT_QUESTIONS.LEVEL];
                const status = question[constant_2.COLUMN_IMPORT_QUESTIONS.STATUS];
                const lang = question[constant_2.COLUMN_IMPORT_QUESTIONS.LANG];
                const heuristicLevel = question[constant_2.COLUMN_IMPORT_QUESTIONS.HEURISTIC_LEVEL];
                const mode = question[constant_2.COLUMN_IMPORT_QUESTIONS.MODE];
                const correctAnswerOrders = ((correctAnswer === null || correctAnswer === void 0 ? void 0 : correctAnswer.toString()) || '').split(',');
                const options = Object.keys(question)
                    .map((column) => {
                    if (!Object.values(constant_2.COLUMN_IMPORT_QUESTIONS).includes(column) &&
                        column.startsWith(constant_2.ANSWER_START_WITH)) {
                        const matches = column.match(/\((.*?)\)/);
                        const order = matches ? matches[1] : '0';
                        const value = (correctAnswerOrders || []).includes(order);
                        return {
                            order: Number.parseInt(order, 10),
                            option: question[column],
                            value,
                        };
                    }
                })
                    .filter((option) => option);
                return {
                    question: questionContent,
                    type: (0, lodash_1.invert)(constant_2.MAP_QUESTION_TYPE)[questionType],
                    options,
                    heuristicLevel: (0, lodash_1.invert)(constant_2.MAP_HEURISTIC_LEVEL)[heuristicLevel],
                    status: (0, lodash_1.invert)(constant_2.MAP_QUESTION_STATUS)[status],
                    level,
                    topic,
                    tags: tagNames.split(','),
                    language: lang || constant_2.LANG.VIET,
                    mode: (0, lodash_1.invert)(constant_2.MAP_MODE)[mode],
                    createdBy: user.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            });
            return this.questionRepository.createMultiple(questionsToInsert);
        }
        catch (error) {
            throw new server_error_exception_1.ServerErrorException(error.message);
        }
    }
};
QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionRepository,
        validator_service_1.ValidatorService,
        file_service_1.FileService])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map