import { TranscriptionService } from './transcription.service';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';
export declare class TranscriptionController {
    private readonly transcriptionService;
    constructor(transcriptionService: TranscriptionService);
    uploadFile(file: Express.Multer.File, createTranscriptionDto: CreateTranscriptionDto): Promise<import("./transcription.entity").Transcription>;
    updateMainVideo(id: string, file: Express.Multer.File): Promise<import("./transcription.entity").Transcription>;
    addComparison(id: string, file: Express.Multer.File): Promise<import("./transcription.entity").Transcription>;
    removeComparison(id: string): Promise<import("./transcription.entity").Transcription>;
    findAll(): Promise<import("./transcription.entity").Transcription[]>;
    findOne(id: string): Promise<import("./transcription.entity").Transcription>;
    update(id: string, updateTranscriptionDto: UpdateTranscriptionDto): Promise<import("./transcription.entity").Transcription>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
