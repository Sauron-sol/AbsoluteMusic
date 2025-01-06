import { useRef, useEffect } from 'react';

interface ScoreViewerProps {
  notes: string[];
}

export const ScoreViewer = ({ notes }: ScoreViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Logique d'affichage des notes ici
    containerRef.current.innerHTML = notes.join(' ');
  }, [notes]);

  return (
    <div 
      ref={containerRef}
      className="bg-white p-4 rounded-lg shadow-md min-h-[200px]"
    />
  );
}; 