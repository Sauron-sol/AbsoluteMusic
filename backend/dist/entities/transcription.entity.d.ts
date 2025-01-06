export declare class Transcription {
    id: number;
    title: string;
    description: string;
    fileName: string;
    filePath: string;
    status: 'in_progress' | 'completed';
    transcriptionData: string;
    duration: string;
    createdAt: Date;
    updatedAt: Date;
}
