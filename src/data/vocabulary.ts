import { Word } from "../types/vocabulary";
import wordsData from "./words.json";

/**
 * Vocabulary Database
 *
 * All word content lives in words.json — edit that file to add, remove,
 * or change vocabulary. This file only provides typed exports and helper functions.
 */

export const vocabularyWords: Word[] = wordsData as Word[];

// Both directions use the same word list.
// The direction parameter in helper functions controls which field is the
// "question" and which is the "answer" — that logic lives in the UI components.
export const dutchToGermanWords: Word[] = vocabularyWords;
export const germanToDutchWords: Word[] = vocabularyWords;

// ── Helper functions ──────────────────────────────────────────────────────────

export const getWordById = (id: string): Word | undefined =>
  vocabularyWords.find((word) => word.id === id);

export const getWordsByCategory = (category: string): Word[] =>
  vocabularyWords.filter((word) => word.category === category);

export const getWordsByDifficulty = (
  difficulty: "beginner" | "intermediate" | "advanced",
): Word[] => vocabularyWords.filter((word) => word.difficulty === difficulty);

export const getRandomWords = (
  count: number,
  _direction: "dutch-to-german" | "german-to-dutch" = "dutch-to-german",
): Word[] => {
  const shuffled = [...vocabularyWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRandomWordsExcept = (
  count: number,
  excludeIds: string[],
  _direction: "dutch-to-german" | "german-to-dutch" = "dutch-to-german",
): Word[] => {
  const available = vocabularyWords.filter(
    (word) => !excludeIds.includes(word.id),
  );
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRandomOptionsForWord = (
  word: Word,
  optionCount: number,
  direction: "dutch-to-german" | "german-to-dutch" = "dutch-to-german",
): string[] => {
  const otherWords = getRandomWordsExcept(
    optionCount - 1,
    [word.id],
    direction,
  );

  const correctAnswer =
    direction === "dutch-to-german" ? word.german : word.dutch;
  const incorrectOptions = otherWords.map((w) =>
    direction === "dutch-to-german" ? w.german : w.dutch,
  );

  const options = [correctAnswer, ...incorrectOptions];
  return options.sort(() => 0.5 - Math.random());
};
