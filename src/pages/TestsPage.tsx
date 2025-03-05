import React, { useState } from 'react';
import { ArrowLeft, Trophy, FileText, Clock, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MultipleChoiceTest from '../components/TestComponents/MultipleChoiceTest';
import WriteTest from '../components/TestComponents/WriteTest';
import GrammarTest from '../components/TestComponents/GrammarTest';
import SettingsModal from '../components/SettingsModal';
import SessionResultsModal from '../components/SessionResultsModal';
import config from '../config';

const TestsPage: React.FC = () => {
  const { setIsLoading, showFeedback } = useApp();
  const [testInProgress, setTestInProgress] = useState(false);
  const [currentTest, setCurrentTest] = useState<{
    type: string;
    count: number;
    mode: 'multiple-choice' | 'write' | 'grammar';
    direction?: 'dutch-to-german' | 'german-to-dutch';
  } | null>(null);
  const [testResults, setTestResults] = useState<{
    score: number;
    total: number;
    type: string;
  } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const location = useLocation();

  const startTest = (
    type: string, 
    count: number, 
    mode: 'multiple-choice' | 'write' | 'grammar',
    direction: 'dutch-to-german' | 'german-to-dutch' = 'dutch-to-german'
  ) => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setCurrentTest({ type, count, mode, direction });
      setTestInProgress(true);
      setTestResults(null);
      setElapsedTime(0);
      setIsLoading(false);
    }, 800);
  };

  const handleTestComplete = (score: number, total: number) => {
    // Save test results
    setTestResults({
      score,
      total,
      type: currentTest?.type || ''
    });
    
    // End test
    setTestInProgress(false);
    
    // Show feedback
    const percentage = Math.round((score / total) * 100);
    const dutchGrade = percentage === 100 ? 10 : 
                       percentage >= 90 ? 9 : 
                       percentage >= 80 ? 8 : 
                       percentage >= 70 ? 7 : 
                       percentage >= 60 ? 6 : 
                       percentage >= 50 ? 5 : 
                       percentage >= 40 ? 4 : 
                       percentage >= 30 ? 3 : 
                       percentage >= 20 ? 2 : 1;
    
    let message = '';
    let type: 'success' | 'info' | 'error' = 'info';
    
    if (percentage >= 70) {
      message = `Goed gedaan! Je score: ${percentage}% (${dutchGrade})`;
      type = 'success';
    } else if (percentage >= 50) {
      message = `Niet slecht. Je score: ${percentage}% (${dutchGrade})`;
      type = 'info';
    } else {
      message = `Je kunt nog verbeteren. Je score: ${percentage}% (${dutchGrade})`;
      type = 'error';
    }
    
    showFeedback(message, type);
  };

  const renderTest = () => {
    if (!currentTest) return null;
    
    switch (currentTest.mode) {
      case 'multiple-choice':
        return (
          <MultipleChoiceTest
            wordCount={currentTest.count}
            direction={currentTest.direction || 'dutch-to-german'}
            onComplete={handleTestComplete}
            testType={currentTest.type}
          />
        );
      case 'write':
        return (
          <WriteTest
            wordCount={currentTest.count}
            direction={currentTest.direction || 'dutch-to-german'}
            onComplete={handleTestComplete}
            testType={currentTest.type}
          />
        );
      case 'grammar':
        return (
          <GrammarTest
            questionCount={currentTest.count}
            onComplete={handleTestComplete}
            testType={currentTest.type}
          />
        );
      default:
        return null;
    }
  };

  const renderTestResults = () => {
    if (!testResults) return null;
    
    const percentage = Math.round((testResults.score / testResults.total) * 100);
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
      <SessionResultsModal
        correctAnswers={testResults.score}
        wrongAnswers={testResults.total - testResults.score}
        skippedAnswers={0}
        totalQuestions={testResults.total}
        onRestart={() => startTest(testResults.type, testResults.total, currentTest?.mode || 'multiple-choice', currentTest?.direction)}
        onExit={() => {
          setCurrentTest(null);
          setTestResults(null);
        }}
      />
    );
  };

  // Get the previous page name from the config
  const getPreviousPageName = () => {
    // Default to Home
    let pageName = "Home";
    
    // Check if we came from a known page
    for (const key in config.features) {
      if (config.features[key as keyof typeof config.features].path === location.state?.from) {
        pageName = config.features[key as keyof typeof config.features].title;
        break;
      }
    }
    
    return pageName;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link 
          to={location.state?.from || "/"} 
          className="text-sky-300 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Terug naar {getPreviousPageName()}
        </Link>
        
        {testInProgress && config.learning.timer_enabled && (
          <div className="text-sm text-sky-200">
            Tijd: {Math.floor(elapsedTime / 60).toString().padStart(2, '0')}:{(elapsedTime % 60).toString().padStart(2, '0')}
          </div>
        )}
        
        {testInProgress && (
          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            title="Instellingen"
          >
            <Settings className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-sky-300" />
          <h1 className="text-4xl font-['DM_Serif_Display']">Oefentoetsen</h1>
        </div>
        <p className="text-sky-100 mb-8">Test je kennis van de Duitse taal</p>
      </header>

      {testInProgress ? (
        renderTest()
      ) : testResults ? (
        renderTestResults()
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-300" />
                Snelle Tests
              </h2>
              <p className="text-sky-100 mb-6">Korte toetsen</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => startTest('vocabulary', 15, 'multiple-choice', 'dutch-to-german')}
                  className="w-full p-4 text-left rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="font-medium">Nederlands naar Duits toets</div>
                  <div className="text-xs mt-1 text-sky-200">15 woorden • 5 minuten</div>
                </button>
                
                <button 
                  onClick={() => startTest('vocabulary', 15, 'multiple-choice', 'german-to-dutch')}
                  className="w-full p-4 text-left rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="font-medium">Duits naar Nederlands toets</div>
                  <div className="text-xs mt-1 text-sky-200">15 woorden • 5 minuten</div>
                </button>
                
                <button 
                  onClick={() => startTest('verb-conjugation', 10, 'write', 'dutch-to-german')}
                  className="w-full p-4 text-left rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="font-medium">Werkwoordvervoegingen toets</div>
                  <div className="text-xs mt-1 text-sky-200">10 vragen • 7 minuten</div>
                </button>
                
                <button 
                  onClick={() => startTest('past-participle', 10, 'write', 'dutch-to-german')}
                  className="w-full p-4 text-left rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="font-medium">Voltooid Deelwoord toets</div>
                  <div className="text-xs mt-1 text-sky-200">10 vragen • 7 minuten</div>
                </button>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-300" />
                Volledige Examens
              </h2>
              <p className="text-sky-100 mb-6">Langere toetsen</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => startTest('full-vocabulary', 30, 'multiple-choice', 'dutch-to-german')}
                  className="w-full p-4 text-left rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="font-medium">Woordenschat toets</div>
                  <div className="text-xs mt-1 text-sky-200">30 woorden • 20 minuten</div>
                </button>
                
                <button 
                  onClick={() => startTest('full-grammar', 20, 'grammar')}
                  className="w-full p-4 text-left rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="font-medium">Grammatica toets</div>
                  <div className="text-xs mt-1 text-sky-200">20 vragen • 15 minuten</div>
                </button>
                
                <button 
                  onClick={() => startTest('complete-german', 50, 'multiple-choice')}
                  className="w-full p-4 text-left rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="font-medium">Lange Duits toets</div>
                  <div className="text-xs mt-1 text-sky-200">50 vragen • 45 minuten</div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">je resultaten</h2>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Voltooide tests</span>
                <span>{testResults ? '1' : '0'}/8</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-sky-400 h-2 rounded-full" style={{ width: testResults ? '12.5%' : '0%' }}></div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Gemiddelde score</span>
                <span>{testResults ? Math.round((testResults.score / testResults.total) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full" 
                  style={{ width: testResults ? `${Math.round((testResults.score / testResults.total) * 100)}%` : '0%' }}
                ></div>
              </div>
            </div>
            
            {!testResults && (
              <p className="text-center text-sky-200 italic">
                maak je eerste toets om resultaten te zien!
              </p>
            )}
          </div>
        </>
      )}

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default TestsPage;
