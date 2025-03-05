import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { vocabularyWords } from '../data/vocabulary';
import { grammarRules } from '../data/grammar';
import BookmarkButton from '../components/BookmarkButton';
import config from '../config';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{
    words: typeof vocabularyWords,
    grammar: typeof grammarRules
  }>({ words: [], grammar: [] });
  const [hasSearched, setHasSearched] = useState(false);
  const location = useLocation();

  // Live search as user types
  useEffect(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      
      // Search vocabulary
      const matchedWords = vocabularyWords.filter(word => 
        word.german.toLowerCase().includes(term) || 
        word.dutch.toLowerCase().includes(term)
      );
      
      // Search grammar
      const matchedGrammar = grammarRules.filter(rule => 
        rule.title.toLowerCase().includes(term) || 
        rule.description.toLowerCase().includes(term)
      );
      
      setSearchResults({
        words: matchedWords,
        grammar: matchedGrammar
      });
      setHasSearched(true);
    } else {
      setSearchResults({ words: [], grammar: [] });
    }
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults({ words: [], grammar: [] });
    setHasSearched(false);
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
      <div className="flex items-center mb-8">
        <Link 
          to={location.state?.from || "/"} 
          className="text-sky-300 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Terug naar {getPreviousPageName()}
        </Link>
      </div>
      
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Search className="w-8 h-8 text-sky-300" />
          <h1 className="text-4xl font-['DM_Serif_Display']">Zoeken</h1>
        </div>
        <p className="text-sky-100 mb-8">Zoek naar Duitse woorden, vertalingen of grammaticaregels</p>
      </header>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek naar woorden of grammatica..."
            className="w-full p-4 pr-12 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-sky-400 focus:outline-none transition-all"
            autoFocus
          />
        </div>
      </div>

      {hasSearched && (
        <div className="space-y-8">
          {searchResults.words.length > 0 && (
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Woordenschat ({searchResults.words.length} resultaten)</h2>
              
              <div className="space-y-3">
                {searchResults.words.map(word => (
                  <div key={word.id} className="p-4 rounded-lg bg-white/5 flex justify-between items-center">
                    <div>
                      <div className="flex gap-4 mb-1">
                        <span className="font-medium">{word.german}</span>
                        <span className="text-sky-200">{word.dutch}</span>
                      </div>
                    </div>
                    <BookmarkButton id={word.id} type="word" />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {searchResults.grammar.length > 0 && (
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Grammatica ({searchResults.grammar.length} resultaten)</h2>
              
              <div className="space-y-3">
                {searchResults.grammar.map(rule => (
                  <div key={rule.id} className="p-4 rounded-lg bg-white/5 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">{rule.title}</h3>
                      <p className="text-sm text-sky-100 mb-1">{rule.description}</p>
                    </div>
                    <BookmarkButton id={rule.id} type="grammar" />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {searchResults.words.length === 0 && searchResults.grammar.length === 0 && (
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 text-center">
              <p className="text-sky-100 mb-2">Geen resultaten gevonden voor "{searchTerm}"</p>
              <p className="text-sm text-sky-200">
                Probeer een andere zoekterm of controleer de spelling.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
