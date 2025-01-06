import { Repository } from 'typeorm';
import { Transcription } from '../entities/transcription.entity';
export declare class TranscriptionService {
    private transcriptionRepository;
    constructor(transcriptionRepository: Repository<Transcription>);
    create(file: Express.Multer.File, title: string): Promise<Transcription>;
    findAll(): Promise<Transcription[]>;
    findOne(id: number): Promise<Transcription>;
    update(id: number, data: Partial<Transcription>): Promise<Transcription>;
    remove(id: number): Promise<void>;
}
