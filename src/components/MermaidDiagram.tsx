import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

function initMermaid() {
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      darkMode: true,
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: 13,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis",
      },
      themeVariables: {
        primaryColor: "#2d1b69",
        primaryTextColor: "#e2e8f0",
        primaryBorderColor: "#7c3aed",
        lineColor: "#8b5cf6",
        secondaryColor: "#1a1f3c",
        tertiaryColor: "#13162a",
        background: "#0d0f1e",
        mainBkg: "#1e1b4b",
        nodeBorder: "#7c3aed",
        clusterBkg: "#13162a",
        clusterBorder: "#4c1d95",
        titleColor: "#f472b6",
        edgeLabelBackground: "#1a1f3c",
        nodeTextColor: "#e2e8f0",
        fontFamily: "Inter, system-ui, sans-serif",
      },
    });
    initialized = true;
  }
}

interface MermaidDiagramProps {
  chart: string;
  id: string;
  title?: string;
}

export default function MermaidDiagram({
  chart,
  id,
  title,
}: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      initMermaid();
      setLoading(true);
      setError(null);

      if (!containerRef.current) return;

      try {
        const diagramId = `mermaid-${id}-${Date.now()}`;
        const { svg } = await mermaid.render(diagramId, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          // Make SVG responsive
          const svgEl = containerRef.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.maxWidth = "100%";
            svgEl.style.height = "auto";
            svgEl.removeAttribute("height");
          }
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(`Diagram rendering error`);
          setLoading(false);
          console.error("Mermaid error:", err);
        }
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #13162a 0%, #1a1f3c 100%)",
        border: "1px solid rgba(124, 58, 237, 0.2)",
      }}
    >
      {title && (
        <div
          className="px-5 py-3 border-b flex items-center gap-2"
          style={{ borderColor: "rgba(124, 58, 237, 0.15)" }}
        >
          <span className="text-purple-400 text-sm font-medium">{title}</span>
        </div>
      )}
      {loading && !error && (
        <div
          className="flex items-center justify-center py-12 gap-3"
          style={{ color: "#a78bfa" }}
        >
          <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          <span className="text-sm">Rendering diagram…</span>
        </div>
      )}
      {error && (
        <div className="p-4 text-center text-sm text-red-400">
          {error}
          <pre className="mt-2 text-xs text-gray-500 text-left overflow-x-auto whitespace-pre-wrap">
            {chart}
          </pre>
        </div>
      )}
      <div
        ref={containerRef}
        className="mermaid-container p-4 overflow-x-auto"
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );
}
