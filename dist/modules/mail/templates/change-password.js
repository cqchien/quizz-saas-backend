"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.informChangePassword = void 0;
exports.informChangePassword = {
    body: `
    <p>Hi {{name}},</p>
    <p>You have just been created an account by your teacher on Knowled's system - an online exam system.</p>
    <p>You need to click <a href="{{magicLink}}}">here</a> to change your password immediately.</p>
    <p>Regards</p>
    <p>Knowled</p>
  `,
    title: 'Knowled - Change Password',
};
//# sourceMappingURL=change-password.js.map