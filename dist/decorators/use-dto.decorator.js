"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseDto = void 0;
function UseDto(dtoClass) {
    return (ctor) => {
        ctor.prototype.dtoClass = dtoClass;
    };
}
exports.UseDto = UseDto;
//# sourceMappingURL=use-dto.decorator.js.map