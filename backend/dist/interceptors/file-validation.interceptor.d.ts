import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class FileValidationInterceptor implements NestInterceptor {
    private readonly MAX_FILE_SIZE;
    private readonly ALLOWED_MIME_TYPES;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
