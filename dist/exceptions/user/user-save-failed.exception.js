"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSaveFailedException = void 0;
const common_1 = require("@nestjs/common");
class UserSaveFailedException extends common_1.BadRequestException {
    constructor(message) {
        super(message, 'error.user.save_failed');
    }
}
exports.UserSaveFailedException = UserSaveFailedException;
//# sourceMappingURL=user-save-failed.exception.js.map