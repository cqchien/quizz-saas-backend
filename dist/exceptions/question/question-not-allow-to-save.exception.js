"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionNotAllowToSave = void 0;
const common_1 = require("@nestjs/common");
class QuestionNotAllowToSave extends common_1.NotFoundException {
    constructor(message) {
        super(message, 'error.question.not_allow_to_save');
    }
}
exports.QuestionNotAllowToSave = QuestionNotAllowToSave;
//# sourceMappingURL=question-not-allow-to-save.exception.js.map