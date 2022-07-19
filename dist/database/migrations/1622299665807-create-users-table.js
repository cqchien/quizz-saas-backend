"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1622299665807 = void 0;
class CreateUsersTable1622299665807 {
    constructor() {
        this.name = 'createUsersTable1622299665807';
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TYPE \"users_role_enum\" AS ENUM('USER', 'ADMIN')");
        await queryRunner.query(`
      CREATE TABLE "users"
      (
        "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "first_name" character varying,
        "last_name"  character varying,
        "role"       "users_role_enum" NOT NULL DEFAULT 'USER',
        "email"      character varying,
        "password"   character varying,
        "phone"      character varying,
        "avatar"     character varying,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "users"');
        await queryRunner.query('DROP TYPE "users_role_enum"');
    }
}
exports.CreateUsersTable1622299665807 = CreateUsersTable1622299665807;
//# sourceMappingURL=1622299665807-create-users-table.js.map