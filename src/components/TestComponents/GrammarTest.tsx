import React, { useState, useEffect } from 'react';
import { Check, X, SkipForward } from 'lucide-react';
import { grammarRules } from '../../data/grammar';
import config from '../../config';

interface GrammarTestProps {
  questionCount: number;
  onComplete: (score: number, total: number) => void;
  testType: string;
}

const GrammarTest: React.FC<GrammarTestProps> = ({ 
  questionCount, 
  onComplete,
  testType
}) => {
  // Collect all exercises from grammar rules
  const allExercises = grammarRules.flatMap(rule => 
    rule.exercises.map(exercise => ({
      ...exercise,
      ruleId: rule.id,
      ruleTitle: rule.title
    }))
  );
  
  const [exercises, setExercises] = useState<typeof allExercises>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [skipped, setSkipped] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questionCount * 45); // 45 seconds per question
  const [isPaused, setIsPaused] = useState(false);

  // Initialize test with random exercises
  useEffect(() => {
    // Shuffle and select random exercises
    const shuffled = [...allExercises].sort(() => 0.5 - Math.random());
    setExercises(config.learning.randomize_word_order ? 
      shuffled.slice(0, questionCount) : 
      allExercises.slice(0, questionCount)
    );
  }, [questionCount]);

  // Reset state when moving to a new exercise
  useEffect(() => {
    if (exercises.length > 0 && currentIndex < exercises.length) {
      setSelectedAnswer(null);
      setSkipped(false);
    }
  }, [currentIndex, exercises]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 || currentIndex >= exercises.length) {
      // Time's up or test completed
      onComplete(score, exercises.length);
      return;
    }

    if (!isPaused) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isPaused, currentIndex, exercises.length, score, onComplete]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null || exercises.length === 0) return; // Already answered
    
    setSelectedAnswer(answer);
    setIsPaused(true);
    
    const currentExercise = exercises[currentIndex];
    const correct = answer === currentExercise.correctAnswer;
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsPaused(false);
      
      // If this was the last question, complete the test
      if (currentIndex === exercises.length - 1) {
        onComplete(correct ? score + 1 : score, exercises.length);
      }
    }, 2000);
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
      if (currentIndex === exercises.length - 1) {
        onComplete(score, exercises.length);
      }
    }, 500);
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If no exercises loaded yet
  if (exercises.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  // If test is complete
  if (currentIndex >= exercises.length) {
    const percentage = Math.round((score / exercises.length) * 100);
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
        <p className="text-sky-100 mb-2">Je score: {score}/{exercises.length} ({percentage}%)</p>
        <p className="text-sky-100 mb-4">Cijfer: {dutchGrade}</p>
        <p className="text-sky-200">
          {percentage >= 90 ? 'Uitstekend! Je beheerst de grammatica uitstekend!' : 
           percentage >= 70 ? 'Goed gedaan! Je kent de meeste grammaticaregels.' : 
           percentage >= 50 ? 'Niet slecht! Blijf oefenen.' : 
           'Je kunt nog verbeteren. Blijf oefenen!'}
        </p>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-sm text-sky-200">Vraag {currentIndex + 1} van {exercises.length}</span>
          <div className="w-full bg-white/10 rounded-full h-2 mt-1">
            <div 
              className="bg-sky-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-sm ${timeLeft < 30 ? 'text-red-400' : 'text-sky-200'}`}>
            Tijd: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="p-6 backdrop-blur-lg bg-white/5 rounded-2xl mb-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">{currentExercise.ruleTitle}</h3>
          <p className="text-lg text-sky-100">{currentExercise.question}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-6">
          {currentExercise.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`
                p-4 rounded-xl text-lg font-medium transition-all duration-300
                ${selectedAnswer !== null
                  ? option === currentExercise.correctAnswer
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
                  option === currentExercise.correctAnswer ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : option === selectedAnswer ? (
                    <X className="w-5 h-5 text-red-400" />
                  ) : null
                )}
              </div>
            </button>
          ))}
        </div>

        {config.learning.skip_question_enabled && selectedAnswer === null && !skipped && (
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
          <p className={`text-lg font-medium ${selectedAnswer === currentExercise.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
            {selectedAnswer === currentExercise.correctAnswer ? 'Correct!' : 'Fout.'}
          </p>
          <p className="text-sky-100 mt-2">
            Het juiste antwoord is: {currentExercise.correctAnswer}
          </p>
          <p className="text-sm text-sky-200 mt-3 bg-white/5 p-3 rounded-lg">
            {currentExercise.explanation}
          </p>
        </div>
      )}

      {skipped && (
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg">
          <p className="text-lg font-medium text-sky-400">Vraag overgeslagen.</p>
          <p className="text-sky-100 mt-2">
            Het juiste antwoord is: {currentExercise.correctAnswer}
          </p>
          <p className="text-sm text-sky-200 mt-3 bg-white/5 p-3 rounded-lg">
            {currentExercise.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default GrammarTest;
