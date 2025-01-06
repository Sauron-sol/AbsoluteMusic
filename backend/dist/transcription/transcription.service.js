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
const transcription_entity_1 = require("./transcription.entity");
const fs = require("fs");
const path = require("path");
const UPLOAD_DIR = 'uploads';
let TranscriptionService = class TranscriptionService {
    constructor(transcriptionRepository) {
        this.transcriptionRepository = transcriptionRepository;
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR);
        }
    }
    async create(file, createTranscriptionDto) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(UPLOAD_DIR, fileName);
        try {
            fs.writeFileSync(filePath, file.buffer);
            const transcription = this.transcriptionRepository.create({
                ...createTranscriptionDto,
                fileName,
                filePath,
                type: 'single'
            });
            return this.transcriptionRepository.save(transcription);
        }
        catch (error) {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            throw new common_1.BadRequestException('Erreur lors de la création de la transcription');
        }
    }
    async updateMainVideo(id, file) {
        const transcription = await this.findOne(id);
        const oldFilePath = transcription.filePath;
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(UPLOAD_DIR, fileName);
        try {
            fs.writeFileSync(filePath, file.buffer);
            transcription.fileName = fileName;
            transcription.filePath = filePath;
            const updatedTranscription = await this.transcriptionRepository.save(transcription);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
            return updatedTranscription;
        }
        catch (error) {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de la vidéo principale');
        }
    }
    async addComparison(id, file) {
        const transcription = await this.findOne(id);
        const fileName = `${Date.now()}-comparison-${file.originalname}`;
        const filePath = path.join(UPLOAD_DIR, fileName);
        try {
            if (transcription.comparisonFilePath && fs.existsSync(transcription.comparisonFilePath)) {
                fs.unlinkSync(transcription.comparisonFilePath);
            }
            fs.writeFileSync(filePath, file.buffer);
            transcription.comparisonFileName = fileName;
            transcription.comparisonFilePath = filePath;
            transcription.type = 'comparison';
            return this.transcriptionRepository.save(transcription);
        }
        catch (error) {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            throw new common_1.BadRequestException('Erreur lors de l\'ajout de la vidéo de comparaison');
        }
    }
    async removeComparison(id) {
        const transcription = await this.findOne(id);
        if (transcription.comparisonFilePath && fs.existsSync(transcription.comparisonFilePath)) {
            fs.unlinkSync(transcription.comparisonFilePath);
        }
        transcription.comparisonFileName = null;
        transcription.comparisonFilePath = null;
        transcription.type = 'single';
        return this.transcriptionRepository.save(transcription);
    }
    findAll() {
        return this.transcriptionRepository.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findOne(id) {
        const transcription = await this.transcriptionRepository.findOne({
            where: { id },
        });
        if (!transcription) {
            throw new common_1.NotFoundException(`Transcription #${id} not found`);
        }
        return transcription;
    }
    async update(id, updateTranscriptionDto) {
        const transcription = await this.findOne(id);
        Object.assign(transcription, updateTranscriptionDto);
        return this.transcriptionRepository.save(transcription);
    }
    async remove(id) {
        const transcription = await this.findOne(id);
        try {
            if (fs.existsSync(transcription.filePath)) {
                fs.unlinkSync(transcription.filePath);
            }
            if (transcription.comparisonFilePath && fs.existsSync(transcription.comparisonFilePath)) {
                fs.unlinkSync(transcription.comparisonFilePath);
            }
            await this.transcriptionRepository.remove(transcription);
            await this.transcriptionRepository.query('DELETE FROM sqlite_sequence WHERE name = "transcription"');
            return { success: true };
        }
        catch (error) {
            console.error('Erreur lors de la suppression:', error);
            throw new common_1.BadRequestException('Erreur lors de la suppression de la transcription');
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