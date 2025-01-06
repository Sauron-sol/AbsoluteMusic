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
exports.TranscriptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transcription_entity_1 = require("../entities/transcription.entity");
const path_1 = require("path");
const fs = require("fs/promises");
let TranscriptionService = class TranscriptionService {
    constructor(transcriptionRepository) {
        this.transcriptionRepository = transcriptionRepository;
    }
    async create(file, title) {
        const uploadDir = (0, path_1.join)(__dirname, '..', '..', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = (0, path_1.join)(uploadDir, fileName);
        await fs.writeFile(filePath, file.buffer);
        const transcription = this.transcriptionRepository.create({
            title,
            fileName,
            filePath,
            status: 'in_progress',
        });
        return this.transcriptionRepository.save(transcription);
    }
    findAll() {
        return this.transcriptionRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    findOne(id) {
        return this.transcriptionRepository.findOneBy({ id });
    }
    async update(id, data) {
        await this.transcriptionRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        const transcription = await this.findOne(id);
        if (transcription) {
            try {
                await fs.unlink(transcription.filePath);
            }
            catch (error) {
                console.error('Erreur lors de la suppression du fichier:', error);
            }
            await this.transcriptionRepository.remove(transcription);
        }
    }
};
exports.TranscriptionService = TranscriptionService;
exports.TranscriptionService = TranscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transcription_entity_1.Transcription)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TranscriptionService);
//# sourceMappingURL=transcription.service.js.map