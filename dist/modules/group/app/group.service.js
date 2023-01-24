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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const role_type_1 = require("../../../constants/role-type");
const file_not_exel_exception_1 = require("../../../exceptions/file/file-not-exel.exception");
const file_service_1 = require("../../../shared/services/file.service");
const generator_service_1 = require("../../../shared/services/generator.service");
const validator_service_1 = require("../../../shared/services/validator.service");
const auth_service_1 = require("../../auth/app/auth.service");
const mail_service_1 = require("../../mail/mail.service");
const user_service_1 = require("../../user/app/user.service");
const group_repository_1 = require("../infra/group.repository");
let GroupService = class GroupService {
    constructor(groupRepository, userService, generatorService, validatorService, fileService, mailService, authService) {
        this.groupRepository = groupRepository;
        this.userService = userService;
        this.generatorService = generatorService;
        this.validatorService = validatorService;
        this.fileService = fileService;
        this.mailService = mailService;
        this.authService = authService;
    }
    async createGroup(user, groupDto) {
        const memberEntities = await this.createMembersForGroup(groupDto.members);
        const groupEntity = Object.assign(Object.assign({}, groupDto), { members: memberEntities.map((entity) => entity.id || ''), createdBy: user.id, updatedAt: new Date(), createdAt: new Date() });
        return this.groupRepository.create(groupEntity);
    }
    findAll(user, queryOption) {
        const query = user.role !== role_type_1.RoleType.ADMIN
            ? Object.assign({ createdBy: user.id }, queryOption) : queryOption;
        return this.groupRepository.findAll(query);
    }
    async getMembers(groupId) {
        const group = await this.groupRepository.findOne(groupId);
        return group ? group.memberEntities : [];
    }
    async findOne(user, groupId) {
        if (user.role === role_type_1.RoleType.ADMIN) {
            return this.groupRepository.findOne(groupId);
        }
        const group = await this.groupRepository.findOne(groupId, user.id || '');
        if (!group) {
            throw new common_1.NotFoundException('Group does not exist or not allow to update');
        }
        return group;
    }
    async delete(user, groupId) {
        const group = await this.findOne(user, groupId);
        if (!group) {
            throw new common_1.NotFoundException('Group does not exist or not allow to update');
        }
        await this.groupRepository.delete(groupId);
    }
    async updateOne(user, groupId, groupDto) {
        const group = await this.findOne(user, groupId);
        if (!group) {
            throw new common_1.NotFoundException('Group does not exist or not allow to update');
        }
        const memberEntities = await this.createMembersForGroup(groupDto.members);
        const groupEntity = Object.assign(Object.assign(Object.assign({}, group), groupDto), { members: memberEntities.map((entity) => entity.id || '') });
        return this.groupRepository.update(groupEntity);
    }
    parseFile(file) {
        if (file && !this.validatorService.isExcel(file.mimetype)) {
            throw new file_not_exel_exception_1.FileNotExcelException('Only alow to upload exel file (.xlsx, .xls, .csv)');
        }
        const data = this.fileService.parseExcelFIle(file);
        return data.map((raw) => ({
            name: raw['name'],
            email: raw['email'],
        }));
    }
    async createMembersForGroup(members) {
        const userEntities = await this.userService.findAll();
        const userEmails = userEntities.reduce((map, userEntity) => {
            map[userEntity.email.toString()] = userEntity;
            return map;
        }, {});
        const memberEntities = await Promise.all((members || []).map(async (member) => {
            if (userEmails[member.email]) {
                return userEmails[member.email];
            }
            const password = this.generatorService.generatePassword(8);
            const userDto = {
                name: member.name,
                email: member.email,
                password,
            };
            const newUser = await this.userService.createUser(userDto);
            await this.handleSendEmailChangePass(newUser);
            return newUser;
        }));
        return memberEntities;
    }
    async handleSendEmailChangePass(user) {
        try {
            const token = await this.authService.createAccessToken({
                role: role_type_1.RoleType.USER,
                userId: user.id,
            });
            await this.mailService.sendEmailChangePassword(user, token.accessToken);
        }
        catch (error) {
            console.error(error);
        }
    }
};
GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [group_repository_1.GroupRepository,
        user_service_1.UserService,
        generator_service_1.GeneratorService,
        validator_service_1.ValidatorService,
        file_service_1.FileService,
        mail_service_1.MailService,
        auth_service_1.AuthService])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map