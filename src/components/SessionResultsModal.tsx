import React from 'react';
import { CheckCircle, XCircle, SkipForward } from 'lucide-react';
import { Word } from '../types/vocabulary';

interface SessionResultsModalProps {
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
  onExit: () => void;
  words?: Word[];
  userAnswers?: Record<string, string>;
  correctWordIds?: string[];
  wrongWordIds?: string[];
  skippedWordIds?: string[];
}

const SessionResultsModal: React.FC<SessionResultsModalProps> = ({
  correctAnswers,
  wrongAnswers,
  skippedAnswers,
  totalQuestions,
  onRestart,
  onExit,
  words,
  userAnswers,
  correctWordIds,
  wrongWordIds,
  skippedWordIds
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Calculate Dutch grade (1-10 scale)
  const calculateDutchGrade = (percentage: number) => {
    if (percentage === 100) return 10;
    if (percentage >= 90) return 9;
    if (percentage >= 80) return 8;
    if (percentage >= 70) return 7;
    if (percentage >= 60) return 6;
    if (percentage >= 50) return 5;
    if (percentage >= 40) return 4;
    if (percentage >= 30) return 3;
    if (percentage >= 20) return 2;
    return 1;
  };
  
  const dutchGrade = calculateDutchGrade(percentage);
  
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Resultaten van je leersessie</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-4xl font-bold mb-2">{percentage}%</div>
          <div className="text-xl font-medium mb-1">Cijfer: {dutchGrade}</div>
          <div className="text-sm text-sky-200">
            {correctAnswers} van de {totalQuestions} vragen correct
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Correct
            </span>
            <span className="text-green-400 font-medium">{correctAnswers}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              Fout
            </span>
            <span className="text-red-400 font-medium">{wrongAnswers}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <SkipForward className="w-5 h-5 text-sky-400" />
              Overgeslagen
            </span>
            <span className="text-sky-400 font-medium">{skippedAnswers}</span>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="mb-2">Voortgang:</div>
          <div className="w-full bg-white/10 rounded-full h-4 mb-2">
            <div 
              className={`h-4 rounded-full transition-all duration-1000 ${
                percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-sky-200 mt-2">
            {percentage >= 90 ? (
              <p>Uitstekend! Je beheerst dit onderwerp zeer goed.</p>
            ) : percentage >= 70 ? (
              <p>Goed gedaan! Je hebt een goede kennis van dit onderwerp.</p>
            ) : percentage >= 50 ? (
              <p>Niet slecht. Met wat meer oefening kun je je score verbeteren.</p>
            ) : (
              <p>Je kunt nog verbeteren. Blijf oefenen met dit onderwerp.</p>
            )}
          </div>
        </div>
      </div>
      
      {words && words.length > 0 && userAnswers && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Details per vraag</h3>
          <div className="bg-white/5 rounded-lg p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-2">Woord</th>
                  <th className="text-left p-2">Correcte vertaling</th>
                  <th className="text-left p-2">Jouw antwoord</th>
                  <th className="text-center p-2">Resultaat</th>
                </tr>
              </thead>
              <tbody>
                {words.map((word, index) => {
                  const wordId = word.id;
                  const isCorrect = correctWordIds?.includes(wordId);
                  const isWrong = wrongWordIds?.includes(wordId);
                  const isSkipped = skippedWordIds?.includes(wordId);
                  
                  return (
                    <tr key={index} className="border-b border-white/10">
                      <td className="p-2">{word.dutch}</td>
                      <td className="p-2">{word.german}</td>
                      <td className="p-2">{userAnswers[wordId] || '-'}</td>
                      <td className="p-2 text-center">
                        {isCorrect && <CheckCircle className="w-5 h-5 text-green-400 inline" />}
                        {isWrong && <XCircle className="w-5 h-5 text-red-400 inline" />}
                        {isSkipped && <SkipForward className="w-5 h-5 text-sky-400 inline" />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="flex gap-4 justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition-colors"
        >
          Opnieuw proberen
        </button>
        <button
          onClick={onExit}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          Terug naar woordenlijst
        </button>
      </div>
    </div>
  );
};

export default SessionResultsModal;
