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
exports.Unique = exports.UniqueValidator = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
let UniqueValidator = class UniqueValidator {
    constructor(connection) {
        this.connection = connection;
    }
    async validate(value, args) {
        const [entityClass, findCondition = args.property] = args.constraints;
        return ((await this.connection.getRepository(entityClass).count({
            where: typeof findCondition === 'function'
                ? findCondition(args)
                : {
                    [findCondition || args.property]: value,
                },
        })) <= 0);
    }
    defaultMessage(args) {
        const [entityClass] = args.constraints;
        const entity = entityClass.name || 'Entity';
        return `${entity} with the same ${args.property} already exists`;
    }
};
UniqueValidator = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: 'unique', async: true }),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], UniqueValidator);
exports.UniqueValidator = UniqueValidator;
function Unique(constraints, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints,
            validator: UniqueValidator,
        });
    };
}
exports.Unique = Unique;
//# sourceMappingURL=unique.validator.js.map