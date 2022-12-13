"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ExamNotFoundException extends common_1.NotFoundException {
    constructor(message) {
        super(message, 'error.exam.not_found');
    }
}
exports.ExamNotFoundException = ExamNotFoundException;
//# sourceMappingURL=exam-not-found.exception.js.map