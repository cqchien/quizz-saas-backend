"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamSaveFailedException = void 0;
const common_1 = require("@nestjs/common");
class ExamSaveFailedException extends common_1.BadRequestException {
    constructor(message) {
        super(message, 'error.exam.save_failed');
    }
}
exports.ExamSaveFailedException = ExamSaveFailedException;
//# sourceMappingURL=exam-save-failed.exception.js.map