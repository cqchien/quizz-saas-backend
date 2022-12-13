"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSaveFailedException = void 0;
const common_1 = require("@nestjs/common");
class QuestionSaveFailedException extends common_1.BadRequestException {
    constructor(message) {
        super(message, 'error.question.save_failed');
    }
}
exports.QuestionSaveFailedException = QuestionSaveFailedException;
//# sourceMappingURL=question-save-failed.exception.js.map