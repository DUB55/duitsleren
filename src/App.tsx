import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import WordListPage from './pages/WordListPage';
import GrammarPage from './pages/GrammarPage';
import TestsPage from './pages/TestsPage';
import SearchPage from './pages/SearchPage';
import BookmarksPage from './pages/BookmarksPage';
import AiTutorPage from './pages/AiTutorPage';
import NotFoundPage from './pages/NotFoundPage';
import { useApp } from './context/AppContext';

function App() {
  const { logError } = useApp();

  // Global error boundary
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logError(event.error || event.message);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      logError(event.reason || 'Unhandled Promise Rejection');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [logError]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="vocabulary" element={<VocabularyPage />} />
        <Route path="word-list" element={<WordListPage />} />
        <Route path="grammar" element={<GrammarPage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="ai-tutor" element={<AiTutorPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
