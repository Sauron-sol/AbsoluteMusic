import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transcriptionApi } from '../services/transcription.service';
import { FileUpload } from '../components/FileUpload';
import { motion } from 'framer-motion';

export const TranscriptionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: transcription, isLoading } = useQuery({
    queryKey: ['transcription', id],
    queryFn: () => transcriptionApi.getById(Number(id)),
    enabled: !!id,
  });

  const updateMainVideoMutation = useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) => 
      transcriptionApi.updateMainVideo(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcription', id] });
    },
  });

  const addComparisonMutation = useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) => 
      transcriptionApi.addComparison(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcription', id] });
    },
  });

  const removeComparisonMutation = useMutation({
    mutationFn: transcriptionApi.removeComparison,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcription', id] });
    },
  });

  const handleMainVideoSelect = (file: File) => {
    if (id) {
      updateMainVideoMutation.mutate({ 
        id: Number(id), 
        file 
      });
    }
  };

  const handleComparisonFileSelect = (file: File) => {
    if (id) {
      addComparisonMutation.mutate({ 
        id: Number(id), 
        file 
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!transcription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            Transcription non trouvée
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* En-tête */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <motion.h1 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                {transcription.title}
              </motion.h1>
              <p className="text-gray-600 mt-2">
                {new Date(transcription.createdAt).toLocaleDateString()}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/library')}
              className="px-4 py-2 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
            >
              Retour à la bibliothèque
            </motion.button>
          </div>

          {/* Zone des vidéos */}
          <div className="grid grid-cols-2 gap-8">
            {/* Vidéo principale */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Vidéo principale</h2>
                <FileUpload
                  onFileSelect={handleMainVideoSelect}
                  accept=".mov,.mp4,.webm"
                  buttonText="Changer la vidéo"
                />
              </div>
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                <video
                  className="absolute inset-0 w-full h-full"
                  controls
                  controlsList="nodownload"
                  src={`/api/uploads/${transcription.fileName}`}
                />
              </div>
            </motion.div>

            {/* Zone de comparaison */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Vidéo de comparaison</h2>
                {transcription.comparisonFileName ? (
                  <div className="flex space-x-2">
                    <FileUpload
                      onFileSelect={handleComparisonFileSelect}
                      accept=".mov,.mp4,.webm"
                      buttonText="Changer la vidéo"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeComparisonMutation.mutate(transcription.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors"
                      title="Supprimer la vidéo de comparaison"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                ) : (
                  <FileUpload
                    onFileSelect={handleComparisonFileSelect}
                    accept=".mov,.mp4,.webm"
                    buttonText="Ajouter une vidéo"
                  />
                )}
              </div>
              {transcription.comparisonFileName ? (
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                  <video
                    className="absolute inset-0 w-full h-full"
                    controls
                    controlsList="nodownload"
                    src={`/api/uploads/${transcription.comparisonFileName}`}
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500 text-sm">
                    Formats acceptés : MP4, MOV, WebM
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 