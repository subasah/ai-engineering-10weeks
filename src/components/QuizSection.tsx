import { useState } from "react";
import type { QuizQuestion } from "../data/quizzes";

interface QuizSectionProps {
  weekId: number;
  questions: QuizQuestion[];
}

interface AnswerState {
  selected: number | null;
  submitted: boolean;
}

export default function QuizSection({ weekId, questions }: QuizSectionProps) {
  const [answers, setAnswers] = useState<AnswerState[]>(
    questions.map(() => ({ selected: null, submitted: false })),
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const score = answers.filter(
    (a, i) => a.submitted && a.selected === questions[i].correct,
  ).length;
  const allAnswered = answers.every((a) => a.submitted);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (answers[qIdx].submitted) return;
    setAnswers((prev) =>
      prev.map((a, i) => (i === qIdx ? { ...a, selected: optIdx } : a)),
    );
  };

  const handleSubmit = (qIdx: number) => {
    if (answers[qIdx].selected === null) return;
    setAnswers((prev) =>
      prev.map((a, i) => (i === qIdx ? { ...a, submitted: true } : a)),
    );
    const storageKey = `quiz-w${weekId}-q${qIdx}`;
    localStorage.setItem(storageKey, JSON.stringify(answers[qIdx].selected));
  };

  const handleReset = () => {
    setAnswers(questions.map(() => ({ selected: null, submitted: false })));
    setCurrentQ(0);
    setShowResults(false);
  };

  const q = questions[currentQ];
  const ans = answers[currentQ];

  const isCorrect = ans.submitted && ans.selected === q.correct;
  const isWrong = ans.submitted && ans.selected !== q.correct;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #1a1f3c 100%)",
        border: "1px solid rgba(124, 58, 237, 0.25)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between border-b"
        style={{ borderColor: "rgba(124, 58, 237, 0.2)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div>
            <h3 className="text-white font-bold text-lg">Knowledge Check</h3>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              {questions.length} questions · Week {weekId}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Progress dots */}
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className="w-2.5 h-2.5 rounded-full transition-all duration-200"
              style={{
                backgroundColor: answers[i].submitted
                  ? answers[i].selected === questions[i].correct
                    ? "#10b981"
                    : "#ef4444"
                  : i === currentQ
                    ? "#7c3aed"
                    : "rgba(255,255,255,0.15)",
                transform: i === currentQ ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {showResults ? (
        /* Results view */
        <div className="p-6 text-center">
          <div className="text-6xl mb-4">
            {score === questions.length ? "🏆" : score >= 3 ? "🎉" : "📚"}
          </div>
          <h4 className="text-2xl font-bold text-white mb-2">
            {score} / {questions.length} Correct
          </h4>
          <p className="text-gray-400 mb-6">
            {score === questions.length
              ? "Perfect score! You've mastered this week's content."
              : score >= 3
                ? "Great work! Review the explanations for any you missed."
                : "Keep studying — review the concepts and try again."}
          </p>
          <div
            className="w-full rounded-full h-3 mb-6"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <div
              className="h-3 rounded-full transition-all duration-700"
              style={{
                width: `${(score / questions.length) * 100}%`,
                background:
                  score === questions.length
                    ? "linear-gradient(90deg, #10b981, #34d399)"
                    : score >= 3
                      ? "linear-gradient(90deg, #7c3aed, #a78bfa)"
                      : "linear-gradient(90deg, #ef4444, #f87171)",
              }}
            />
          </div>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentQ(i);
                  setShowResults(false);
                }}
                className="py-2 rounded-lg text-sm font-bold transition-all"
                style={{
                  backgroundColor:
                    answers[i].selected === questions[i].correct
                      ? "rgba(16, 185, 129, 0.2)"
                      : "rgba(239, 68, 68, 0.2)",
                  color:
                    answers[i].selected === questions[i].correct
                      ? "#6ee7b7"
                      : "#fca5a5",
                  border: "1px solid",
                  borderColor:
                    answers[i].selected === questions[i].correct
                      ? "rgba(16, 185, 129, 0.4)"
                      : "rgba(239, 68, 68, 0.4)",
                }}
              >
                Q{i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #7c3aed, #f472b6)" }}
          >
            Retry Quiz
          </button>
        </div>
      ) : (
        /* Question view */
        <div className="p-6">
          {/* Question counter */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium" style={{ color: "#a78bfa" }}>
              Question {currentQ + 1} of {questions.length}
            </span>
            {allAnswered && (
              <button
                onClick={() => setShowResults(true)}
                className="text-sm px-4 py-1.5 rounded-lg font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #f472b6)",
                }}
              >
                See Results →
              </button>
            )}
          </div>

          {/* Question text */}
          <h4 className="text-white font-semibold text-base leading-relaxed mb-5">
            {q.question}
          </h4>

          {/* Options */}
          <div className="space-y-3 mb-4">
            {q.options.map((option, optIdx) => {
              const isSelected = ans.selected === optIdx;
              const isCorrectOpt = optIdx === q.correct;
              const showCorrect = ans.submitted && isCorrectOpt;
              const showWrong = ans.submitted && isSelected && !isCorrectOpt;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(currentQ, optIdx)}
                  disabled={ans.submitted}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-start gap-3"
                  style={{
                    backgroundColor: showCorrect
                      ? "rgba(16, 185, 129, 0.15)"
                      : showWrong
                        ? "rgba(239, 68, 68, 0.15)"
                        : isSelected
                          ? "rgba(124, 58, 237, 0.2)"
                          : "rgba(255, 255, 255, 0.05)",
                    border: "1px solid",
                    borderColor: showCorrect
                      ? "rgba(16, 185, 129, 0.5)"
                      : showWrong
                        ? "rgba(239, 68, 68, 0.5)"
                        : isSelected
                          ? "rgba(124, 58, 237, 0.5)"
                          : "rgba(255, 255, 255, 0.08)",
                    cursor: ans.submitted ? "default" : "pointer",
                  }}
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: showCorrect
                        ? "#10b981"
                        : showWrong
                          ? "#ef4444"
                          : isSelected
                            ? "#7c3aed"
                            : "rgba(255,255,255,0.1)",
                      color: "#fff",
                    }}
                  >
                    {showCorrect
                      ? "✓"
                      : showWrong
                        ? "✗"
                        : String.fromCharCode(65 + optIdx)}
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{
                      color: showCorrect
                        ? "#6ee7b7"
                        : showWrong
                          ? "#fca5a5"
                          : "#e2e8f0",
                    }}
                  >
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Submit / Explanation */}
          {!ans.submitted ? (
            <button
              onClick={() => handleSubmit(currentQ)}
              disabled={ans.selected === null}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background:
                  ans.selected !== null
                    ? "linear-gradient(135deg, #7c3aed, #f472b6)"
                    : "rgba(255,255,255,0.1)",
              }}
            >
              Submit Answer
            </button>
          ) : (
            <div>
              {/* Explanation */}
              <div
                className="p-4 rounded-xl mb-4"
                style={{
                  backgroundColor: isCorrect
                    ? "rgba(16, 185, 129, 0.1)"
                    : "rgba(239, 68, 68, 0.08)",
                  border: `1px solid ${isCorrect ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                }}
              >
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: isCorrect ? "#6ee7b7" : "#fca5a5" }}
                >
                  {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {q.explanation}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                {currentQ > 0 && (
                  <button
                    onClick={() => setCurrentQ((n) => n - 1)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#94a3b8",
                    }}
                  >
                    ← Previous
                  </button>
                )}
                {currentQ < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQ((n) => n + 1)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #f472b6)",
                    }}
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResults(true)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #34d399)",
                    }}
                  >
                    See Final Results 🏆
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
