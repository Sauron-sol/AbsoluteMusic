import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { transcriptionApi } from '../services/api.service';
import { CreateTranscriptionDto, Transcription } from '../types/api.types';

export const useTranscriptions = () => {
  const queryClient = useQueryClient();

  // Récupérer toutes les transcriptions
  const { data: transcriptions, isLoading, error } = useQuery({
    queryKey: ['transcriptions'],
    queryFn: transcriptionApi.getAll,
  });

  // Créer une nouvelle transcription
  const createMutation = useMutation({
    mutationFn: ({ file, data }: { file: File; data: CreateTranscriptionDto }) =>
      transcriptionApi.create(file, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcriptions'] });
    },
  });

  // Mettre à jour une transcription
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Transcription> }) =>
      transcriptionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcriptions'] });
    },
  });

  // Supprimer une transcription
  const deleteMutation = useMutation({
    mutationFn: transcriptionApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcriptions'] });
    },
  });

  return {
    transcriptions,
    isLoading,
    error,
    createTranscription: createMutation.mutate,
    updateTranscription: updateMutation.mutate,
    deleteTranscription: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}; 