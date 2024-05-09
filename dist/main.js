"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
require("dotenv/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.enableCors({
        origin: [process.env.FRONT_END_HOST],
        credentials: true,
        exposedHeaders: 'set-cookie',
    });
    await app.listen(4242);
}
bootstrap();
//# sourceMappingURL=main.js.map