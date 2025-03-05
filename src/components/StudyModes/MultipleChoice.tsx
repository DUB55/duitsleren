import React, { useState } from 'react';
import { Check, X, Volume2, SkipForward } from 'lucide-react';
import type { Word } from '../../types/vocabulary';
import config from '../../config';

interface MultipleChoiceProps {
  word: Word;
  options: string[];
  direction: 'dutch-to-german' | 'german-to-dutch';
  onAnswer: (correct: boolean) => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ word, options, direction, onAnswer }) => {
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [skipped, setSkipped] = useState(false);

  const question = direction === 'dutch-to-german' ? word.dutch : word.german;
  const correctAnswer = direction === 'dutch-to-german' ? word.german : word.dutch;

  const handleAnswer = (answer: string) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    const isCorrect = answer === correctAnswer;
    onAnswer(isCorrect);
  };

  const handleSkip = () => {
    if (answered) return;
    
    setAnswered(true);
    setSkipped(true);
    setSelectedAnswer(null);
    onAnswer(false);
  };

  const playPronunciation = () => {
    // This would be connected to a real text-to-speech API in production
    console.log(`Playing pronunciation for: ${direction === 'dutch-to-german' ? word.german : word.dutch}`);
    // Example implementation with browser's speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        direction === 'dutch-to-german' ? word.german : word.dutch
      );
      utterance.lang = direction === 'dutch-to-german' ? 'de-DE' : 'nl-NL';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 backdrop-blur-lg bg-white/5 rounded-2xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold mb-2">Vertaal het woord:</h3>
        <div className="flex items-center justify-center gap-2">
          <p className="text-4xl font-['DM_Serif_Display'] text-sky-100">{question}</p>
          {config.learning.show_pronunciation_audio && (
            <button 
              onClick={playPronunciation}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              title="Uitspraak beluisteren"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={answered}
            className={`
              p-4 rounded-xl text-lg font-medium transition-all duration-300
              ${answered
                ? option === correctAnswer
                  ? 'bg-green-500/20 text-green-200 border-green-500'
                  : option === selectedAnswer
                    ? 'bg-red-500/20 text-red-200 border-red-500'
                    : 'bg-white/5 text-white/50'
                : 'bg-white/10 hover:bg-white/20 text-white'}
              border-2
              ${option === selectedAnswer ? 'border-current' : 'border-transparent'}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {config.learning.skip_question_enabled && !answered && (
        <button
          onClick={handleSkip}
          className="mt-4 w-full p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
          Vraag overslaan
        </button>
      )}

      {answered && (
        <div className="mt-6 text-center">
          {skipped ? (
            <p className="text-lg font-medium text-sky-400">Vraag overgeslagen.</p>
          ) : (
            <p className={`text-lg font-medium ${selectedAnswer === correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
              {selectedAnswer === correctAnswer ? 'Correct!' : 'Fout.'}
            </p>
          )}
          <p className="text-sky-100 mt-2">
            {direction === 'dutch-to-german' ? word.dutch : word.german} = {direction === 'dutch-to-german' ? word.german : word.dutch}
          </p>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
