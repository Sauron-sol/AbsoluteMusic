export interface Transcription {
  id: number;
  title: string;
  description?: string;
  fileName: string;
  filePath: string;
  status: 'in_progress' | 'completed';
  transcriptionData?: string;
  duration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTranscriptionDto {
  title: string;
  description?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
} 