import { Link } from "react-router-dom";
import { weekData } from "../data/curriculum";
import TagBadge from "../components/TagBadge";

const WEEK_ICONS = ["🧠", "⚙️", "🔍", "🛠️", "🤖", "🔌", "📊", "🚀", "🎨", "🏆"];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Background gradient blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-20 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-20 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 114, 182, 0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
            style={{
              background: "rgba(124, 58, 237, 0.15)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              color: "#a78bfa",
            }}
          >
            <span>⚡</span>
            <span>AI Engineering Cohort</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight">
            Learn AI Engineering
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              in 10 Weeks
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#94a3b8" }}
          >
            A hands-on program covering LLMs, RAG, AI Agents, Evals, and
            production deployment — with flowcharts, architecture diagrams, and
            quizzes for every week.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { icon: "📚", value: "10", label: "Weeks of Content" },
              { icon: "🧩", value: "60", label: "Key Concepts" },
              { icon: "🧠", value: "50", label: "Quiz Questions" },
              { icon: "📐", value: "20+", label: "Diagrams" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/week/1"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #f472b6)",
              boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)",
            }}
          >
            🚀 Start Week 1
          </Link>
        </div>
      </section>

      {/* Course Schedule */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Course Curriculum
          </h2>
          <p className="text-center mb-10" style={{ color: "#64748b" }}>
            Click any week to access full learning materials, diagrams, and
            quizzes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {weekData.map((week) => (
              <Link
                key={week.id}
                to={`/week/${week.id}`}
                className="group block rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-3px] card-glow"
                style={{
                  background:
                    "linear-gradient(135deg, #13162a 0%, #1a1f3c 100%)",
                  border: "1px solid rgba(124, 58, 237, 0.15)",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Week number badge */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(244, 114, 182, 0.2))",
                      border: "1px solid rgba(124, 58, 237, 0.3)",
                    }}
                  >
                    <span className="text-xl">{WEEK_ICONS[week.id - 1]}</span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: "#a78bfa" }}
                    >
                      W{week.id}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base mb-1 group-hover:text-purple-300 transition-colors">
                      {week.title}
                    </h3>
                    <p
                      className="text-sm mb-3 line-clamp-2"
                      style={{ color: "#64748b" }}
                    >
                      {week.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {week.tags.slice(0, 3).map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  </div>

                  <svg
                    className="w-5 h-5 flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity"
                    style={{ color: "#a78bfa" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-10 px-4 mt-8 border-t"
        style={{ borderColor: "rgba(124, 58, 237, 0.1)", color: "#475569" }}
      >
        <p className="text-sm">
          Built with React + Mermaid + Recharts · Deployed on GitHub Pages
        </p>
        <p className="text-xs mt-1">
          AI Engineering Cohort — Interactive Learning Platform
        </p>
      </footer>
    </div>
  );
}
