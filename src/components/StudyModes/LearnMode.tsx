import React, { useState, useEffect } from 'react';
import { Settings, Volume2 } from 'lucide-react';
import type { Word } from '../../types/vocabulary';
import { getRandomOptionsForWord } from '../../data/vocabulary';
import MultipleChoice from './MultipleChoice';
import WriteMode from './WriteMode';
import SettingsModal from '../SettingsModal';
import config from '../../config';

interface LearnModeProps {
  word: Word;
  onComplete: () => void;
  direction: 'dutch-to-german' | 'german-to-dutch';
}

const LearnMode: React.FC<LearnModeProps> = ({ word, onComplete, direction }) => {
  const [step, setStep] = useState<'learn' | 'practice' | 'write'>('learn');
  const [options, setOptions] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Generate options for multiple choice
    setOptions(getRandomOptionsForWord(word, 4, direction));
  }, [word, direction]);

  // Timer functionality
  useEffect(() => {
    if (config.learning.timer_enabled) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, []);

  const handlePracticeAnswer = (correct: boolean) => {
    // Move to write step after practice
    setTimeout(() => {
      setStep('write');
    }, 1500);
  };

  const handleWriteAnswer = (correct: boolean) => {
    // Complete this word's learning cycle
    setTimeout(() => {
      onComplete();
      setStep('learn');
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  const questionWord = direction === 'dutch-to-german' ? word.dutch : word.german;
  const answerWord = direction === 'dutch-to-german' ? word.german : word.dutch;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        {config.learning.timer_enabled && (
          <div className="text-sm text-sky-200">
            Tijd: {formatTime(elapsedTime)}
          </div>
        )}
        <button 
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          title="Instellingen"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {step === 'learn' && (
        <div className="p-6 backdrop-blur-lg bg-white/5 rounded-2xl text-center">
          <h3 className="text-2xl font-semibold mb-6">Leer dit woord:</h3>
          
          <div className="space-y-4">
            <div className="text-4xl font-['DM_Serif_Display'] text-sky-100 flex items-center justify-center gap-2">
              {questionWord} = {answerWord}
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
            
            {config.learning.show_example_sentence && word.examples.length > 0 && (
              <div className="text-sm text-sky-200 bg-white/5 p-4 rounded-xl">
                <p className="mb-1">{direction === 'dutch-to-german' ? word.examples[0].german : word.examples[0].dutch}</p>
                <p className="text-white/70">{direction === 'dutch-to-german' ? word.examples[0].dutch : word.examples[0].german}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setStep('practice')}
            className="mt-8 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all duration-300"
          >
            Ik snap het
          </button>
        </div>
      )}

      {step === 'practice' && (
        <MultipleChoice
          word={word}
          options={options}
          direction={direction}
          onAnswer={handlePracticeAnswer}
        />
      )}

      {step === 'write' && (
        <WriteMode
          word={word}
          direction={direction}
          onAnswer={handleWriteAnswer}
        />
      )}

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default LearnMode;
