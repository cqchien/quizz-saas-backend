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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const group_schema_1 = require("../domain/group.schema");
let GroupRepository = class GroupRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(groupEntity) {
        const user = await this.repository.create(groupEntity);
        return this.toEntity(user.toObject());
    }
    async update(groupEntity) {
        await this.repository.updateOne({ _id: groupEntity.id }, Object.assign(Object.assign({}, groupEntity), { _id: groupEntity.id }));
        return this.findOne(groupEntity.id || '');
    }
    async delete(groupId) {
        await this.repository.deleteOne({ _id: groupId });
    }
    async findAll(query) {
        const extractQuery = query.name
            ? {
                $or: [{ name: { $regex: '.*' + query.name + '.*' } }],
            }
            : {};
        const groupQuery = query.createdBy
            ? this.repository.find(Object.assign(Object.assign({}, extractQuery), { $and: [{ createdBy: query.createdBy }] }))
            : this.repository.find(Object.assign({}, extractQuery));
        const groups = await groupQuery.populate('members').lean().exec();
        return groups.map((group) => this.toEntity(group));
    }
    async findOne(groupId, userId = '') {
        const query = userId
            ? { createdBy: userId, _id: groupId }
            : { _id: groupId };
        const group = await this.repository
            .findOne(query)
            .populate('members')
            .lean()
            .exec();
        return this.toEntity(group);
    }
    toEntity(groupModel) {
        var _a, _b;
        return {
            id: groupModel._id.toString(),
            name: groupModel.name,
            description: groupModel.description,
            members: (groupModel.members || []).map((member) => member._id.toString()),
            memberEntities: (groupModel.members || []).map((member) => (Object.assign({ id: member._id.toString() }, member))),
            createdBy: (_a = groupModel.createdBy) === null || _a === void 0 ? void 0 : _a._id.toString(),
            createdByEntity: Object.assign({ id: (_b = groupModel.createdBy) === null || _b === void 0 ? void 0 : _b._id.toString() }, groupModel.createdBy),
            updatedAt: groupModel.updatedAt,
            createdAt: groupModel.createdAt,
        };
    }
};
GroupRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GroupRepository);
exports.GroupRepository = GroupRepository;
//# sourceMappingURL=group.repository.js.map