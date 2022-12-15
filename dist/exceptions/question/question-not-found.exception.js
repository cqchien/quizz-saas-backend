"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class QuestionNotFoundException extends common_1.NotFoundException {
    constructor(message) {
        super(message, 'error.question.not_found');
    }
}
exports.QuestionNotFoundException = QuestionNotFoundException;
//# sourceMappingURL=question-not-found.exception.js.map