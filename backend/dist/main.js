"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Accept', 'Range', 'Authorization'],
        exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const staticOptions = {
        setHeaders: (res) => {
            res.set({
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
                'Access-Control-Allow-Headers': 'Range, Accept-Ranges, Content-Range',
                'Access-Control-Expose-Headers': 'Content-Range, Accept-Ranges, Content-Length',
                'Access-Control-Allow-Credentials': 'true',
                'Cross-Origin-Resource-Policy': 'cross-origin',
                'Cross-Origin-Embedder-Policy': 'credentialless',
                'Cross-Origin-Opener-Policy': 'same-origin',
                'Accept-Ranges': 'bytes'
            });
        }
    };
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads'), staticOptions));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map