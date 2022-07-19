"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseLanguageInterceptor = exports.LanguageInterceptor = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const providers_1 = require("../providers");
let LanguageInterceptor = class LanguageInterceptor {
    intercept(context, next) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const language = (_a = request.headers['x-language']) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        if (constants_1.LanguageCode[language]) {
            providers_1.ContextProvider.setLanguage(language);
        }
        return next.handle();
    }
};
LanguageInterceptor = __decorate([
    (0, common_1.Injectable)()
], LanguageInterceptor);
exports.LanguageInterceptor = LanguageInterceptor;
function UseLanguageInterceptor() {
    return (0, common_1.UseInterceptors)(LanguageInterceptor);
}
exports.UseLanguageInterceptor = UseLanguageInterceptor;
//# sourceMappingURL=language-interceptor.service.js.map