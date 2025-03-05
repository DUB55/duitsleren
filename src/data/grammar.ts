import { GrammarRule } from '../types/grammar';

/**
 * Grammar Database
 * 
 * This file contains all the German grammar rules with their explanations,
 * examples, and exercises. Add new rules to this file to expand the grammar database.
 */

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

// Grammar rules database
export const grammarRules: GrammarRule[] = [
  {
    id: "present-tense",
    title: "Het werkwoord in de tegenwoordige tijd (das Präsens)",
    description: "De tegenwoordige tijd (das Präsens) wordt gebruikt om te praten over dingen die nu gebeuren of algemene waarheden. De stam vind je door -en van het werkwoord af te halen.",
    difficulty: "beginner",
    examples: [
      {
        german: "spielen → ich spiele, du spielst, er/sie/es spielt",
        dutch: "spelen → ik speel, jij speelt, hij/zij/het speelt",
        explanation: "Regelmatige werkwoorden volgen het patroon: stam + uitgang"
      },
      {
        german: "heißen → ich heiße, du heißt, er/sie/es heißt",
        dutch: "heten → ik heet, jij heet, hij/zij/het heet",
        explanation: "Let op de ß in het Duits"
      },
      {
        german: "reden → ich rede, du redest, er/sie/es redet",
        dutch: "praten → ik praat, jij praat, hij/zij/het praat",
        explanation: "Bij werkwoorden die eindigen op -d of -t komt er een extra -e- bij du en er/sie/es"
      },
      {
        german: "antworten → ich antworte, du antwortest, er/sie/es antwortet",
        dutch: "antwoorden → ik antwoord, jij antwoordt, hij/zij/het antwoordt",
        explanation: "Ook hier komt er een extra -e- bij du en er/sie/es"
      }
    ],
    exercises: [
      {
        question: "Wat is de juiste vorm van 'spielen' voor 'du'?",
        options: ["spiele", "spielst", "spielt", "spielen"],
        correctAnswer: "spielst",
        explanation: "Bij 'du' krijgt de stam (spiel-) de uitgang -st: du spielst"
      },
      {
        question: "Wat is de juiste vorm van 'reden' voor 'er'?",
        options: ["redet", "redt", "retest", "rede"],
        correctAnswer: "redet",
        explanation: "Bij 'er' krijgt de stam (red-) de uitgang -et (met extra -e- omdat de stam eindigt op -d): er redet"
      },
      {
        question: "Wat is de juiste vorm van 'heißen' voor 'wir'?",
        options: ["heißen", "heißt", "heißest", "heiße"],
        correctAnswer: "heißen",
        explanation: "Bij 'wir' krijgt de stam (heiß-) de uitgang -en: wir heißen"
      }
    ]
  },
  {
    id: "past-participle",
    title: "Het voltooid deelwoord (das Partizip)",
    description: "Het voltooid deelwoord (das Partizip) wordt gebruikt om de voltooide tijd te vormen. Bij zwakke (regelmatige) werkwoorden wordt het gevormd door ge- + stam + -t. Bij sterke (onregelmatige) werkwoorden moet je de vorm apart leren.",
    difficulty: "beginner",
    examples: [
      {
        german: "hören → gehört (Ich habe es gehört.)",
        dutch: "horen → gehoord (Ik heb het gehoord.)",
        explanation: "Regelmatig werkwoord: ge- + stam + -t"
      },
      {
        german: "spielen → gespielt (Mein Hund hat mit meiner Katze gespielt.)",
        dutch: "spelen → gespeeld (Mijn hond heeft met mijn kat gespeeld.)",
        explanation: "Regelmatig werkwoord: ge- + stam + -t"
      },
      {
        german: "fotografieren → fotografiert (Was hast du fotografiert?)",
        dutch: "fotograferen → gefotografeerd (Wat heb je gefotografeerd?)",
        explanation: "Werkwoord op -ieren: stam + -t (geen ge-)"
      },
      {
        german: "versorgen → versorgt (Er hat die Katze versorgt.)",
        dutch: "verzorgen → verzorgd (Hij heeft de kat verzorgd.)",
        explanation: "Werkwoord met ver-: stam + -t (geen ge-)"
      },
      {
        german: "besuchen → besucht (Wir haben den Zoo besucht.)",
        dutch: "bezoeken → bezocht (We hebben de dierentuin bezocht.)",
        explanation: "Werkwoord met be-: stam + -t (geen ge-)"
      },
      {
        german: "schwimmen → geschwommen (Die Kinder sind im See geschwommen.)",
        dutch: "zwemmen → gezwommen (De kinderen hebben in het meer gezwommen.)",
        explanation: "Onregelmatig werkwoord: aparte vorm leren"
      }
    ],
    exercises: [
      {
        question: "Wat is het voltooid deelwoord van 'spielen'?",
        options: ["gespielen", "gespielt", "gespielet", "spielt"],
        correctAnswer: "gespielt",
        explanation: "Regelmatig werkwoord: ge- + stam + -t = ge- + spiel- + -t = gespielt"
      },
      {
        question: "Wat is het voltooid deelwoord van 'versorgen'?",
        options: ["geversorgt", "versorgt", "gesorgt", "vergesorgt"],
        correctAnswer: "versorgt",
        explanation: "Werkwoord met ver-: geen ge- prefix, alleen stam + -t = versorgt"
      },
      {
        question: "Wat is het voltooid deelwoord van 'schwimmen'?",
        options: ["geschwimmt", "schwimmt", "geschwommen", "schwommen"],
        correctAnswer: "geschwommen",
        explanation: "Onregelmatig werkwoord: de vorm moet je apart leren = geschwommen"
      }
    ]
  },
  {
    id: "sein-haben-werden",
    title: "De werkwoorden sein, haben en werden",
    description: "De werkwoorden 'sein' (zijn), 'haben' (hebben) en 'werden' (worden/zullen) zijn zeer belangrijke hulpwerkwoorden in het Duits. Ze hebben onregelmatige vervoegingen die je apart moet leren.",
    difficulty: "beginner",
    examples: [
      {
        german: "sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind",
        dutch: "zijn: ik ben, jij bent, hij/zij/het is, wij zijn, jullie zijn, zij/u zijn/bent",
        explanation: "Het werkwoord 'sein' is volledig onregelmatig"
      },
      {
        german: "haben: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben",
        dutch: "hebben: ik heb, jij hebt, hij/zij/het heeft, wij hebben, jullie hebben, zij/u hebben/hebt",
        explanation: "Het werkwoord 'haben' is onregelmatig"
      },
      {
        german: "werden: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden",
        dutch: "worden/zullen: ik word/zal, jij wordt/zult, hij/zij/het wordt/zal, wij worden/zullen, jullie worden/zullen, zij/u worden/zullen",
        explanation: "Het werkwoord 'werden' is onregelmatig en kan zowel 'worden' als 'zullen' betekenen"
      }
    ],
    exercises: [
      {
        question: "Wat is de juiste vorm van 'sein' voor 'ich'?",
        options: ["bin", "bist", "ist", "sind"],
        correctAnswer: "bin",
        explanation: "De vorm van 'sein' voor 'ich' is 'bin': ich bin"
      },
      {
        question: "Wat is de juiste vorm van 'haben' voor 'er'?",
        options: ["habe", "habst", "hat", "habt"],
        correctAnswer: "hat",
        explanation: "De vorm van 'haben' voor 'er' is 'hat': er hat"
      },
      {
        question: "Wat is de juiste vorm van 'werden' voor 'wir'?",
        options: ["werden", "werdet", "wird", "wirst"],
        correctAnswer: "werden",
        explanation: "De vorm van 'werden' voor 'wir' is 'werden': wir werden"
      }
    ]
  }
];

// Helper functions to work with grammar rules
export const getGrammarRuleById = (id: string): GrammarRule | undefined => {
  return grammarRules.find(rule => rule.id === id);
};

export const getGrammarRulesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): GrammarRule[] => {
  return grammarRules.filter(rule => rule.difficulty === difficulty);
};

export default grammarRules;
