import React, { useState, useEffect } from 'react';
import { ArrowLeft, Book, List, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getRandomWords, getRandomOptionsForWord } from '../data/vocabulary';
import LearnMode from '../components/StudyModes/LearnMode';
import MultipleChoice from '../components/StudyModes/MultipleChoice';
import WriteMode from '../components/StudyModes/WriteMode';
import BookmarkButton from '../components/BookmarkButton';
import SettingsModal from '../components/SettingsModal';
import WordListSidebar from '../components/WordListSidebar';
import config from '../config';

const VocabularyPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'select' | 'direction' | 'learn' | 'multiple-choice' | 'write'>('select');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [direction, setDirection] = useState<'dutch-to-german' | 'german-to-dutch'>('dutch-to-german');
  const [words, setWords] = useState(getRandomWords(10, 'dutch-to-german'));
  const [score, setScore] = useState(0);
  const [selectedMode, setSelectedMode] = useState<'learn' | 'multiple-choice' | 'write' | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showWordListSidebar, setShowWordListSidebar] = useState(false);
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Check for saved session on component mount
  useEffect(() => {
    if (config.learning.remember_progress) {
      const savedSession = localStorage.getItem('dub5_learning_session');
      if (savedSession) {
        try {
          const session = JSON.parse(savedSession);
          // Ask user if they want to continue
          const continueSession = window.confirm(
            'Je hebt een eerdere leersessie. Wil je doorgaan waar je gebleven was?'
          );
          
          if (continueSession) {
            setMode(session.mode);
            setDirection(session.direction);
            setCurrentWordIndex(session.currentWordIndex);
            setWords(session.words);
            setScore(session.score);
            setSelectedMode(session.selectedMode);
            setSessionInProgress(true);
            setElapsedTime(session.elapsedTime || 0);
          } else {
            // Clear saved session
            localStorage.removeItem('dub5_learning_session');
          }
        } catch (error) {
          console.error('Error parsing saved session:', error);
          localStorage.removeItem('dub5_learning_session');
        }
      }
    }
  }, []);

  // Save session when component unmounts or when relevant state changes
  useEffect(() => {
    if (config.learning.remember_progress && sessionInProgress) {
      const session = {
        mode,
        direction,
        currentWordIndex,
        words,
        score,
        selectedMode,
        elapsedTime
      };
      localStorage.setItem('dub5_learning_session', JSON.stringify(session));
    }
  }, [mode, direction, currentWordIndex, words, score, selectedMode, sessionInProgress, elapsedTime]);

  // Timer functionality
  useEffect(() => {
    if (config.learning.timer_enabled && sessionInProgress) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [sessionInProgress]);

  const handleModeSelect = (selectedMode: 'learn' | 'multiple-choice' | 'write') => {
    setSelectedMode(selectedMode);
    setMode('direction');
  };

  const handleDirectionSelect = () => {
    if (selectedMode) {
      setMode(selectedMode);
      setCurrentWordIndex(0);
      setScore(0);
      setSessionInProgress(true);
      setElapsedTime(0);
      
      // Get new words based on selected direction and randomization setting
      const newWords = getRandomWords(10, direction);
      setWords(config.learning.randomize_word_order ? 
        [...newWords].sort(() => Math.random() - 0.5) : 
        newWords
      );
    }
  };

  const handleDirectionChange = (newDirection: 'dutch-to-german' | 'german-to-dutch') => {
    setDirection(newDirection);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    // Move to next word after a short delay
    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
      } else {
        // End of session
        setMode('select');
        setSessionInProgress(false);
        localStorage.removeItem('dub5_learning_session');
      }
    }, 1500);
  };

  const handleComplete = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // End of session
      setMode('select');
      setSessionInProgress(false);
      localStorage.removeItem('dub5_learning_session');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-sky-300 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Terug naar Home
        </Link>
        
        <div className="flex items-center gap-4">
          {config.learning.timer_enabled && sessionInProgress && (
            <div className="text-sm text-sky-200">
              Tijd: {formatTime(elapsedTime)}
            </div>
          )}
          
          {sessionInProgress && (
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              title="Instellingen"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
          
          <button
            onClick={() => setShowWordListSidebar(!showWordListSidebar)}
            className="text-sky-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <List className="w-5 h-5" />
            Woordenlijst Bekijken
          </button>
        </div>
      </div>
      
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Book className="w-8 h-8 text-sky-300" />
          <h1 className="text-4xl font-['DM_Serif_Display']">Woordenschat Training</h1>
        </div>
        
        {mode === 'select' || mode === 'direction' ? (
          <p className="text-sky-100 mb-8">Kies een leermethode om Duitse woorden te oefenen</p>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <p className="text-sky-100">
                Woord {currentWordIndex + 1} van {words.length}
              </p>
              {words[currentWordIndex] && (
                <BookmarkButton id={words[currentWordIndex].id} type="word" />
              )}
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-4">
              <div 
                className="bg-sky-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
              ></div>
            </div>
            {mode !== 'learn' && (
              <p className="text-sky-200">Score: {score}/{currentWordIndex + 1}</p>
            )}
          </div>
        )}
      </header>

      <div className="flex">
        <div className={`${showWordListSidebar && config.learning.show_word_list_sidebar ? 'w-2/3 pr-4' : 'w-full'}`}>
          {mode === 'select' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => handleModeSelect('learn')}
                className="p-6 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">Leermodus</h3>
                <p className="text-sm text-sky-100">Stap voor stap nieuwe woorden leren</p>
              </button>
              
              <button
                onClick={() => handleModeSelect('multiple-choice')}
                className="p-6 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">Meerkeuze</h3>
                <p className="text-sm text-sky-100">Test je kennis met meerkeuzevragen</p>
              </button>
              
              <button
                onClick={() => handleModeSelect('write')}
                className="p-6 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">Schrijfmodus</h3>
                <p className="text-sm text-sky-100">Oefen met het schrijven van woorden</p>
              </button>
            </div>
          )}

          {mode === 'direction' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Selecteer richting</h3>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <button
                  onClick={() => handleDirectionChange('dutch-to-german')}
                  className={`p-4 rounded-xl ${direction === 'dutch-to-german' ? 'bg-sky-500/30 text-white' : 'bg-white/10 text-sky-100 hover:bg-white/20'} flex-1 transition-colors`}
                >
                  Nederlands → Duits
                </button>
                <button
                  onClick={() => handleDirectionChange('german-to-dutch')}
                  className={`p-4 rounded-xl ${direction === 'german-to-dutch' ? 'bg-sky-500/30 text-white' : 'bg-white/10 text-sky-100 hover:bg-white/20'} flex-1 transition-colors`}
                >
                  Duits → Nederlands
                </button>
              </div>
              
              <button
                onClick={handleDirectionSelect}
                className="w-full p-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all duration-300"
              >
                Start {selectedMode === 'learn' ? 'Leermodus' : selectedMode === 'multiple-choice' ? 'Meerkeuze' : 'Schrijfmodus'}
              </button>
            </div>
          )}

          {mode === 'learn' && words[currentWordIndex] && (
            <LearnMode 
              word={words[currentWordIndex]} 
              onComplete={handleComplete}
              direction={direction}
            />
          )}

          {mode === 'multiple-choice' && words[currentWordIndex] && (
            <MultipleChoice 
              word={words[currentWordIndex]}
              options={getRandomOptionsForWord(words[currentWordIndex], 4, direction)}
              direction={direction}
              onAnswer={handleAnswer}
            />
          )}

          {mode === 'write' && words[currentWordIndex] && (
            <WriteMode 
              word={words[currentWordIndex]}
              direction={direction}
              onAnswer={handleAnswer}
            />
          )}
        </div>

        {showWordListSidebar && config.learning.show_word_list_sidebar && (
          <div className="w-1/3 pl-4">
            <WordListSidebar direction={direction} />
          </div>
        )}
      </div>

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default VocabularyPage;
