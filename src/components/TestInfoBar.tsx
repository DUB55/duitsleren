import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import config from '../config';

const TestInfoBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!config.app.display_test_info) {
    return null;
  }
  
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-sky-300" />
          <h3 className="font-medium">Wat je voor de toets moet leren</h3>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sky-300 hover:text-white transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 text-sky-100 text-sm">
          <p className="mb-4">{config.app.test_info_text.substring(0, 150)}...</p>
          <Link 
            to="/test-info"
            className="text-sky-300 hover:text-white transition-colors flex items-center gap-1"
          >
            Meer informatie
            <ChevronDown className="w-4 h-4 rotate-270" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default TestInfoBar;
