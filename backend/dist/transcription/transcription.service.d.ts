import { Repository } from 'typeorm';
import { Transcription } from './transcription.entity';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';
export declare class TranscriptionService {
    private transcriptionRepository;
    constructor(transcriptionRepository: Repository<Transcription>);
    create(file: Express.Multer.File, createTranscriptionDto: CreateTranscriptionDto): Promise<Transcription>;
    updateMainVideo(id: number, file: Express.Multer.File): Promise<Transcription>;
    addComparison(id: number, file: Express.Multer.File): Promise<Transcription>;
    removeComparison(id: number): Promise<Transcription>;
    findAll(): Promise<Transcription[]>;
    findOne(id: number): Promise<Transcription>;
    update(id: number, updateTranscriptionDto: UpdateTranscriptionDto): Promise<Transcription>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
