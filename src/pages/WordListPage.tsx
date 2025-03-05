import React, { useState, useEffect } from 'react';
import { ArrowLeft, List } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { dutchToGermanWords, germanToDutchWords } from '../data/vocabulary';
import BookmarkButton from '../components/BookmarkButton';
import config from '../config';

const WordListPage: React.FC = () => {
  const [direction, setDirection] = useState<'dutch-to-german' | 'german-to-dutch'>('dutch-to-german');
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState(dutchToGermanWords);
  const [filteredWords, setFilteredWords] = useState(words);
  const location = useLocation();

  // Update words when direction changes
  useEffect(() => {
    setWords(direction === 'dutch-to-german' ? dutchToGermanWords : germanToDutchWords);
  }, [direction]);

  // Filter words when search term or words change
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredWords(words);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = words.filter(word => 
        word.dutch.toLowerCase().includes(term) || 
        word.german.toLowerCase().includes(term) ||
        word.category.toLowerCase().includes(term)
      );
      setFilteredWords(filtered);
    }
  }, [searchTerm, words]);

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

  // For Dutch to German, no category headers
  if (direction === 'dutch-to-german') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to={location.state?.from || "/"} 
            className="text-sky-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Terug naar {getPreviousPageName()}
          </Link>
          
          <Link to="/vocabulary" className="text-sky-300 hover:text-white transition-colors flex items-center gap-2">
            <List className="w-5 h-5" />
            Woordenschat Training
          </Link>
        </div>
        
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <List className="w-8 h-8 text-sky-300" />
            <h1 className="text-4xl font-['DM_Serif_Display']">Woordenlijst Overzicht</h1>
          </div>
          <p className="text-sky-100 mb-8">Bekijk alle woorden die je moet leren</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Selecteer wat je wilt leren:</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setDirection('dutch-to-german')}
                  className={`w-full text-left p-3 rounded-lg ${direction === 'dutch-to-german' ? 'bg-sky-500/30 text-white' : 'bg-white/10 text-sky-100 hover:bg-white/20'}`}
                >
                  Nederlands → Duits
                </button>
                
                <button
                  onClick={() => setDirection('german-to-dutch')}
                  className={`w-full text-left p-3 rounded-lg ${direction === 'german-to-dutch' ? 'bg-sky-500/30 text-white' : 'bg-white/10 text-sky-100 hover:bg-white/20'}`}
                >
                  Duits → Nederlands
                </button>
              </div>
              
              <div className="mt-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Zoek woorden..."
                  className="w-full p-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-sky-400 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Nederlands naar Duits ({filteredWords.length} woorden)
              </h3>
              
              {filteredWords.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left p-3">Nederlands</th>
                        <th className="text-left p-3">Duits</th>
                        <th className="text-center p-3">Opslaan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWords.map(word => (
                        <tr key={word.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-3">{word.dutch}</td>
                          <td className="p-3">{word.german}</td>
                          <td className="p-3 text-center">
                            <BookmarkButton id={word.id} type="word" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-sky-200">
                  Geen woorden gevonden. Probeer een andere zoekopdracht.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For German to Dutch, group words by category
  // Get unique categories for section headers
  const categories = [...new Set(filteredWords.map(word => word.category))].sort();

  // Group words by category
  const wordsByCategory = categories.reduce((acc, category) => {
    const categoryWords = filteredWords.filter(word => word.category === category);
    if (categoryWords.length > 0) {
      acc[category] = categoryWords;
    }
    return acc;
  }, {} as Record<string, typeof words>);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link 
          to={location.state?.from || "/"} 
          className="text-sky-300 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Terug naar {getPreviousPageName()}
        </Link>
        
        <Link to="/vocabulary" className="text-sky-300 hover:text-white transition-colors flex items-center gap-2">
          <List className="w-5 h-5" />
          Woordenschat Training
        </Link>
      </div>
      
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <List className="w-8 h-8 text-sky-300" />
          <h1 className="text-4xl font-['DM_Serif_Display']">Woordenlijst Overzicht</h1>
        </div>
        <p className="text-sky-100 mb-8">Bekijk alle woorden die je moet leren</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 sticky top-6">
            <h3 className="text-xl font-semibold mb-4">Selecteer wat je wilt leren:</h3>
            
            <div className="space-y-2">
              <button
                onClick={() => setDirection('dutch-to-german')}
                className={`w-full text-left p-3 rounded-lg ${direction === 'dutch-to-german' ? 'bg-sky-500/30 text-white' : 'bg-white/10 text-sky-100 hover:bg-white/20'}`}
              >
                Nederlands → Duits
              </button>
              
              <button
                onClick={() => setDirection('german-to-dutch')}
                className={`w-full text-left p-3 rounded-lg ${direction === 'german-to-dutch' ? 'bg-sky-500/30 text-white' : 'bg-white/10 text-sky-100 hover:bg-white/20'}`}
              >
                Duits → Nederlands
              </button>
            </div>
            
            <div className="mt-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Zoek woorden..."
                className="w-full p-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-sky-400 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">
              Duits naar Nederlands ({filteredWords.length} woorden)
            </h3>
            
            {Object.entries(wordsByCategory).length > 0 ? (
              <div className="space-y-8">
                {Object.entries(wordsByCategory).map(([category, words]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="text-lg font-medium text-sky-300 border-b border-sky-500/30 pb-2">{category}</h4>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left p-3">Duits</th>
                            <th className="text-left p-3">Nederlands</th>
                            <th className="text-center p-3">Opslaan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {words.map(word => (
                            <tr key={word.id} className="border-b border-white/10 hover:bg-white/5">
                              <td className="p-3">{word.german}</td>
                              <td className="p-3">{word.dutch}</td>
                              <td className="p-3 text-center">
                                <BookmarkButton id={word.id} type="word" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-sky-200">
                Geen woorden gevonden. Probeer een andere zoekopdracht.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordListPage;
