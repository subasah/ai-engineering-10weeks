import type { Concept } from "../data/curriculum";

interface ConceptCardProps {
  concept: Concept;
  index: number;
}

export default function ConceptCard({ concept, index }: ConceptCardProps) {
  return (
    <div
      className="rounded-xl p-5 transition-all duration-300 hover:translate-y-[-2px] card-glow"
      style={{
        background: "linear-gradient(135deg, #13162a 0%, #1a1f3c 100%)",
        border: "1px solid rgba(124, 58, 237, 0.15)",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl flex-shrink-0">{concept.icon}</span>
        <h4 className="text-white font-semibold text-base leading-snug">
          {concept.title}
        </h4>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
        {concept.description}
      </p>
      <div
        className="p-3 rounded-lg text-xs leading-relaxed"
        style={{
          backgroundColor: "rgba(124, 58, 237, 0.07)",
          color: "#c4b5fd",
          borderLeft: "2px solid rgba(124, 58, 237, 0.4)",
        }}
      >
        {concept.detail}
      </div>
    </div>
  );
}
