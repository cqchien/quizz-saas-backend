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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulePresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
const group_presenter_1 = require("../../../group/interface/presenter/group.presenter");
class SchedulePresenter {
    constructor(schedule) {
        this.code = schedule.code;
        this.time = schedule.time;
        this.endTime = schedule.endTime;
        this.startTime = schedule.startTime;
        this.status = schedule.status;
        this.assignedGroup = schedule.assignedGroupEntity
            ? new group_presenter_1.GroupPresenter(schedule.assignedGroupEntity)
            : undefined;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchedulePresenter.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SchedulePresenter.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SchedulePresenter.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SchedulePresenter.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchedulePresenter.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: group_presenter_1.GroupPresenter,
    }),
    __metadata("design:type", group_presenter_1.GroupPresenter)
], SchedulePresenter.prototype, "assignedGroup", void 0);
exports.SchedulePresenter = SchedulePresenter;
//# sourceMappingURL=schedule.presenter.js.map