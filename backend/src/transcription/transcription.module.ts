import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranscriptionController } from './transcription.controller';
import { TranscriptionService } from './transcription.service';
import { Transcription } from './transcription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transcription])],
  controllers: [TranscriptionController],
  providers: [TranscriptionService],
})
export class TranscriptionModule {} 