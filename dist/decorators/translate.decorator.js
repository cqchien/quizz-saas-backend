"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translate = exports.TRANSLATION_DECORATOR_KEY = void 0;
exports.TRANSLATION_DECORATOR_KEY = 'custom:translate';
function Translate(data) {
    return (target, key) => {
        Reflect.defineMetadata(exports.TRANSLATION_DECORATOR_KEY, data, target, key);
    };
}
exports.Translate = Translate;
//# sourceMappingURL=translate.decorator.js.map