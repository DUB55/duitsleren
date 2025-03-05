import React from 'react';
import { dutchToGermanWords, germanToDutchWords } from '../data/vocabulary';
import BookmarkButton from './BookmarkButton';

interface WordListSidebarProps {
  direction: 'dutch-to-german' | 'german-to-dutch';
}

const WordListSidebar: React.FC<WordListSidebarProps> = ({ direction }) => {
  const words = direction === 'dutch-to-german' ? dutchToGermanWords : germanToDutchWords;
  
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 h-[600px] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">
        {direction === 'dutch-to-german' ? 'Nederlands → Duits' : 'Duits → Nederlands'}
      </h3>
      
      <div className="space-y-2">
        {words.map(word => (
          <div key={word.id} className="flex justify-between items-center p-2 rounded hover:bg-white/5">
            <div>
              <span className="text-sm">
                {direction === 'dutch-to-german' ? word.dutch : word.german}
              </span>
              <span className="text-xs text-sky-200 ml-2">
                {direction === 'dutch-to-german' ? word.german : word.dutch}
              </span>
            </div>
            <BookmarkButton id={word.id} type="word" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordListSidebar;
