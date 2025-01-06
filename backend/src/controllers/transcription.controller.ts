import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscriptionService } from '../services/transcription.service';
import { Transcription } from '../entities/transcription.entity';
import { Express } from 'express';
import { CreateTranscriptionDto } from '../dto/create-transcription.dto';
import { FileValidationInterceptor } from '../interceptors/file-validation.interceptor';

@Controller('transcriptions')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'), FileValidationInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTranscriptionDto: CreateTranscriptionDto,
  ): Promise<Transcription> {
    return this.transcriptionService.create(file, createTranscriptionDto.title);
  }

  @Get()
  findAll(): Promise<Transcription[]> {
    return this.transcriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Transcription> {
    return this.transcriptionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Transcription>,
  ): Promise<Transcription> {
    return this.transcriptionService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.transcriptionService.remove(id);
  }
} 