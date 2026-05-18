export interface GrammarTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface GrammarRule {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tables?: GrammarTable[];
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
