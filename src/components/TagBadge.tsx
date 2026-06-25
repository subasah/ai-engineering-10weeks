interface TagBadgeProps {
  tag: string;
}

const tagColors: Record<string, { bg: string; text: string; border: string }> =
  {
    tokens: {
      bg: "rgba(124, 58, 237, 0.15)",
      text: "#a78bfa",
      border: "rgba(124, 58, 237, 0.3)",
    },
    vectors: {
      bg: "rgba(6, 182, 212, 0.15)",
      text: "#67e8f9",
      border: "rgba(6, 182, 212, 0.3)",
    },
    attention: {
      bg: "rgba(244, 114, 182, 0.15)",
      text: "#f9a8d4",
      border: "rgba(244, 114, 182, 0.3)",
    },
    LLMs: {
      bg: "rgba(16, 185, 129, 0.15)",
      text: "#6ee7b7",
      border: "rgba(16, 185, 129, 0.3)",
    },
    quantization: {
      bg: "rgba(245, 158, 11, 0.15)",
      text: "#fcd34d",
      border: "rgba(245, 158, 11, 0.3)",
    },
    LoRA: {
      bg: "rgba(239, 68, 68, 0.15)",
      text: "#fca5a5",
      border: "rgba(239, 68, 68, 0.3)",
    },
    RAG: {
      bg: "rgba(99, 102, 241, 0.15)",
      text: "#c7d2fe",
      border: "rgba(99, 102, 241, 0.3)",
    },
    agents: {
      bg: "rgba(20, 184, 166, 0.15)",
      text: "#99f6e4",
      border: "rgba(20, 184, 166, 0.3)",
    },
    MCP: {
      bg: "rgba(236, 72, 153, 0.15)",
      text: "#f9a8d4",
      border: "rgba(236, 72, 153, 0.3)",
    },
    Evals: {
      bg: "rgba(34, 197, 94, 0.15)",
      text: "#bbf7d0",
      border: "rgba(34, 197, 94, 0.3)",
    },
    capstone: {
      bg: "rgba(251, 191, 36, 0.15)",
      text: "#fde68a",
      border: "rgba(251, 191, 36, 0.3)",
    },
  };

const defaultColor = {
  bg: "rgba(148, 163, 184, 0.1)",
  text: "#94a3b8",
  border: "rgba(148, 163, 184, 0.2)",
};

export default function TagBadge({ tag }: TagBadgeProps) {
  const colors = tagColors[tag] ?? defaultColor;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {tag}
    </span>
  );
}
