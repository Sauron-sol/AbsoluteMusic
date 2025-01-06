import React, { useState } from 'react';
import { useTranscriptions } from '../hooks/useTranscriptions';

interface TranscriptionFormProps {
  onSuccess?: () => void;
}

export const TranscriptionForm: React.FC<TranscriptionFormProps> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const { createTranscription, isCreating } = useTranscriptions();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        // Utilise le nom du fichier comme titre par défaut
        setTitle(selectedFile.name.split('.')[0]);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!file) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    if (!title.trim()) {
      setError('Veuillez entrer un titre');
      return;
    }

    try {
      await createTranscription(
        { 
          file, 
          data: { 
            title: title.trim(), 
            description: description.trim() || undefined 
          } 
        },
        {
          onSuccess: () => {
            setFile(null);
            setTitle('');
            setDescription('');
            onSuccess?.();
          },
          onError: (error: any) => {
            setError(error.response?.data?.message || 'Une erreur est survenue');
          }
        }
      );
    } catch (err) {
      setError('Une erreur est survenue lors de l\'upload');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Zone de drop de fichier */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <input
          type="file"
          accept="audio/*,video/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
            </p>
            <p className="text-xs text-gray-500">Audio ou vidéo (max. 100MB)</p>
          </div>
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Fichier sélectionné : {file.name}
            </p>
          )}
        </label>
      </div>

      {/* Champs du formulaire */}
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Titre de la transcription"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description (optionnelle)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Description de la transcription"
          />
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      {/* Bouton de soumission */}
      <button
        type="submit"
        disabled={isCreating}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isCreating ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isCreating ? 'Upload en cours...' : 'Démarrer la transcription'}
      </button>
    </form>
  );
}; 