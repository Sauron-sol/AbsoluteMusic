"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidationInterceptor = void 0;
const common_1 = require("@nestjs/common");
let FileValidationInterceptor = class FileValidationInterceptor {
    constructor() {
        this.MAX_FILE_SIZE = 100 * 1024 * 1024;
        this.ALLOWED_MIME_TYPES = [
            'audio/mpeg',
            'audio/wav',
            'audio/mp4',
            'video/mp4',
            'video/quicktime',
        ];
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const file = request.file;
        if (!file) {
            throw new common_1.BadRequestException('Aucun fichier n\'a été uploadé');
        }
        if (file.size > this.MAX_FILE_SIZE) {
            throw new common_1.BadRequestException('Le fichier est trop volumineux (max 100MB)');
        }
        if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Type de fichier non supporté');
        }
        return next.handle();
    }
};
exports.FileValidationInterceptor = FileValidationInterceptor;
exports.FileValidationInterceptor = FileValidationInterceptor = __decorate([
    (0, common_1.Injectable)()
], FileValidationInterceptor);
//# sourceMappingURL=file-validation.interceptor.js.map