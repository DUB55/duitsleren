import React, { useState } from 'react';
import { Volume2, SkipForward } from 'lucide-react';
import type { Word } from '../../types/vocabulary';
import config from '../../config';

interface WriteModeProps {
  word: Word;
  direction: 'dutch-to-german' | 'german-to-dutch';
  onAnswer: (correct: boolean) => void;
}

const WriteMode: React.FC<WriteModeProps> = ({ word, direction, onAnswer }) => {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const question = direction === 'dutch-to-german' ? word.dutch : word.german;
  const correctAnswer = direction === 'dutch-to-german' ? word.german : word.dutch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;

    let isCorrect = false;
    
    if (config.learning.check_accents && config.learning.check_capitalization && config.learning.check_punctuation) {
      // Check everything exactly
      isCorrect = answer === correctAnswer;
    } else {
      // Start with a basic comparison
      let userAnswer = answer.toLowerCase().trim();
      let expectedAnswer = correctAnswer.toLowerCase().trim();
      
      // If not checking accents, normalize both strings
      if (!config.learning.check_accents) {
        userAnswer = userAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        expectedAnswer = expectedAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }
      
      // If not checking punctuation, remove punctuation
      if (!config.learning.check_punctuation) {
        userAnswer = userAnswer.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        expectedAnswer = expectedAnswer.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      }
      
      isCorrect = userAnswer === expectedAnswer;
    }
    
    setSubmitted(true);
    onAnswer(isCorrect);
  };

  const handleSkip = () => {
    if (submitted) return;
    
    setSubmitted(true);
    setSkipped(true);
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
        <h3 className="text-2xl font-semibold mb-2">Schrijf de vertaling:</h3>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Type je antwoord..."
            className="w-full p-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-sky-400 focus:outline-none transition-all duration-300"
            autoFocus
          />
        </div>

        {!submitted && (
          <button
            type="submit"
            className="w-full p-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all duration-300"
          >
            Controleer
          </button>
        )}
      </form>

      {config.learning.skip_question_enabled && !submitted && (
        <button
          onClick={handleSkip}
          className="mt-4 w-full p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
          Vraag overslaan
        </button>
      )}

      {submitted && (
        <div className="mt-6 text-center">
          {skipped ? (
            <p className="text-lg font-medium text-sky-400">Vraag overgeslagen.</p>
          ) : (
            <p className={`text-lg font-medium ${answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim() ? 'text-green-400' : 'text-red-400'}`}>
              {answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
                ? 'Correct!'
                : 'Fout.'}
            </p>
          )}
          <p className="text-sky-100 mt-2">
            {question} = {correctAnswer}
          </p>
        </div>
      )}
    </div>
  );
};

export default WriteMode;
