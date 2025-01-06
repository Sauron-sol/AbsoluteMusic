import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
  private readonly MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
  private readonly ALLOWED_MIME_TYPES = [
    'audio/mpeg',
    'audio/wav',
    'audio/mp4',
    'video/mp4',
    'video/quicktime',
  ];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file = request.file;

    if (!file) {
      throw new BadRequestException('Aucun fichier n\'a été uploadé');
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException('Le fichier est trop volumineux (max 100MB)');
    }

    if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Type de fichier non supporté');
    }

    return next.handle();
  }
} 