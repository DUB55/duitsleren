import { Word } from '../types/vocabulary';
import { vocabularyWords, getRandomWords, getRandomOptionsForWord } from '../data/vocabulary';

export interface StudySessionState {
  mode: 'learn' | 'multiple-choice' | 'write' | 'mixed';
  currentWordIndex: number;
  words: Word[];
  score: number;
  mistakes: Word[];
  completed: boolean;
  direction: 'de-to-nl' | 'nl-to-de';
}

export class StudySessionManager {
  private state: StudySessionState;
  private storageKey: string = 'deutschlern_study_session';

  constructor(mode: 'learn' | 'multiple-choice' | 'write' | 'mixed', wordCount: number = 10, direction: 'de-to-nl' | 'nl-to-de' = 'de-to-nl') {
    // Try to load existing session
    const savedSession = this.loadSession();
    
    if (savedSession) {
      this.state = savedSession;
    } else {
      // Create new session
      this.state = {
        mode,
        currentWordIndex: 0,
        words: getRandomWords(wordCount),
        score: 0,
        mistakes: [],
        completed: false,
        direction
      };
      this.saveSession();
    }
  }

  // Get current state
  public getState(): StudySessionState {
    return { ...this.state };
  }

  // Get current word
  public getCurrentWord(): Word | null {
    if (this.state.currentWordIndex >= this.state.words.length) {
      return null;
    }
    return this.state.words[this.state.currentWordIndex];
  }

  // Get options for multiple choice
  public getMultipleChoiceOptions(count: number = 4): string[] {
    const currentWord = this.getCurrentWord();
    if (!currentWord) return [];
    
    return getRandomOptionsForWord(currentWord, count);
  }

  // Record answer
  public recordAnswer(correct: boolean): void {
    const currentWord = this.getCurrentWord();
    
    if (currentWord) {
      if (correct) {
        this.state.score += 1;
      } else {
        this.state.mistakes.push(currentWord);
      }
      
      this.state.currentWordIndex += 1;
      
      if (this.state.currentWordIndex >= this.state.words.length) {
        this.state.completed = true;
      }
      
      this.saveSession();
    }
  }

  // Reset session
  public resetSession(): void {
    localStorage.removeItem(this.storageKey);
    this.state = {
      ...this.state,
      currentWordIndex: 0,
      score: 0,
      mistakes: [],
      completed: false
    };
    this.saveSession();
  }

  // Start new session with different words
  public startNewSession(wordCount: number = 10): void {
    this.state = {
      ...this.state,
      currentWordIndex: 0,
      words: getRandomWords(wordCount),
      score: 0,
      mistakes: [],
      completed: false
    };
    this.saveSession();
  }

  // Save session to localStorage
  private saveSession(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }

  // Load session from localStorage
  private loadSession(): StudySessionState | null {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}

export default StudySessionManager;
