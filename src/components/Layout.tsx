import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import StarField from './StarField';
import FeedbackToast from './FeedbackToast';
import LoadingOverlay from './LoadingOverlay';
import TutorialOverlay from './TutorialOverlay';
import config from '../config';
import { useApp } from '../context/AppContext';

const Layout: React.FC = () => {
  const { isLoading, feedback } = useApp();
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const location = useLocation();

  // Check if tutorial should be shown
  useEffect(() => {
    const path = location.pathname;
    setCurrentPath(path);
    
    if (config.app.showTutorials) {
      const visitedPages = JSON.parse(localStorage.getItem('dub5_visited_pages') || '{}');
      
      if (!visitedPages[path]) {
        setShowTutorial(true);
        
        // Mark this page as visited
        visitedPages[path] = true;
        localStorage.setItem('dub5_visited_pages', JSON.stringify(visitedPages));
      }
    }
  }, [location.pathname]);

  // Scroll to top when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const closeTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <>
      <Helmet>
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta name="keywords" content={config.seo.keywords} />
        <meta name="author" content={config.seo.author} />
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
        <meta property="og:image" content={config.seo.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#000044] via-[#000033] to-[#000066] text-white relative overflow-hidden flex flex-col">
        <StarField />
        
        {isLoading && config.app.showLoadingIndicators && <LoadingOverlay />}
        {feedback.visible && config.app.showUserFeedback && <FeedbackToast />}
        {showTutorial && <TutorialOverlay path={currentPath} onClose={closeTutorial} />}
        
        <main className="container mx-auto px-8 py-16 relative z-10 flex-grow">
          <Outlet />
        </main>

        <footer className="w-full p-6 relative z-10 mt-auto">
          <p className="text-center text-sm text-sky-100">
            {config.app.copyright}
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
