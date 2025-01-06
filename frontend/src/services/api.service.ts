import axios from 'axios';
import { Transcription, CreateTranscriptionDto } from '../types/api.types';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transcriptionApi = {
  // Récupérer toutes les transcriptions
  getAll: async (): Promise<Transcription[]> => {
    const response = await api.get<Transcription[]>('/transcriptions');
    return response.data;
  },

  // Récupérer une transcription par ID
  getById: async (id: number): Promise<Transcription> => {
    const response = await api.get<Transcription>(`/transcriptions/${id}`);
    return response.data;
  },

  // Créer une nouvelle transcription
  create: async (file: File, data: CreateTranscriptionDto): Promise<Transcription> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', data.title);
    if (data.description) {
      formData.append('description', data.description);
    }

    const response = await api.post<Transcription>('/transcriptions/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Mettre à jour une transcription
  update: async (id: number, data: Partial<Transcription>): Promise<Transcription> => {
    const response = await api.put<Transcription>(`/transcriptions/${id}`, data);
    return response.data;
  },

  // Supprimer une transcription
  delete: async (id: number): Promise<void> => {
    await api.delete(`/transcriptions/${id}`);
  },
}; 