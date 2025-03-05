import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-sky-400 animate-spin" />
        <p className="text-white text-lg">Laden...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
