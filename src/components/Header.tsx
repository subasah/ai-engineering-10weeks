import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { weekData } from "../data/curriculum";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentWeek = location.pathname.startsWith("/week/")
    ? parseInt(location.pathname.replace("/week/", ""))
    : null;

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(13, 15, 30, 0.95)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(124, 58, 237, 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #f472b6)",
              }}
            >
              ⚡
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">
                AI Engineering
              </div>
              <div className="text-xs" style={{ color: "#a78bfa" }}>
                10-Week Cohort
              </div>
            </div>
          </Link>

          {/* Current Week Indicator */}
          {currentWeek && (
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{
                background: "rgba(124, 58, 237, 0.15)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                color: "#a78bfa",
              }}
            >
              <span>Week {currentWeek}:</span>
              <span className="text-white font-medium truncate max-w-48">
                {weekData[currentWeek - 1]?.title}
              </span>
            </div>
          )}

          {/* Week Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {weekData.map((week) => (
              <Link
                key={week.id}
                to={`/week/${week.id}`}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor:
                    currentWeek === week.id
                      ? "rgba(124, 58, 237, 0.8)"
                      : "rgba(255, 255, 255, 0.05)",
                  color: currentWeek === week.id ? "#fff" : "#94a3b8",
                }}
                title={`Week ${week.id}: ${week.title}`}
              >
                {week.id}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="lg:hidden border-t px-4 py-4"
          style={{
            backgroundColor: "rgba(13, 15, 30, 0.98)",
            borderColor: "rgba(124, 58, 237, 0.2)",
          }}
        >
          <div className="grid grid-cols-5 gap-2">
            {weekData.map((week) => (
              <Link
                key={week.id}
                to={`/week/${week.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center gap-1 p-2 rounded-lg text-center transition-all"
                style={{
                  backgroundColor:
                    currentWeek === week.id
                      ? "rgba(124, 58, 237, 0.3)"
                      : "rgba(255,255,255,0.04)",
                  border:
                    currentWeek === week.id
                      ? "1px solid rgba(124,58,237,0.5)"
                      : "1px solid transparent",
                }}
              >
                <span className="text-base font-bold text-white">
                  {week.id}
                </span>
                <span className="text-xs text-gray-400 leading-tight line-clamp-2">
                  {week.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
