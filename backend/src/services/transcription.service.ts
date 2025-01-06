import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transcription } from '../entities/transcription.entity';
import { join } from 'path';
import * as fs from 'fs/promises';
import { Express } from 'express';

@Injectable()
export class TranscriptionService {
  constructor(
    @InjectRepository(Transcription)
    private transcriptionRepository: Repository<Transcription>,
  ) {}

  async create(file: Express.Multer.File, title: string): Promise<Transcription> {
    const uploadDir = join(__dirname, '..', '..', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = join(uploadDir, fileName);
    await fs.writeFile(filePath, file.buffer);

    const transcription = this.transcriptionRepository.create({
      title,
      fileName,
      filePath,
      status: 'in_progress',
    });

    return this.transcriptionRepository.save(transcription);
  }

  findAll(): Promise<Transcription[]> {
    return this.transcriptionRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number): Promise<Transcription> {
    return this.transcriptionRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<Transcription>): Promise<Transcription> {
    await this.transcriptionRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const transcription = await this.findOne(id);
    if (transcription) {
      try {
        await fs.unlink(transcription.filePath);
      } catch (error) {
        console.error('Erreur lors de la suppression du fichier:', error);
      }
      await this.transcriptionRepository.remove(transcription);
    }
  }
} 