export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface ChartConfig {
  title: string;
  description: string;
  data: ChartDataPoint[];
  bars: { key: string; color: string; label: string }[];
}

export const weekCharts: Record<number, ChartConfig> = {
  1: {
    title: "LLM Benchmark Performance Across Model Families",
    description:
      "Illustrative benchmark scores — MMLU measures general knowledge, HumanEval measures code generation ability",
    data: [
      { name: "GPT-3.5", MMLU: 70, HumanEval: 48, MTBench: 7.9 },
      { name: "Llama-3 8B", MMLU: 66, HumanEval: 62, MTBench: 8.0 },
      { name: "GPT-4", MMLU: 86, HumanEval: 67, MTBench: 8.96 },
      { name: "Claude 3 Opus", MMLU: 86, HumanEval: 84, MTBench: 9.0 },
      { name: "GPT-4o", MMLU: 88, HumanEval: 90, MTBench: 9.1 },
      { name: "Gemini 1.5 Pro", MMLU: 85, HumanEval: 71, MTBench: 8.9 },
    ],
    bars: [
      { key: "MMLU", color: "#7c3aed", label: "MMLU (%)" },
      { key: "HumanEval", color: "#f472b6", label: "HumanEval (%)" },
      { key: "MTBench", color: "#06b6d4", label: "MT-Bench (/10)" },
    ],
  },

  2: {
    title: "Quantization: Accuracy vs Memory Reduction",
    description:
      "Trade-off between model accuracy and GPU memory savings at different precision levels",
    data: [
      { name: "FP32", accuracy: 100, memoryGB: 28, speedup: 1 },
      { name: "BF16", accuracy: 99.5, memoryGB: 14, speedup: 2 },
      { name: "FP16", accuracy: 99.2, memoryGB: 14, speedup: 2.2 },
      { name: "INT8", accuracy: 97.5, memoryGB: 7, speedup: 4 },
      { name: "INT4/NF4", accuracy: 95, memoryGB: 3.5, speedup: 6 },
      { name: "INT2", accuracy: 88, memoryGB: 1.75, speedup: 8 },
    ],
    bars: [
      { key: "accuracy", color: "#7c3aed", label: "Accuracy (%)" },
      { key: "speedup", color: "#10b981", label: "Speedup (×)" },
    ],
  },

  3: {
    title: "ANN Algorithm: Recall vs Query Speed",
    description:
      "Trade-off between retrieval accuracy (recall) and queries per second for vector search algorithms",
    data: [
      { name: "Exact KNN", recall: 100, qps: 120, memory: 100 },
      { name: "IVF-Flat", recall: 95, qps: 1800, memory: 105 },
      { name: "HNSW", recall: 98, qps: 6000, memory: 160 },
      { name: "IVF-PQ", recall: 88, qps: 9500, memory: 18 },
      { name: "ScaNN", recall: 97, qps: 8000, memory: 130 },
    ],
    bars: [
      { key: "recall", color: "#7c3aed", label: "Recall@10 (%)" },
      { key: "qps", color: "#f472b6", label: "Queries/sec (÷100)" },
    ],
  },

  4: {
    title: "RAGAS Scores: Baseline vs Optimized RAG Pipeline",
    description:
      "Impact of each optimization technique on RAGAS evaluation metrics",
    data: [
      {
        name: "Baseline RAG",
        faithfulness: 0.62,
        relevancy: 0.71,
        precision: 0.55,
        recall: 0.68,
      },
      {
        name: "+ Query Rewrite",
        faithfulness: 0.64,
        relevancy: 0.73,
        precision: 0.57,
        recall: 0.79,
      },
      {
        name: "+ Reranker",
        faithfulness: 0.67,
        relevancy: 0.75,
        precision: 0.74,
        recall: 0.8,
      },
      {
        name: "+ Hybrid Search",
        faithfulness: 0.69,
        relevancy: 0.77,
        precision: 0.76,
        recall: 0.88,
      },
      {
        name: "+ Parent-Child",
        faithfulness: 0.82,
        relevancy: 0.79,
        precision: 0.78,
        recall: 0.89,
      },
    ],
    bars: [
      { key: "faithfulness", color: "#7c3aed", label: "Faithfulness" },
      { key: "relevancy", color: "#f472b6", label: "Answer Relevancy" },
      { key: "precision", color: "#06b6d4", label: "Context Precision" },
      { key: "recall", color: "#10b981", label: "Context Recall" },
    ],
  },

  5: {
    title: "Agent Performance: Task Success Rate by Complexity",
    description:
      "How agent systems perform on tasks of increasing complexity (steps required)",
    data: [
      { name: "1-Step Tasks", LLM: 92, Agent: 95, MultiAgent: 95 },
      { name: "3-Step Tasks", LLM: 64, Agent: 88, MultiAgent: 90 },
      { name: "5-Step Tasks", LLM: 31, Agent: 76, MultiAgent: 85 },
      { name: "8-Step Tasks", LLM: 12, Agent: 55, MultiAgent: 78 },
      { name: "12+ Step Tasks", LLM: 4, Agent: 32, MultiAgent: 67 },
    ],
    bars: [
      { key: "LLM", color: "#64748b", label: "Plain LLM" },
      { key: "Agent", color: "#7c3aed", label: "Single Agent" },
      { key: "MultiAgent", color: "#f472b6", label: "Multi-Agent" },
    ],
  },

  6: {
    title: "Context Window Utilization: Token Cost Reduction",
    description:
      "How context engineering techniques reduce token usage while maintaining response quality",
    data: [
      { name: "Naive (all history)", tokensK: 80, quality: 72, costUSD: 100 },
      { name: "+ Summarization", tokensK: 42, quality: 74, costUSD: 53 },
      { name: "+ Episodic Retrieval", tokensK: 28, quality: 82, costUSD: 35 },
      { name: "+ Semantic Memory", tokensK: 22, quality: 88, costUSD: 27 },
      { name: "Full Optimization", tokensK: 18, quality: 91, costUSD: 22 },
    ],
    bars: [
      { key: "tokensK", color: "#f472b6", label: "Tokens Used (K)" },
      { key: "quality", color: "#10b981", label: "Response Quality (%)" },
    ],
  },

  7: {
    title: "Approach Comparison: Quality vs Cost per Query",
    description:
      "Relative quality score and cost for different AI development approaches",
    data: [
      { name: "Prompting Only", quality: 62, costCents: 0.2, speed: 95 },
      { name: "Few-Shot Prompting", quality: 74, costCents: 0.4, speed: 90 },
      { name: "RAG", quality: 85, costCents: 1.2, speed: 75 },
      { name: "Fine-Tuned SLM", quality: 82, costCents: 0.05, speed: 98 },
      { name: "RAG + Fine-Tune", quality: 94, costCents: 0.8, speed: 80 },
    ],
    bars: [
      { key: "quality", color: "#7c3aed", label: "Quality Score (%)" },
      { key: "speed", color: "#10b981", label: "Speed Score (%)" },
    ],
  },

  8: {
    title: "Agent System Scalability: Throughput vs Worker Count",
    description:
      "How stateless agent workers scale with horizontal additions (near-linear scaling)",
    data: [
      { name: "1 Worker", rps: 8, p95ms: 1200, errorPct: 0.1 },
      { name: "4 Workers", rps: 31, p95ms: 1250, errorPct: 0.1 },
      { name: "8 Workers", rps: 62, p95ms: 1280, errorPct: 0.12 },
      { name: "16 Workers", rps: 120, p95ms: 1310, errorPct: 0.15 },
      { name: "32 Workers", rps: 228, p95ms: 1350, errorPct: 0.18 },
      { name: "64 Workers", rps: 420, p95ms: 1420, errorPct: 0.22 },
    ],
    bars: [
      { key: "rps", color: "#7c3aed", label: "Requests/sec" },
      { key: "errorPct", color: "#ef4444", label: "Error Rate (%)" },
    ],
  },

  9: {
    title: "Multimodal Model Coverage: Supported Input/Output Modalities",
    description:
      "Capabilities of different model families across text, image, audio, and video modalities",
    data: [
      {
        name: "GPT-4 Turbo",
        text: 100,
        image: 90,
        audio: 0,
        video: 0,
        code: 95,
      },
      { name: "GPT-4o", text: 100, image: 95, audio: 90, video: 30, code: 95 },
      {
        name: "Claude 3.5 Sonnet",
        text: 100,
        image: 92,
        audio: 0,
        video: 0,
        code: 90,
      },
      {
        name: "Gemini 1.5 Pro",
        text: 100,
        image: 95,
        audio: 80,
        video: 85,
        code: 88,
      },
      { name: "LLaVA-1.6", text: 90, image: 85, audio: 0, video: 0, code: 60 },
    ],
    bars: [
      { key: "text", color: "#7c3aed", label: "Text" },
      { key: "image", color: "#f472b6", label: "Image" },
      { key: "audio", color: "#06b6d4", label: "Audio" },
      { key: "video", color: "#10b981", label: "Video" },
    ],
  },

  10: {
    title: "AI Maturity Model: Capability vs Deployment Complexity",
    description:
      "The progression from simple LLM calls to fully autonomous production AI systems",
    data: [
      { name: "Simple QA", capability: 30, complexity: 10, risk: 15 },
      { name: "RAG System", capability: 55, complexity: 35, risk: 30 },
      { name: "Single Agent", capability: 70, complexity: 55, risk: 45 },
      { name: "Multi-Agent", capability: 85, complexity: 75, risk: 60 },
      { name: "Autonomous System", capability: 95, complexity: 90, risk: 80 },
    ],
    bars: [
      { key: "capability", color: "#10b981", label: "Capability Score" },
      { key: "complexity", color: "#f472b6", label: "Deployment Complexity" },
      { key: "risk", color: "#ef4444", label: "Risk Level" },
    ],
  },
};
