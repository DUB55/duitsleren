import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex justify-center mb-8">
        <AlertTriangle className="w-16 h-16 text-yellow-400" />
      </div>
      
      <h1 className="text-6xl font-['DM_Serif_Display'] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-8">Pagina niet gevonden</h2>
      
      <p className="text-sky-100 mb-8 max-w-md mx-auto">
        De pagina die je zoekt bestaat niet of is verplaatst.
      </p>
      
      <Link to="/" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-lg transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Terug naar Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
