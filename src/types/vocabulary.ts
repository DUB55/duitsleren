export interface Word {
  id: string;
  german: string;
  dutch: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examples: {
    german: string;
    dutch: string;
  }[];
}

export interface StudySession {
  mode: 'learn' | 'multiple-choice' | 'write' | 'mixed';
  direction: 'dutch-to-german' | 'german-to-dutch';
  currentWord: Word | null;
  progress: number;
  score: number;
  totalWords: number;
  seenWords: Set<string>;
  mistakes: Word[];
}
