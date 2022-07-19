"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("../../modules/user/domain/user.schema");
class CreateUsers {
    async run(factory) {
        await factory(user_schema_1.User)({ roles: [] }).createMany(1);
    }
}
exports.default = CreateUsers;
//# sourceMappingURL=users.seed.js.map