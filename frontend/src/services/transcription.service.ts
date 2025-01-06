import axios from 'axios';

const API_URL = '/api';

interface Transcription {
  id: number;
  title: string;
  fileName: string;
  comparisonFileName?: string;
  type: 'single' | 'comparison';
  createdAt: string;
}

interface UploadParams {
  file: File;
  title: string;
}

export const transcriptionApi = {
  getAll: async (): Promise<Transcription[]> => {
    const response = await axios.get(`${API_URL}/transcriptions`);
    return response.data || [];
  },

  getById: async (id: number): Promise<Transcription> => {
    const response = await axios.get(`${API_URL}/transcriptions/${id}`);
    return response.data;
  },

  upload: async ({ file, title }: UploadParams): Promise<Transcription> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    const response = await axios.post(`${API_URL}/transcriptions/upload`, formData);
    return response.data;
  },

  updateMainVideo: async (id: number, file: File): Promise<Transcription> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.put(`${API_URL}/transcriptions/${id}/main-video`, formData);
    return response.data;
  },

  addComparison: async (id: number, file: File): Promise<Transcription> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/transcriptions/${id}/comparison`, formData);
    return response.data;
  },

  removeComparison: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/transcriptions/${id}/comparison`);
  },

  remove: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/transcriptions/${id}`);
  },
}; 