import React, { useState } from "react";
import { ArrowLeft, Brain, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { grammarRules } from "../data/grammar";
import BookmarkButton from "../components/BookmarkButton";

const GrammarPage: React.FC = () => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(
    grammarRules[0].id,
  );
  const [exerciseAnswers, setExerciseAnswers] = useState<
    Record<string, string | null>
  >({});

  const selectedRule =
    grammarRules.find((rule) => rule.id === selectedRuleId) || grammarRules[0];

  const handleAnswerSelect = (exerciseIndex: number, answer: string) => {
    const key = `${selectedRuleId}-${exerciseIndex}`;
    setExerciseAnswers((prev) => ({
      ...prev,
      [key]: answer,
    }));
  };

  const isAnswerCorrect = (exerciseIndex: number, answer: string) => {
    const exercise = selectedRule.exercises[exerciseIndex];
    return exercise.correctAnswer === answer;
  };

  const hasAnswered = (exerciseIndex: number) => {
    const key = `${selectedRuleId}-${exerciseIndex}`;
    return exerciseAnswers[key] !== undefined && exerciseAnswers[key] !== null;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <Link
          to="/"
          className="text-sky-300 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Terug naar Home
        </Link>
      </div>

      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-sky-300" />
          <h1 className="text-4xl font-['DM_Serif_Display']">
            Grammatica Lessen
          </h1>
        </div>
        <p className="text-sky-100 mb-8">Leer de Duitse grammaticaregels</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Grammaticaregels</h3>
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2">
              {grammarRules.map((rule) => (
                <button
                  key={rule.id}
                  onClick={() => setSelectedRuleId(rule.id)}
                  className={`p-3 rounded-lg text-left ${selectedRuleId === rule.id ? "bg-sky-500/30 text-white" : "bg-white/10 text-sky-100 hover:bg-white/20"}`}
                >
                  <div className="font-medium">{rule.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold">{selectedRule.title}</h2>
              <BookmarkButton id={selectedRule.id} type="grammar" />
            </div>
            <p className="text-sky-100 mb-6">{selectedRule.description}</p>

            {selectedRule.tables &&
              selectedRule.tables.map((table, tIdx) => (
                <div key={tIdx} className="mb-6 overflow-x-auto">
                  <h3 className="text-xl font-semibold mb-3">{table.title}</h3>
                  <table className="w-full border-collapse bg-white/5 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-white/10">
                        {table.headers.map((header, hIdx) => (
                          <th key={hIdx} className="p-3 text-left">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="border-t border-white/10">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}

            <h3 className="text-xl font-semibold mb-3">Voorbeelden</h3>
            <div className="space-y-4 mb-6">
              {selectedRule.examples.map((example, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <p className="font-medium mb-1">{example.german}</p>
                  <p className="text-sky-200">{example.dutch}</p>
                  {example.explanation && (
                    <p className="text-xs mt-2 text-sky-300">
                      {example.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3">Oefeningen</h3>
            <div className="space-y-6">
              {selectedRule.exercises.map((exercise, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <p className="font-medium mb-3">{exercise.question}</p>

                  {exercise.options && (
                    <div className="space-y-2 mb-4">
                      {exercise.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => handleAnswerSelect(index, option)}
                          disabled={hasAnswered(index)}
                          className={`block w-full text-left p-2 rounded ${
                            hasAnswered(index)
                              ? option === exercise.correctAnswer
                                ? "bg-green-500/30 text-green-200"
                                : option ===
                                    exerciseAnswers[
                                      `${selectedRuleId}-${index}`
                                    ]
                                  ? "bg-red-500/30 text-red-200"
                                  : "bg-white/10 text-white/50"
                              : "bg-white/10 hover:bg-white/20 text-white"
                          } transition-colors`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {hasAnswered(index) &&
                              (option === exercise.correctAnswer ? (
                                <Check className="w-5 h-5 text-green-400" />
                              ) : option ===
                                exerciseAnswers[
                                  `${selectedRuleId}-${index}`
                                ] ? (
                                <X className="w-5 h-5 text-red-400" />
                              ) : null)}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {hasAnswered(index) && (
                    <div className="mt-4 p-3 bg-sky-500/20 rounded-lg">
                      <p className="text-sm font-medium">
                        {isAnswerCorrect(
                          index,
                          exerciseAnswers[`${selectedRuleId}-${index}`] || "",
                        )
                          ? "Correct!"
                          : `Fout. Het juiste antwoord is: ${exercise.correctAnswer}`}
                      </p>
                      <p className="text-xs mt-1 text-sky-200">
                        {exercise.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarPage;
