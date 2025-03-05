import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BookmarkButtonProps {
  id: string;
  type: 'word' | 'grammar';
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ id, type }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { showFeedback } = useApp();

  // Check if item is already bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('dub5_bookmarks') || '[]');
    const exists = bookmarks.some((item: any) => item.id === id && item.type === type);
    setIsBookmarked(exists);
  }, [id, type]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('dub5_bookmarks') || '[]');
    
    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter(
        (item: any) => !(item.id === id && item.type === type)
      );
      localStorage.setItem('dub5_bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      showFeedback('Item verwijderd uit bladwijzers', 'info');
    } else {
      // Add bookmark
      bookmarks.push({ id, type });
      localStorage.setItem('dub5_bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      showFeedback('Item toegevoegd aan bladwijzers', 'success');
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleBookmark();
      }}
      className={`p-2 rounded-full transition-colors ${
        isBookmarked 
          ? 'bg-sky-500/30 text-sky-300' 
          : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
      }`}
      title={isBookmarked ? 'Verwijder uit bladwijzers' : 'Voeg toe aan bladwijzers'}
    >
      <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
    </button>
  );
};

export default BookmarkButton;
