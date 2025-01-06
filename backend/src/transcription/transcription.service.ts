import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transcription } from './transcription.entity';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';
import * as fs from 'fs';
import * as path from 'path';

const UPLOAD_DIR = 'uploads';

@Injectable()
export class TranscriptionService {
  constructor(
    @InjectRepository(Transcription)
    private transcriptionRepository: Repository<Transcription>,
  ) {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }
  }

  async create(file: Express.Multer.File, createTranscriptionDto: CreateTranscriptionDto) {
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
    } catch (error) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new BadRequestException('Erreur lors de la création de la transcription');
    }
  }

  async updateMainVideo(id: number, file: Express.Multer.File) {
    const transcription = await this.findOne(id);
    const oldFilePath = transcription.filePath;
    
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    try {
      // Sauvegarder le nouveau fichier
      fs.writeFileSync(filePath, file.buffer);

      // Mettre à jour l'entité
      transcription.fileName = fileName;
      transcription.filePath = filePath;

      // Sauvegarder les changements
      const updatedTranscription = await this.transcriptionRepository.save(transcription);

      // Supprimer l'ancien fichier
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      return updatedTranscription;
    } catch (error) {
      // Nettoyer le nouveau fichier en cas d'erreur
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new BadRequestException('Erreur lors de la mise à jour de la vidéo principale');
    }
  }

  async addComparison(id: number, file: Express.Multer.File) {
    const transcription = await this.findOne(id);
    const fileName = `${Date.now()}-comparison-${file.originalname}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    try {
      // Supprimer l'ancienne vidéo de comparaison si elle existe
      if (transcription.comparisonFilePath && fs.existsSync(transcription.comparisonFilePath)) {
        fs.unlinkSync(transcription.comparisonFilePath);
      }

      // Sauvegarder le nouveau fichier
      fs.writeFileSync(filePath, file.buffer);

      // Mettre à jour l'entité
      transcription.comparisonFileName = fileName;
      transcription.comparisonFilePath = filePath;
      transcription.type = 'comparison';

      return this.transcriptionRepository.save(transcription);
    } catch (error) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new BadRequestException('Erreur lors de l\'ajout de la vidéo de comparaison');
    }
  }

  async removeComparison(id: number) {
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

  async findOne(id: number) {
    const transcription = await this.transcriptionRepository.findOne({
      where: { id },
    });

    if (!transcription) {
      throw new NotFoundException(`Transcription #${id} not found`);
    }

    return transcription;
  }

  async update(id: number, updateTranscriptionDto: UpdateTranscriptionDto) {
    const transcription = await this.findOne(id);
    Object.assign(transcription, updateTranscriptionDto);
    return this.transcriptionRepository.save(transcription);
  }

  async remove(id: number) {
    const transcription = await this.findOne(id);
    
    try {
      // Supprimer les fichiers
      if (fs.existsSync(transcription.filePath)) {
        fs.unlinkSync(transcription.filePath);
      }
      if (transcription.comparisonFilePath && fs.existsSync(transcription.comparisonFilePath)) {
        fs.unlinkSync(transcription.comparisonFilePath);
      }

      // Supprimer l'entité
      await this.transcriptionRepository.remove(transcription);

      // Réinitialiser la séquence des IDs
      await this.transcriptionRepository.query('DELETE FROM sqlite_sequence WHERE name = "transcription"');

      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw new BadRequestException('Erreur lors de la suppression de la transcription');
    }
  }
} 