"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guards/auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const auth_user_interceptor_service_1 = require("../interceptors/auth-user-interceptor.service");
const public_route_decorator_1 = require("./public-route.decorator");
function Auth(roles = [], options) {
    const isPublicRoute = options === null || options === void 0 ? void 0 : options.public;
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('roles', roles), (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)({ public: isPublicRoute }), roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseInterceptors)(auth_user_interceptor_service_1.AuthUserInterceptor), (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }), (0, public_route_decorator_1.PublicRoute)(isPublicRoute));
}
exports.Auth = Auth;
//# sourceMappingURL=http.decorators.js.map