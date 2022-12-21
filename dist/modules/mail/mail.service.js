"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
require("moment-timezone");
const common_1 = require("@nestjs/common");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const moment_1 = __importDefault(require("moment"));
const date_time_1 = require("../../constants/date-time");
const api_config_service_1 = require("../../shared/services/api-config.service");
const change_password_1 = require("./templates/change-password");
const inform_take_exam_1 = require("./templates/inform-take-exam");
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
        mail_1.default.setApiKey(this.configService.getSendGridApiKey());
    }
    replacer(tpl, data) {
        return tpl.replace(/{{([^\s^{}]+)?}}/g, function ($1, $2) {
            return data[$2];
        });
    }
    async sendEmailChangePassword(user, token) {
        const magicLink = `${process.env.API_URL}/users/change-password?token=${token}`;
        const html = this.replacer(change_password_1.informChangePassword.body, {
            name: user.name,
            magicLink,
        });
        const subject = change_password_1.informChangePassword.title;
        const mail = {
            to: user.email,
            subject,
            from: 'chien.cq@geekup.vn',
            html,
        };
        const transport = await mail_1.default.send(mail);
        console.info(`Email successfully dispatched to ${mail.to}`);
        return transport;
    }
    async sendEmailInformUserTakeExam(user, exam, schedule) {
        var _a;
        const magicLink = `${process.env.API_URL}/user-exams/${exam.id}/take-exam`;
        const html = this.replacer(inform_take_exam_1.informTakeExam.body, {
            name: user.name,
            examName: exam.name,
            description: exam.description,
            numOfQuestion: ((_a = exam.questions) === null || _a === void 0 ? void 0 : _a.length) || 0,
            startTime: moment_1.default
                .tz(schedule.startTime, this.configService.getTimeZone())
                .format(date_time_1.FORMAT_FULL_TIME),
            endTime: moment_1.default
                .tz(schedule.endTime, this.configService.getTimeZone())
                .format(date_time_1.FORMAT_FULL_TIME),
            magicLink,
        });
        const subject = inform_take_exam_1.informTakeExam.title;
        const mail = {
            to: user.email,
            subject,
            from: 'chien.cq@geekup.vn',
            html,
        };
        const transport = await mail_1.default.send(mail);
        console.info(`Email successfully dispatched to ${mail.to}`);
        return transport;
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_config_service_1.ApiConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map