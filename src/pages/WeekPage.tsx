import { useParams, Link } from "react-router-dom";
import { weekData } from "../data/curriculum";
import { weekQuizzes } from "../data/quizzes";
import { weekDiagrams } from "../data/diagrams";
import { weekCharts } from "../data/chartData";
import TagBadge from "../components/TagBadge";
import ConceptCard from "../components/ConceptCard";
import MermaidDiagram from "../components/MermaidDiagram";
import ConceptTable from "../components/ConceptTable";
import WeekChart from "../components/WeekChart";
import QuizSection from "../components/QuizSection";

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{icon}</span>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-sm ml-8" style={{ color: "#64748b" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function WeekPage() {
  const { weekId } = useParams<{ weekId: string }>();
  const id = parseInt(weekId ?? "1");
  const week = weekData.find((w) => w.id === id);
  const quizzes = weekQuizzes[id];
  const diagrams = weekDiagrams[id];
  const chart = weekCharts[id];

  if (!week) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🤔</p>
          <h2 className="text-xl font-bold text-white mb-2">Week not found</h2>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden py-14 px-4"
        style={{
          background:
            "linear-gradient(135deg, #0d0f1e 0%, #1e1b4b 50%, #1a1f3c 100%)",
          borderBottom: "1px solid rgba(124, 58, 237, 0.2)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 mb-6 text-sm"
            style={{ color: "#64748b" }}
          >
            <Link to="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <span>›</span>
            <span style={{ color: "#a78bfa" }}>Week {week.id}</span>
          </div>

          {/* Week number + label */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "rgba(124, 58, 237, 0.2)",
              border: "1px solid rgba(124, 58, 237, 0.4)",
              color: "#a78bfa",
            }}
          >
            Week {week.id} of 10
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
            {week.title}
          </h1>
          <p
            className="text-xl font-medium mb-4"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {week.subtitle}
          </p>
          <p
            className="text-base leading-relaxed mb-6 max-w-3xl"
            style={{ color: "#94a3b8" }}
          >
            {week.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {week.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          {/* Week navigation */}
          <div className="flex items-center gap-3">
            {id > 1 && (
              <Link
                to={`/week/${id - 1}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-white/10"
                style={{
                  background: "rgba(255, 255, 255, 0.07)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#94a3b8",
                }}
              >
                ← Week {id - 1}
              </Link>
            )}
            {id < 10 && (
              <Link
                to={`/week/${id + 1}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #f472b6)",
                }}
              >
                Week {id + 1} →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-14">
        {/* Learning Objectives */}
        <section>
          <SectionTitle
            icon="🎯"
            title="Learning Objectives"
            subtitle="By the end of this week you will be able to:"
          />
          <div
            className="rounded-xl p-6"
            style={{
              background: "linear-gradient(135deg, #13162a 0%, #1a1f3c 100%)",
              border: "1px solid rgba(124, 58, 237, 0.2)",
            }}
          >
            <ul className="space-y-3">
              {week.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #f472b6)",
                      color: "#fff",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "#cbd5e1" }}
                  >
                    {obj}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Industry Use Case */}
        <section>
          <div
            className="rounded-xl p-5 flex gap-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(6, 182, 212, 0.07) 0%, rgba(124, 58, 237, 0.07) 100%)",
              border: "1px solid rgba(6, 182, 212, 0.2)",
            }}
          >
            <span className="text-2xl flex-shrink-0">🏭</span>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: "#06b6d4" }}
              >
                Real-World Industry Application
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#cbd5e1" }}
              >
                {week.industryUseCase}
              </p>
            </div>
          </div>
        </section>

        {/* Key Concepts */}
        <section>
          <SectionTitle
            icon="💡"
            title="Key Concepts"
            subtitle="Core ideas you need to understand this week"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {week.concepts.map((concept, i) => (
              <ConceptCard key={concept.title} concept={concept} index={i} />
            ))}
          </div>
        </section>

        {/* Process Flowchart */}
        {diagrams && (
          <section>
            <SectionTitle
              icon="🔄"
              title="Process Flowchart"
              subtitle="Step-by-step visual walkthrough of this week's core process"
            />
            <MermaidDiagram
              chart={diagrams.flowchart}
              id={`w${id}-flowchart`}
              title="Process Flow Diagram"
            />
          </section>
        )}

        {/* Architecture Diagram */}
        {diagrams && (
          <section>
            <SectionTitle
              icon="🏗️"
              title="Architecture Diagram"
              subtitle="System components and how they connect"
            />
            <MermaidDiagram
              chart={diagrams.architecture}
              id={`w${id}-architecture`}
              title="Architecture / System Design"
            />
          </section>
        )}

        {/* Comparison Table */}
        <section>
          <SectionTitle
            icon="📊"
            title="Comparison Table"
            subtitle="Side-by-side tradeoffs and decision criteria"
          />
          <ConceptTable table={week.table} />
        </section>

        {/* Chart */}
        {chart && (
          <section>
            <SectionTitle
              icon="📈"
              title="Data Visualization"
              subtitle="Key metrics and tradeoffs visualized"
            />
            <WeekChart config={chart} />
          </section>
        )}

        {/* Key Takeaways */}
        <section>
          <SectionTitle
            icon="🏁"
            title="Key Takeaways"
            subtitle="The most important things to remember from this week"
          />
          <div
            className="rounded-xl p-6 space-y-3"
            style={{
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.07) 0%, rgba(124, 58, 237, 0.07) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            {week.keyTakeaways.map((takeaway, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 text-green-400 mt-0.5">✓</span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#cbd5e1" }}
                >
                  {takeaway}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        {quizzes && (
          <section>
            <SectionTitle
              icon="🧠"
              title="Knowledge Check"
              subtitle="Test your understanding of this week's concepts"
            />
            <QuizSection weekId={week.id} questions={quizzes} />
          </section>
        )}

        {/* Navigation Footer */}
        <section
          className="flex items-center justify-between pt-4 border-t"
          style={{ borderColor: "rgba(124, 58, 237, 0.15)" }}
        >
          {id > 1 ? (
            <Link
              to={`/week/${id - 1}`}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#94a3b8",
              }}
            >
              ← Week {id - 1}: {weekData[id - 2]?.title}
            </Link>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#94a3b8",
              }}
            >
              ← Back to Course Home
            </Link>
          )}
          {id < 10 && (
            <Link
              to={`/week/${id + 1}`}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #f472b6)",
              }}
            >
              Week {id + 1}: {weekData[id]?.title} →
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
