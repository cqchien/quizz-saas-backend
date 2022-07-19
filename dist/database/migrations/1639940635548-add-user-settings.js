"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserSettings1639940635548 = void 0;
class AddUserSettings1639940635548 {
    constructor() {
        this.name = 'addUserSettings1639940635548';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "user_settings"
      (
        "id"                uuid      NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"        TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at"        TIMESTAMP NOT NULL DEFAULT now(),
        "is_email_verified" boolean   NOT NULL DEFAULT false,
        "is_phone_verified" boolean   NOT NULL DEFAULT false,
        "user_id"           uuid      NOT NULL,
        CONSTRAINT "REL_19f4e08665a1f4bbbb7d5631f3" UNIQUE ("user_id"),
        CONSTRAINT "PK_0fbe28c9f064a04d90aca6b3514" PRIMARY KEY ("id")
      )`);
        await queryRunner.query(`ALTER TABLE "user_settings"
      ADD CONSTRAINT "FK_19f4e08665a1f4bbbb7d5631f35" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_settings"
      DROP CONSTRAINT "FK_19f4e08665a1f4bbbb7d5631f35"`);
        await queryRunner.query('DROP TABLE "user_settings"');
    }
}
exports.AddUserSettings1639940635548 = AddUserSettings1639940635548;
//# sourceMappingURL=1639940635548-add-user-settings.js.map