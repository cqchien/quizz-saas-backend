"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistException = void 0;
const common_1 = require("@nestjs/common");
class UserExistException extends common_1.ConflictException {
    constructor(message) {
        super(message, 'error.user.exist');
    }
}
exports.UserExistException = UserExistException;
//# sourceMappingURL=user-exist.exception.js.map