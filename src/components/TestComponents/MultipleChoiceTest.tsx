import React, { useState, useEffect } from 'react';
import { Check, X, Volume2, SkipForward } from 'lucide-react';
import { Word } from '../../types/vocabulary';
import { getRandomWords, getRandomOptionsForWord } from '../../data/vocabulary';
import BookmarkButton from '../BookmarkButton';
import config from '../../config';

interface MultipleChoiceTestProps {
  wordCount: number;
  direction: 'dutch-to-german' | 'german-to-dutch';
  onComplete: (score: number, total: number) => void;
  testType: string;
}

const MultipleChoiceTest: React.FC<MultipleChoiceTestProps> = ({ 
  wordCount, 
  direction, 
  onComplete,
  testType
}) => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(wordCount * 20); // 20 seconds per word
  const [isPaused, setIsPaused] = useState(false);
  const [skipped, setSkipped] = useState(false);

  // Initialize test
  useEffect(() => {
    // Get words based on randomization setting
    const newWords = getRandomWords(wordCount, direction);
    setWords(config.learning.randomize_word_order ? 
      [...newWords].sort(() => Math.random() - 0.5) : 
      newWords
    );
  }, [wordCount, direction]);

  // Set options when current word changes
  useEffect(() => {
    if (words.length > 0 && currentIndex < words.length) {
      setOptions(getRandomOptionsForWord(words[currentIndex], 4, direction));
      setSelectedAnswer(null);
      setIsCorrect(null);
      setSkipped(false);
    }
  }, [words, currentIndex, direction]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 || currentIndex >= words.length) {
      // Time's up or test completed
      onComplete(score, words.length);
      return;
    }

    if (!isPaused) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isPaused, currentIndex, words.length, score, onComplete]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(answer);
    setIsPaused(true);
    
    const currentWord = words[currentIndex];
    const correctAnswer = direction === 'dutch-to-german' ? currentWord.german : currentWord.dutch;
    const correct = answer === correctAnswer;
    
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsPaused(false);
      
      // If this was the last question, complete the test
      if (currentIndex === words.length - 1) {
        onComplete(correct ? score + 1 : score, words.length);
      }
    }, 1500);
  };

  const handleSkip = () => {
    if (selectedAnswer !== null) return;
    
    setIsPaused(true);
    setSkipped(true);
    
    // Move to next question after delay
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsPaused(false);
      
      // If this was the last question, complete the test
      if (currentIndex === words.length - 1) {
        onComplete(score, words.length);
      }
    }, 500);
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playPronunciation = () => {
    if (!words[currentIndex]) return;
    
    // This would be connected to a real text-to-speech API in production
    console.log(`Playing pronunciation for: ${direction === 'dutch-to-german' ? words[currentIndex].german : words[currentIndex].dutch}`);
    // Example implementation with browser's speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        direction === 'dutch-to-german' ? words[currentIndex].german : words[currentIndex].dutch
      );
      utterance.lang = direction === 'dutch-to-german' ? 'de-DE' : 'nl-NL';
      window.speechSynthesis.speak(utterance);
    }
  };

  // If no words loaded yet
  if (words.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  // If test is complete
  if (currentIndex >= words.length) {
    const percentage = Math.round((score / words.length) * 100);
    const dutchGrade = percentage === 100 ? 10 : 
                       percentage >= 90 ? 9 : 
                       percentage >= 80 ? 8 : 
                       percentage >= 70 ? 7 : 
                       percentage >= 60 ? 6 : 
                       percentage >= 50 ? 5 : 
                       percentage >= 40 ? 4 : 
                       percentage >= 30 ? 3 : 
                       percentage >= 20 ? 2 : 1;
    
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Test voltooid!</h3>
        <p className="text-sky-100 mb-2">Je score: {score}/{words.length} ({percentage}%)</p>
        <p className="text-sky-100 mb-4">Cijfer: {dutchGrade}</p>
        <p className="text-sky-200">
          {percentage >= 90 ? 'Uitstekend! Je kent alle woorden!' : 
           percentage >= 70 ? 'Goed gedaan! Je kent de meeste woorden.' : 
           percentage >= 50 ? 'Niet slecht! Blijf oefenen.' : 
           'Je kunt nog verbeteren. Blijf oefenen!'}
        </p>
      </div>
    );
  }

  const currentWord = words[currentIndex];
  const questionWord = direction === 'dutch-to-german' ? currentWord.dutch : currentWord.german;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-sm text-sky-200">Vraag {currentIndex + 1} van {words.length}</span>
          <div className="w-full bg-white/10 rounded-full h-2 mt-1">
            <div 
              className="bg-sky-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-sm ${timeLeft < 30 ? 'text-red-400' : 'text-sky-200'}`}>
            Tijd: {formatTime(timeLeft)}
          </div>
          <BookmarkButton id={currentWord.id} type="word" />
        </div>
      </div>

      <div className="p-6 backdrop-blur-lg bg-white/5 rounded-2xl mb-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">Vertaal het woord:</h3>
          <div className="flex items-center justify-center gap-2">
            <p className="text-3xl font-['DM_Serif_Display'] text-sky-100">{questionWord}</p>
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

        <div className="grid grid-cols-1 gap-3 mt-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`
                p-4 rounded-xl text-lg font-medium transition-all duration-300
                ${selectedAnswer !== null
                  ? option === (direction === 'dutch-to-german' ? currentWord.german : currentWord.dutch)
                    ? 'bg-green-500/20 text-green-200 border-green-500'
                    : option === selectedAnswer
                      ? 'bg-red-500/20 text-red-200 border-red-500'
                      : 'bg-white/5 text-white/50'
                  : 'bg-white/10 hover:bg-white/20 text-white'}
                border-2
                ${option === selectedAnswer ? 'border-current' : 'border-transparent'}
              `}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedAnswer !== null && (
                  option === (direction === 'dutch-to-german' ? currentWord.german : currentWord.dutch) ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : option === selectedAnswer ? (
                    <X className="w-5 h-5 text-red-400" />
                  ) : null
                )}
              </div>
            </button>
          ))}
        </div>

        {config.learning.skip_question_enabled && selectedAnswer === null && (
          <button
            onClick={handleSkip}
            className="mt-4 w-full p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
            Vraag overslaan
          </button>
        )}
      </div>

      {selectedAnswer !== null && (
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg">
          <p className={`text-lg font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct!' : 'Fout.'}
          </p>
          <p className="text-sky-100 mt-2">
            {direction === 'dutch-to-german' ? currentWord.dutch : currentWord.german} = {direction === 'dutch-to-german' ? currentWord.german : currentWord.dutch}
          </p>
        </div>
      )}

      {skipped && (
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg">
          <p className="text-lg font-medium text-sky-400">Vraag overgeslagen.</p>
          <p className="text-sky-100 mt-2">
            {direction === 'dutch-to-german' ? currentWord.dutch : currentWord.german} = {direction === 'dutch-to-german' ? currentWord.german : currentWord.dutch}
          </p>
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceTest;
