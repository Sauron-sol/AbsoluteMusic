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
exports.TranscriptionController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const transcription_service_1 = require("./transcription.service");
const create_transcription_dto_1 = require("./dto/create-transcription.dto");
const update_transcription_dto_1 = require("./dto/update-transcription.dto");
let TranscriptionController = class TranscriptionController {
    constructor(transcriptionService) {
        this.transcriptionService = transcriptionService;
    }
    async uploadFile(file, createTranscriptionDto) {
        return this.transcriptionService.create(file, createTranscriptionDto);
    }
    async updateMainVideo(id, file) {
        return this.transcriptionService.updateMainVideo(+id, file);
    }
    async addComparison(id, file) {
        return this.transcriptionService.addComparison(+id, file);
    }
    removeComparison(id) {
        return this.transcriptionService.removeComparison(+id);
    }
    findAll() {
        return this.transcriptionService.findAll();
    }
    findOne(id) {
        return this.transcriptionService.findOne(+id);
    }
    update(id, updateTranscriptionDto) {
        return this.transcriptionService.update(+id, updateTranscriptionDto);
    }
    remove(id) {
        return this.transcriptionService.remove(+id);
    }
};
exports.TranscriptionController = TranscriptionController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: '.(mov|mp4|webm|quicktime)' }),
        ],
    }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transcription_dto_1.CreateTranscriptionDto]),
    __metadata("design:returntype", Promise)
], TranscriptionController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Put)(':id/main-video'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: '.(mov|mp4|webm|quicktime)' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TranscriptionController.prototype, "updateMainVideo", null);
__decorate([
    (0, common_1.Post)(':id/comparison'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: '.(mov|mp4|webm|quicktime)' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TranscriptionController.prototype, "addComparison", null);
__decorate([
    (0, common_1.Delete)(':id/comparison'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TranscriptionController.prototype, "removeComparison", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TranscriptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TranscriptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_transcription_dto_1.UpdateTranscriptionDto]),
    __metadata("design:returntype", void 0)
], TranscriptionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TranscriptionController.prototype, "remove", null);
exports.TranscriptionController = TranscriptionController = __decorate([
    (0, common_1.Controller)('transcriptions'),
    __metadata("design:paramtypes", [transcription_service_1.TranscriptionService])
], TranscriptionController);
//# sourceMappingURL=transcription.controller.js.map