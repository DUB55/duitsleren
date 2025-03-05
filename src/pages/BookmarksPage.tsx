import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Word } from '../types/vocabulary';
import { GrammarRule } from '../data/grammar';
import { getWordById } from '../data/vocabulary';
import { getGrammarRuleById } from '../data/grammar';

interface BookmarkedItem {
  id: string;
  type: 'word' | 'grammar';
}

const BookmarksPage: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
  const [bookmarkedWords, setBookmarkedWords] = useState<Word[]>([]);
  const [bookmarkedGrammar, setBookmarkedGrammar] = useState<GrammarRule[]>([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('dub5_bookmarks') || '[]');
    setBookmarks(savedBookmarks);
    
    // Load bookmarked items
    const words = savedBookmarks
      .filter((item: BookmarkedItem) => item.type === 'word')
      .map((item: BookmarkedItem) => getWordById(item.id))
      .filter((word): word is Word => word !== undefined);
    
    const grammar = savedBookmarks
      .filter((item: BookmarkedItem) => item.type === 'grammar')
      .map((item: BookmarkedItem) => getGrammarRuleById(item.id))
      .filter((rule): rule is GrammarRule => rule !== undefined);
    
    setBookmarkedWords(words);
    setBookmarkedGrammar(grammar);
  }, []);

  const removeBookmark = (id: string, type: 'word' | 'grammar') => {
    const updatedBookmarks = bookmarks.filter(
      item => !(item.id === id && item.type === type)
    );
    
    setBookmarks(updatedBookmarks);
    localStorage.setItem('dub5_bookmarks', JSON.stringify(updatedBookmarks));
    
    if (type === 'word') {
      setBookmarkedWords(prev => prev.filter(word => word.id !== id));
    } else {
      setBookmarkedGrammar(prev => prev.filter(rule => rule.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Link to="/" className="text-sky-300 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Terug naar Home
        </Link>
      </div>
      
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Bookmark className="w-8 h-8 text-sky-300" />
          <h1 className="text-4xl font-['DM_Serif_Display']">Opgeslagen Woorden</h1>
        </div>
        <p className="text-sky-100 mb-8">Je opgeslagen woorden kan je hier vinden:</p>
      </header>

      {bookmarks.length > 0 ? (
        <div className="space-y-8">
          {bookmarkedWords.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Opgeslagen Woorden</h2>
              <div className="space-y-3">
                {bookmarkedWords.map(word => (
                  <div key={word.id} className="bg-white/5 backdrop-blur-lg rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="flex gap-4 mb-2">
                        <span className="font-medium">{word.german}</span>
                        <span className="text-sky-200">{word.dutch}</span>
                      </div>
                      <div className="text-xs text-sky-300">
                        Categorie: {word.category} • Niveau: {word.difficulty}
                      </div>
                    </div>
                    <button 
                      onClick={() => removeBookmark(word.id, 'word')}
                      className="text-white/50 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {bookmarkedGrammar.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Opgeslagen Grammaticaregels</h2>
              <div className="space-y-3">
                {bookmarkedGrammar.map(rule => (
                  <div key={rule.id} className="bg-white/5 backdrop-blur-lg rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-2">{rule.title}</h3>
                      <p className="text-sm text-sky-100 mb-2">{rule.description}</p>
                      <div className="text-xs text-sky-300">
                        Niveau: {rule.difficulty}
                      </div>
                    </div>
                    <button 
                      onClick={() => removeBookmark(rule.id, 'grammar')}
                      className="text-white/50 hover:text-red-400 transition-colors ml-4"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 text-center">
          <p className="text-sky-100">
            Je hebt nog geen woorden opgeslagen.
          </p>
          <p className="text-sm text-sky-200 mt-2">
            SLA WOORDEN OP OM ZE HIER TE VINDEN...
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
