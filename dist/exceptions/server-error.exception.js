"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerErrorException = void 0;
const common_1 = require("@nestjs/common");
class ServerErrorException extends common_1.InternalServerErrorException {
    constructor() {
        super('Server error!!', 'error.server.interval_server_error');
    }
}
exports.ServerErrorException = ServerErrorException;
//# sourceMappingURL=server-error.exception.js.map