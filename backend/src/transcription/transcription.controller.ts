import { Controller, Post, Body, Get, Param, Put, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscriptionService } from './transcription.service';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';

@Controller('transcriptions')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }), // 100MB
          new FileTypeValidator({ fileType: '.(mov|mp4|webm|quicktime)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createTranscriptionDto: CreateTranscriptionDto,
  ) {
    return this.transcriptionService.create(file, createTranscriptionDto);
  }

  @Put(':id/main-video')
  @UseInterceptors(FileInterceptor('file'))
  async updateMainVideo(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }), // 100MB
          new FileTypeValidator({ fileType: '.(mov|mp4|webm|quicktime)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.transcriptionService.updateMainVideo(+id, file);
  }

  @Post(':id/comparison')
  @UseInterceptors(FileInterceptor('file'))
  async addComparison(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }), // 100MB
          new FileTypeValidator({ fileType: '.(mov|mp4|webm|quicktime)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.transcriptionService.addComparison(+id, file);
  }

  @Delete(':id/comparison')
  removeComparison(@Param('id') id: string) {
    return this.transcriptionService.removeComparison(+id);
  }

  @Get()
  findAll() {
    return this.transcriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transcriptionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTranscriptionDto: UpdateTranscriptionDto) {
    return this.transcriptionService.update(+id, updateTranscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transcriptionService.remove(+id);
  }
} 