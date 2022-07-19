"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBankModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const question_bank_service_1 = require("./app/question-bank.service");
const question_bank_schema_1 = require("./domain/question-bank.schema");
const question_bank_controller_1 = require("./interface/question-bank.controller");
let QuestionBankModule = class QuestionBankModule {
};
QuestionBankModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: question_bank_schema_1.QuestionBank.name, schema: question_bank_schema_1.questionBankSchema },
            ]),
        ],
        exports: [],
        controllers: [question_bank_controller_1.QuestionBankController],
        providers: [question_bank_service_1.QuestionBankService],
    })
], QuestionBankModule);
exports.QuestionBankModule = QuestionBankModule;
//# sourceMappingURL=question-bank.module.js.map