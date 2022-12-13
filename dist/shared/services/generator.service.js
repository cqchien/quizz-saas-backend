"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = __importDefault(require("crypto"));
const uuid_1 = require("uuid");
let GeneratorService = class GeneratorService {
    uuid() {
        return (0, uuid_1.v1)();
    }
    fileName(ext) {
        return this.uuid() + '.' + ext;
    }
    generatePassword(length) {
        const wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';
        return [...crypto_1.default.randomFillSync(new Uint32Array(length))]
            .map((x) => wishlist[x % wishlist.length])
            .join('');
    }
};
GeneratorService = __decorate([
    (0, common_1.Injectable)()
], GeneratorService);
exports.GeneratorService = GeneratorService;
//# sourceMappingURL=generator.service.js.map