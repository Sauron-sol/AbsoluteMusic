import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileUpload } from '../components/FileUpload';
import { transcriptionApi } from '../services/transcription.service';

export const Library = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: transcriptions = [], isLoading } = useQuery({
    queryKey: ['transcriptions'],
    queryFn: transcriptionApi.getAll,
    initialData: [],
  });

  const uploadMutation = useMutation({
    mutationFn: transcriptionApi.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcriptions'] });
      setSelectedFile(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: transcriptionApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcriptions'] });
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate({
        file: selectedFile,
        title: selectedFile.name,
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette transcription ?')) {
      deleteMutation.mutate(id);
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Bibliothèque
            </h1>
            <div className="flex items-center space-x-4">
              <FileUpload
                onFileSelect={handleFileSelect}
                accept=".mov,.mp4,.webm"
                buttonText="Sélectionner une vidéo"
              />
              {selectedFile && (
                <motion.button
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpload}
                  disabled={uploadMutation.isPending}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    uploadMutation.isPending
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {uploadMutation.isPending ? 'Envoi en cours...' : 'Envoyer'}
                </motion.button>
              )}
            </div>
          </div>

          {transcriptions.length === 0 ? (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-50 rounded-xl p-12 text-center"
            >
              <p className="text-gray-600 text-lg">Aucune vidéo disponible</p>
              <p className="text-gray-500 mt-2">Commencez par ajouter une vidéo à votre bibliothèque</p>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl overflow-hidden">
              {/* En-tête du tableau */}
              <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-600">Titre</div>
                <div className="text-sm font-medium text-gray-600">Date</div>
                <div className="text-sm font-medium text-gray-600">Type</div>
                <div className="text-sm font-medium text-gray-600">Statut</div>
                <div className="text-sm font-medium text-gray-600">Actions</div>
              </div>

              {/* Corps du tableau */}
              {transcriptions.map((transcription, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={transcription.id}
                  className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="font-medium text-gray-900 truncate">
                    {transcription.title}
                  </div>
                  <div className="text-gray-600">
                    {new Date(transcription.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      transcription.type === 'comparison'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {transcription.type === 'comparison' ? 'Comparaison' : 'Simple'}
                    </span>
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Prêt
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/transcription/${transcription.id}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Ouvrir
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(transcription.id)}
                      className="text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                      Supprimer
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}; 