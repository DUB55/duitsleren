import { GrammarRule } from "../types/grammar";
import grammarData from "./grammarRules.json";

/**
 * Grammar Database
 *
 * All grammar content lives in grammarRules.json — edit that file to add,
 * remove, or change grammar rules, tables, examples, and exercises.
 * This file only provides typed exports and helper functions.
 */

export const grammarRules: GrammarRule[] = grammarData as GrammarRule[];

// ── Helper functions ──────────────────────────────────────────────────────────

export const getGrammarRuleById = (id: string): GrammarRule | undefined =>
  grammarRules.find((rule) => rule.id === id);

export const getGrammarRulesByDifficulty = (
  difficulty: "beginner" | "intermediate" | "advanced",
): GrammarRule[] =>
  grammarRules.filter((rule) => rule.difficulty === difficulty);

export default grammarRules;
