import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import config from '../config';

const TestInfoPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Link to="/" className="text-sky-300 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Terug naar Home
        </Link>
      </div>
      
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Info className="w-8 h-8 text-sky-300" />
          <h1 className="text-4xl font-['DM_Serif_Display']">Toetsinformatie</h1>
        </div>
        <p className="text-sky-100 mb-8">Wat je moet weten voor de toets</p>
      </header>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Wat je voor de toets moet leren</h2>
        
        <div className="space-y-4 text-sky-100">
          {config.app.test_info_text.split('. ').map((sentence, index) => (
            <p key={index}>{sentence}.</p>
          ))}
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Woordenschat</h3>
            <ul className="list-disc list-inside space-y-2 text-sky-100">
              <li>Leer alle woorden uit de woordenlijst</li>
              <li>Let op de juiste spelling en lidwoorden</li>
              <li>Oefen met de verschillende leermethoden</li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Grammatica</h3>
            <ul className="list-disc list-inside space-y-2 text-sky-100">
              <li>Werkwoordvervoegingen in de tegenwoordige tijd</li>
              <li>Het voltooid deelwoord</li>
              <li>De werkwoorden sein, haben en werden</li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Tips voor de toets</h3>
            <ul className="list-disc list-inside space-y-2 text-sky-100">
              <li>Maak de oefentoetsen meerdere keren</li>
              <li>Oefen dagelijks met de woordenlijst</li>
              <li>Gebruik de AI-tutor voor extra uitleg</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInfoPage;
