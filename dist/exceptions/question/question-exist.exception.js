"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionExistException = void 0;
const common_1 = require("@nestjs/common");
class QuestionExistException extends common_1.ConflictException {
    constructor(message) {
        super(message, 'error.question.exist');
    }
}
exports.QuestionExistException = QuestionExistException;
//# sourceMappingURL=question-exist.exception.js.map