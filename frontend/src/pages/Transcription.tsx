import React from 'react';
import { TranscriptionForm } from '../components/TranscriptionForm';
import { useNavigate } from 'react-router-dom';

const Transcription: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Rediriger vers la bibliothèque après un upload réussi
    navigate('/library');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nouvelle Transcription</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TranscriptionForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Transcription; 