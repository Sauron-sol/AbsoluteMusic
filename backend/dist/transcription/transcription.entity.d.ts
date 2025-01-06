export declare class Transcription {
    id: number;
    title: string;
    description: string;
    fileName: string;
    filePath: string;
    comparisonFileName: string;
    comparisonFilePath: string;
    type: 'single' | 'comparison';
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}
