import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  buttonText?: string;
  onSelectStart?: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '*',
  buttonText = 'Sélectionner un fichier',
  onSelectStart,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    onSelectStart?.();
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('Selected file:', file); // Debug log
    if (file) {
      console.log('File type:', file.type); // Debug log
      onFileSelect(file);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        style={{ display: 'none' }}
      />
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </>
  );
}; 