"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotExcelException = void 0;
const common_1 = require("@nestjs/common");
class FileNotExcelException extends common_1.BadRequestException {
    constructor(message) {
        super(message, 'error.file.not-exel');
    }
}
exports.FileNotExcelException = FileNotExcelException;
//# sourceMappingURL=file-not-exel.exception.js.map