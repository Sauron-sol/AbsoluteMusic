import { TranscriptionService } from '../services/transcription.service';
import { Transcription } from '../entities/transcription.entity';
import { CreateTranscriptionDto } from '../dto/create-transcription.dto';
export declare class TranscriptionController {
    private readonly transcriptionService;
    constructor(transcriptionService: TranscriptionService);
    uploadFile(file: Express.Multer.File, createTranscriptionDto: CreateTranscriptionDto): Promise<Transcription>;
    findAll(): Promise<Transcription[]>;
    findOne(id: number): Promise<Transcription>;
    update(id: number, data: Partial<Transcription>): Promise<Transcription>;
    remove(id: number): Promise<void>;
}
