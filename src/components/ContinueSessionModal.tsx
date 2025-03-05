import React from 'react';
import { X } from 'lucide-react';

interface ContinueSessionModalProps {
  onContinue: () => void;
  onCancel: () => void;
}

const ContinueSessionModal: React.FC<ContinueSessionModalProps> = ({ onContinue, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 rounded-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-['DM_Serif_Display']">Vorige sessie gevonden</h2>
          <p className="text-sky-100 text-sm mt-2">Wil je doorgaan met je vorige leersessie?</p>
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={onContinue}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition-colors"
          >
            Ja, doorgaan
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Nee, opnieuw beginnen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueSessionModal;
