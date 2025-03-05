export interface GrammarRule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examples: {
    german: string;
    dutch: string;
    explanation?: string;
  }[];
  exercises: {
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}
