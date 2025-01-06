import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transcription } from '../entities/transcription.entity';
import { TranscriptionService } from '../services/transcription.service';
import { TranscriptionController } from '../controllers/transcription.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transcription])],
  providers: [TranscriptionService],
  controllers: [TranscriptionController],
  exports: [TranscriptionService],
})
export class TranscriptionModule {} 