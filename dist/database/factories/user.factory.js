"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const constants_1 = require("../../constants");
const user_schema_1 = require("../../modules/user/domain/user.schema");
(0, typeorm_seeding_1.define)(user_schema_1.User, (faker) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);
    const phone = faker.phone.phoneNumber();
    const user = new user_schema_1.User();
    user.name = firstName;
    user.email = email;
    user.role = constants_1.RoleType.USER;
    user.password = '111111';
    user.phone = phone;
    return user;
});
//# sourceMappingURL=user.factory.js.map