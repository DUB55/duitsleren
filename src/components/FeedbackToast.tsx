import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

const FeedbackToast: React.FC = () => {
  const { feedback } = useApp();

  if (!feedback.visible) return null;

  const getIcon = () => {
    switch (feedback.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-sky-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (feedback.type) {
      case 'success':
        return 'bg-green-500/20';
      case 'error':
        return 'bg-red-500/20';
      case 'info':
      default:
        return 'bg-sky-500/20';
    }
  };

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
      <div className={`rounded-lg backdrop-blur-md ${getBackgroundColor()} p-4 shadow-lg border border-white/10 flex items-center gap-3 min-w-[300px] max-w-md`}>
        {getIcon()}
        <p className="text-white text-sm">{feedback.message}</p>
      </div>
    </div>
  );
};

export default FeedbackToast;
