import { Word } from "../types/vocabulary";
import wordsData from "./words.json";

/**
 * Vocabulary Database
 *
 * All word content lives in words.json — edit that file to add, remove,
 * or change vocabulary. This file only provides typed exports and helper functions.
 *
 * ID conventions (set when the JSON was built):
 *   n1–n54  →  NL-DE WOORDEN.txt  (Dutch shown, German answer)
 *   d1–d40  →  DE-NL WOORDEN.txt  (German shown, Dutch answer)
 */

export const vocabularyWords: Word[] = wordsData as Word[];

// Words from NL-DE WOORDEN.txt — used when direction is dutch-to-german
export const dutchToGermanWords: Word[] = vocabularyWords.filter((w) =>
  w.id.startsWith("n"),
);

// Words from DE-NL WOORDEN.txt — used when direction is german-to-dutch
export const germanToDutchWords: Word[] = vocabularyWords.filter((w) =>
  w.id.startsWith("d"),
);

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
  direction: "dutch-to-german" | "german-to-dutch" = "dutch-to-german",
): Word[] => {
  const wordList =
    direction === "dutch-to-german" ? dutchToGermanWords : germanToDutchWords;
  const shuffled = [...wordList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRandomWordsExcept = (
  count: number,
  excludeIds: string[],
  direction: "dutch-to-german" | "german-to-dutch" = "dutch-to-german",
): Word[] => {
  const wordList =
    direction === "dutch-to-german" ? dutchToGermanWords : germanToDutchWords;
  const available = wordList.filter((word) => !excludeIds.includes(word.id));
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
