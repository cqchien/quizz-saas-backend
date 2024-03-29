"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const compression_1 = __importDefault(require("compression"));
const express_1 = require("express");
const express_ctx_1 = require("express-ctx");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const app_module_1 = require("./app.module");
const bad_request_filter_1 = require("./filters/bad-request.filter");
const query_failed_filter_1 = require("./filters/query-failed.filter");
const setup_swagger_1 = require("./setup-swagger");
const api_config_service_1 = require("./shared/services/api-config.service");
const shared_module_1 = require("./shared/shared.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter());
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: false }));
    app.enableCors({
        origin: [
            'http://localhost:8000',
            'http://localhost:8002',
            'http://localhost:3000',
            'https://knowled.netlify.app',
        ],
        credentials: true,
    });
    app.enable('trust proxy');
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use((0, morgan_1.default)('combined'));
    app.enableVersioning();
    const reflector = app.get(core_1.Reflector);
    app.useGlobalFilters(new bad_request_filter_1.HttpExceptionFilter(reflector), new query_failed_filter_1.QueryFailedFilter(reflector));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(reflector));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        dismissDefaultMessages: true,
        exceptionFactory: (errors) => new common_1.UnprocessableEntityException(errors),
    }));
    const configService = app.select(shared_module_1.SharedModule).get(api_config_service_1.ApiConfigService);
    if (configService.documentationEnabled) {
        (0, setup_swagger_1.setupSwagger)(app);
    }
    app.use(express_ctx_1.middleware);
    if (!configService.isDevelopment) {
        app.enableShutdownHooks();
    }
    const port = configService.appConfig.port;
    await app.listen(port);
    console.info(`server running on ${await app.getUrl()}`);
    return app;
}
exports.bootstrap = bootstrap;
void bootstrap();
//# sourceMappingURL=main.js.map