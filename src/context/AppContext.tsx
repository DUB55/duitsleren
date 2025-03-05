import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import config from '../config';

interface AppContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showFeedback: (message: string, type: 'success' | 'error' | 'info') => void;
  feedback: {
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  };
  logError: (error: Error | string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  }>({
    message: '',
    type: 'info',
    visible: false,
  });

  const showFeedback = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    if (!config.app.showUserFeedback) return;
    
    setFeedback({
      message,
      type,
      visible: true,
    });

    // Auto-hide feedback after 3 seconds
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  const logError = useCallback((error: Error | string) => {
    if (!config.app.logErrors) return;
    
    const errorMessage = error instanceof Error ? error.message : error;
    console.error('DUB5 Error:', errorMessage);
    
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack);
    }
    
    if (config.app.showUserFeedback) {
      showFeedback('Er is een fout opgetreden. Probeer het later opnieuw.', 'error');
    }
  }, [showFeedback]);

  const contextValue = {
    isLoading,
    setIsLoading,
    showFeedback,
    feedback,
    logError
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
