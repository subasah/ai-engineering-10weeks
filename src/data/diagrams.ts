export const weekDiagrams: Record<
  number,
  { flowchart: string; architecture: string }
> = {
  1: {
    flowchart: `flowchart LR
    A["📝 Raw Text"] --> B["✂️ Tokenizer\\n(BPE/WordPiece)"]
    B --> C["🔢 Token IDs\\n[1045, 2293, 3899...]"]
    C --> D["📐 Embedding Layer\\nToken ID → Vector"]
    D --> E["🧮 Input Vectors\\n768-4096 dims"]
    E --> F["🔍 Multi-Head\\nSelf-Attention"]
    F --> G["⚡ Feed-Forward\\nNetwork"]
    G --> H["📊 Layer Norm\\n× N blocks"]
    H --> I["🎯 Output Layer\\nLogits over vocab"]
    I --> J["🎲 Sampling\\n(temp, top-p, top-k)"]
    J --> K["✨ Generated Token"]
    K -->|"Next step"| E

    style A fill:#1e1b4b,color:#e2e8f0,stroke:#7c3aed
    style K fill:#064e3b,color:#e2e8f0,stroke:#10b981
    style F fill:#7c3aed,color:#fff,stroke:#8b5cf6
    style G fill:#7c3aed,color:#fff,stroke:#8b5cf6`,

    architecture: `flowchart TB
    subgraph PT["🏋️ Pre-Training (Self-Supervised)"]
      direction LR
      TT["Trillions of tokens\\n(Web, Books, Code)"] --> NTP["Next Token\\nPrediction"]
      NTP --> BM["Base Model\\n(GPT-4, Llama-3)"]
    end

    subgraph PostT["🎯 Post-Training (Alignment)"]
      direction LR
      BM --> SFT["SFT\\n(Supervised\\nFine-Tuning)"]
      SFT --> RM["Reward Model\\nTraining"]
      RM --> RLHF["RLHF / PPO\\nOptimization"]
      RLHF --> AM["Aligned Model\\n(ChatGPT, Claude)"]
    end

    subgraph Eval["📊 Evaluation"]
      direction LR
      AM --> BM2["MMLU\\n88%"]
      AM --> HE["HumanEval\\n67%"]
      AM --> MT["MT-Bench\\n8.2/10"]
    end

    style PT fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style PostT fill:#1a1f3c,stroke:#f472b6,color:#e2e8f0
    style Eval fill:#0c1a2e,stroke:#06b6d4,color:#e2e8f0`,
  },

  2: {
    flowchart: `flowchart TD
    START["🤔 I need a specialized AI capability"] --> Q1{"Is it about\\nknowledge?"}
    Q1 -->|"Yes"| Q2{"Does the knowledge\\nchange frequently?"}
    Q1 -->|"No — it's about\\nbehavior/style"| FT["✅ Fine-Tune\\n(LoRA/QLoRA)"]
    Q2 -->|"Yes (weekly/monthly)"| RAG["✅ Use RAG\\n(dynamic retrieval)"]
    Q2 -->|"No (stable domain)"| Q3{"Can prompting\\nachieve it reliably?"}
    Q3 -->|"Yes"| PROMPT["✅ Prompt Engineering\\n(cheapest, fastest)"]
    Q3 -->|"No — inconsistent"| FT2["✅ Fine-Tune\\n(stable knowledge)"]

    FT --> QLoRA["QLoRA if GPU\\nmemory limited"]
    FT --> LoRA["LoRA if moderate\\nGPU available"]

    style START fill:#1e1b4b,color:#e2e8f0,stroke:#7c3aed
    style RAG fill:#064e3b,color:#e2e8f0,stroke:#10b981
    style PROMPT fill:#1e3a5f,color:#e2e8f0,stroke:#06b6d4
    style FT fill:#4c1d95,color:#e2e8f0,stroke:#8b5cf6
    style FT2 fill:#4c1d95,color:#e2e8f0,stroke:#8b5cf6`,

    architecture: `flowchart LR
    subgraph FROZEN["❄️ Frozen Pre-Trained Weights (not updated)"]
      W["Weight Matrix W\\n4096 × 4096\\n= 16.7M params"]
    end

    subgraph LORA["🔥 LoRA Adapter (trainable, r=16)"]
      A["Matrix A\\n4096 × 16\\n= 65K params"] --> B["Matrix B\\n16 × 4096\\n= 65K params"]
    end

    X["📥 Input\\nActivation"] --> W
    X --> A

    W --> MERGE["➕ W + AB\\n(merged output)"]
    B --> MERGE
    MERGE --> Y["📤 Output"]

    NOTE["💡 LoRA trains only 130K params\\nvs 16.7M (128x reduction!)\\nQLoRA loads W in 4-bit NF4"]

    style FROZEN fill:#1a2035,stroke:#64748b,color:#94a3b8
    style LORA fill:#2d1b69,stroke:#7c3aed,color:#e2e8f0
    style NOTE fill:#0c1a2e,stroke:#f472b6,color:#f9a8d4`,
  },

  3: {
    flowchart: `flowchart LR
    subgraph INGEST["📥 Ingestion Pipeline (Offline)"]
      direction TB
      DOC["📄 Documents\\n(PDFs, Web, DBs)"] --> CHUNK["✂️ Chunker\\n(Parent-Child)"]
      CHUNK --> EMBED["🧮 Embedding Model\\n(BGE-M3, text-ada-3)"]
      EMBED --> VDB[("🗄️ Vector DB\\n(Qdrant/Weaviate)")]
    end

    subgraph QUERY["🔍 Query Pipeline (Real-Time)"]
      direction TB
      Q["❓ User Query"] --> QR["✏️ Query Rewriter\\n(multi-query)"]
      QR --> QE["🧮 Query Embedder"]
      QE --> ANN["⚡ ANN Search\\n(HNSW)"]
      VDB --> ANN
      ANN --> RERANK["🏆 Cross-Encoder\\nReranker (top-10→3)"]
      Q --> PROMPT["📝 Prompt Builder"]
      RERANK --> PROMPT
      PROMPT --> LLM["🤖 LLM\\n(GPT-4/Claude)"]
      LLM --> ANS["✅ Grounded Answer"]
    end

    style INGEST fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style QUERY fill:#1a1f3c,stroke:#f472b6,color:#e2e8f0`,

    architecture: `flowchart TD
    subgraph HNSW["⚡ HNSW — Hierarchical Navigable Small World"]
      direction TB
      L2["Layer 2 (coarse)\\n🔵——🔵——🔵"]
      L1["Layer 1 (medium)\\n🟣🟣——🟣🟣——🟣🟣"]
      L0["Layer 0 (fine, all nodes)\\n🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴"]
      L2 -->|"Navigate fast"| L1
      L1 -->|"Zoom in"| L0
    end

    Q2["Query Vector"] --> L2
    L0 --> RESULT["Top-K Nearest\\nNeighbors (98% recall)"]

    subgraph IVF["📦 IVF — Inverted File Index"]
      CLUSTER["K-Means Clusters\\n(Voronoi cells)"]
      CLUSTER --> SEARCH["Search only\\nnearby cells"]
    end

    NOTE2["HNSW: graph-based, best recall\\nIVF: cluster-based, smaller memory\\nIVF-PQ: compressed, scales to billions"]

    style HNSW fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style IVF fill:#1a2035,stroke:#06b6d4,color:#e2e8f0
    style NOTE2 fill:#0c1a2e,stroke:#f472b6,color:#f9a8d4`,
  },

  4: {
    flowchart: `flowchart TD
    USER["👤 User Message"] --> IG["🛡️ Input Guardrails"]
    IG --> PII["PII Detector\\n(mask SSN, emails)"]
    IG --> INJECT["Injection Classifier\\n(detect overrides)"]
    IG --> INTENT["Intent Classifier\\n(route or block)"]

    INTENT -->|"Safe & relevant"| QR["✏️ Query Rewriter"]
    INTENT -->|"Off-topic"| BLOCK["🚫 Blocked +\\nPolite Redirect"]
    INJECT -->|"Attack detected"| BLOCK

    QR --> RETRIEVE["🔍 RAG Retrieval\\n(hybrid search + rerank)"]
    RETRIEVE --> SCAN["🔎 Chunk Scanner\\n(remove injections in docs)"]
    SCAN --> LLM["🤖 LLM Generation"]
    LLM --> OG["✅ Output Guardrails"]
    OG --> FAITH["Faithfulness Check\\n(claims vs context)"]
    OG --> TOXIC["Toxicity Filter"]
    OG --> PIILEAK["PII Leakage Scan"]
    FAITH --> RESP["📤 Response to User"]

    style IG fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style OG fill:#1a1f3c,stroke:#10b981,color:#e2e8f0
    style BLOCK fill:#7f1d1d,stroke:#ef4444,color:#fca5a5`,

    architecture: `flowchart LR
    subgraph RAGAS["📊 RAGAS Evaluation Framework"]
      direction TB
      Q3["Test Question"] --> LLM2["Production LLM\\n+ RAG"]
      LLM2 --> RESP2["Model Response"]

      Q3 --> JUDGE["⚖️ Judge LLM\\n(GPT-4 / Claude)"]
      RESP2 --> JUDGE
      CTX["Retrieved Context"] --> JUDGE
      REF["Reference Answer"] --> JUDGE

      JUDGE --> F["Faithfulness\\n(0-1)"]
      JUDGE --> AR["Answer Relevancy\\n(0-1)"]
      JUDGE --> CP["Context Precision\\n(0-1)"]
      JUDGE --> CR["Context Recall\\n(0-1)"]
    end

    F --> DASH["📈 Eval Dashboard\\n& Regression Alerts"]
    AR --> DASH
    CP --> DASH
    CR --> DASH

    style RAGAS fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style DASH fill:#064e3b,stroke:#10b981,color:#e2e8f0`,
  },

  5: {
    flowchart: `flowchart TD
    GOAL["🎯 User Goal / Task"] --> THINK1["💭 THINK\\nAnalyze what's needed\\n& plan next action"]
    THINK1 --> ACT1["⚡ ACT\\nCall Tool / API\\n(search, DB, code)"]
    ACT1 --> OBS1["👁️ OBSERVE\\nParse tool result\\nUpdate context"]
    OBS1 --> CHECK{"🎯 Goal\\nAchieved?"}
    CHECK -->|"No — need more info"| THINK2["💭 THINK\\nReason about observation\\nplan next step"]
    THINK2 --> ACT2["⚡ ACT\\nNext tool call"]
    ACT2 --> OBS2["👁️ OBSERVE"]
    OBS2 --> CHECK
    CHECK -->|"Yes"| ANSWER["✅ Final Answer\\n(grounded in observations)"]
    CHECK -->|"Max steps reached"| FALLBACK["⚠️ Human Escalation\\nor Graceful Failure"]

    style THINK1 fill:#4c1d95,color:#e2e8f0,stroke:#8b5cf6
    style ACT1 fill:#831843,color:#e2e8f0,stroke:#f472b6
    style OBS1 fill:#1e3a5f,color:#e2e8f0,stroke:#06b6d4
    style ANSWER fill:#064e3b,color:#e2e8f0,stroke:#10b981
    style FALLBACK fill:#7f1d1d,color:#fca5a5,stroke:#ef4444`,

    architecture: `flowchart TB
    USER2["👤 User Request"] --> ORCH["🧠 Orchestrator Agent\\n(plans & coordinates)"]

    ORCH -->|"Search task"| SA["🔍 Search Agent\\n(RAG + web search)"]
    ORCH -->|"Data task"| DA["📊 Data Agent\\n(DB queries + analysis)"]
    ORCH -->|"Write task"| WA["✍️ Writing Agent\\n(content generation)"]
    ORCH -->|"Code task"| CA["💻 Code Agent\\n(generation + execution)"]

    SA --> TOOLS1["🔩 Tools:\\nVector DB, Web API"]
    DA --> TOOLS2["🔩 Tools:\\nSQL, CSV parser"]
    WA --> TOOLS3["🔩 Tools:\\nTemplate engine"]
    CA --> TOOLS4["🔩 Tools:\\nCode executor, linter"]

    SA --> ORCH
    DA --> ORCH
    WA --> ORCH
    CA --> ORCH

    ORCH --> RESP3["📤 Synthesized Response"]

    style ORCH fill:#4c1d95,color:#e2e8f0,stroke:#8b5cf6
    style SA fill:#1e1b4b,color:#e2e8f0,stroke:#7c3aed
    style DA fill:#1e1b4b,color:#e2e8f0,stroke:#7c3aed
    style WA fill:#1e1b4b,color:#e2e8f0,stroke:#7c3aed
    style CA fill:#1e1b4b,color:#e2e8f0,stroke:#7c3aed`,
  },

  6: {
    flowchart: `flowchart LR
    subgraph CTXWIN["📦 Context Window (128K tokens budget)"]
      direction TB
      SP["🔧 System Prompt\\n~2K tokens — always loaded"] 
      EP["💾 Episodic Memory\\n~4K tokens — retrieved by relevance"]
      SEM["🧠 Semantic Memory\\n~2K tokens — user facts & prefs"]
      HIST["💬 Recent History\\n~8K tokens — last N turns"]
      TOOLS["🔩 Tool Schemas\\n~2K tokens — available tools"]
      CTX2["📄 Retrieved Context\\n~8K tokens — RAG results"]
      QUERY["❓ Current Query\\n~1K tokens"]
    end

    SP & EP & SEM & HIST & TOOLS & CTX2 & QUERY --> LLM3["🤖 LLM\\n(uses entire context)"]
    LLM3 --> OUT["📤 Response +\\nMemory Updates"]
    OUT -->|"Save to episodic memory"| EP
    OUT -->|"Update semantic memory"| SEM

    style CTXWIN fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0`,

    architecture: `flowchart TB
    subgraph MCP["🔌 Model Context Protocol Architecture"]
      direction TB

      subgraph HOST["MCP Host (e.g. Claude Desktop)"]
        CLAUDE["🤖 Claude / LLM"]
        CLIENT["MCP Client\\n(manages connections)"]
        CLAUDE <-->|"tool calls &\\nresults"| CLIENT
      end

      subgraph SERVERS["MCP Servers (expose capabilities)"]
        FS["📁 Filesystem\\nMCP Server\\n(Tools + Resources)"]
        GH["🐙 GitHub\\nMCP Server\\n(Tools)"]
        DB["🗄️ Database\\nMCP Server\\n(Resources + Tools)"]
        SLACK["💬 Slack\\nMCP Server\\n(Tools)"]
      end

      CLIENT <-->|"stdio / HTTP+SSE"| FS
      CLIENT <-->|"stdio / HTTP+SSE"| GH
      CLIENT <-->|"stdio / HTTP+SSE"| DB
      CLIENT <-->|"stdio / HTTP+SSE"| SLACK
    end

    NOTE3["MCP Primitives:\\n🔩 Tools = callable functions\\n📂 Resources = file/DB access\\n📝 Prompts = reusable templates"]

    style HOST fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style SERVERS fill:#1a1f3c,stroke:#f472b6,color:#e2e8f0
    style NOTE3 fill:#0c1a2e,stroke:#06b6d4,color:#bae6fd`,
  },

  7: {
    flowchart: `flowchart LR
    subgraph BUILD["🏗️ Build Eval Suite (before coding)"]
      DS["📋 Dataset\\n(50-200 test cases)"]
      DS --> HP["Happy Path\\n(expected to work)"]
      DS --> EDGE["Edge Cases\\n(borderline inputs)"]
      DS --> ADV["Adversarial\\n(attempts to break)"]
    end

    subgraph RUN["🔬 Eval Pipeline (CI/CD)"]
      CHANGE["Code / Prompt / Config\\nChange"] --> RUN2["Run Eval Suite"]
      RUN2 --> SCORE["LLM Judge Scores:\\nFaithfulness, Relevancy,\\nSafety, Format"]
      SCORE --> COMPARE["Compare to Baseline"]
      COMPARE -->|"Better"| SHIP["✅ Ship"]
      COMPARE -->|"Regression"| BLOCK2["🚫 Block +\\nAlert Team"]
    end

    BUILD --> RUN

    style BUILD fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style RUN fill:#1a1f3c,stroke:#10b981,color:#e2e8f0
    style SHIP fill:#064e3b,color:#e2e8f0,stroke:#10b981
    style BLOCK2 fill:#7f1d1d,color:#fca5a5,stroke:#ef4444`,

    architecture: `flowchart TD
    subgraph JUDGE["⚖️ LLM-as-Judge System"]
      direction TB
      PROMPT2["Judge Prompt:\\nQuestion: {Q}\\nReference: {REF}\\nResponse: {RESP}\\n\\nRate accuracy 1-5.\\nExplain your reasoning."]
      PROMPT2 --> JMODEL["Judge LLM\\n(GPT-4 / Claude Opus)"]
      JMODEL --> SCORE2["Score: 4/5\\nReasoning: The response\\ncorrectly states X but\\nomits important detail Y"]
    end

    SCORE2 --> AGG["📊 Aggregate Metrics\\nover 200 test cases"]
    AGG --> DRIFT["📈 Trend Monitor\\n(weekly)"]
    AGG --> ALERT["🔔 Regression Alert\\n(if drop > 5%)"]

    CALIB["📐 Calibration Step:\\nValidate judge vs\\n100 human ratings\\n(κ > 0.7 required)"] --> JMODEL

    style JUDGE fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style CALIB fill:#451a03,stroke:#f59e0b,color:#fef3c7`,
  },

  8: {
    flowchart: `flowchart LR
    subgraph DIST["🌐 Distributed Agentic System"]
      direction TB
      LB["⚖️ Load Balancer"] --> W1["🤖 Agent Worker 1"]
      LB --> W2["🤖 Agent Worker 2"]
      LB --> W3["🤖 Agent Worker N"]

      W1 & W2 & W3 <-->|"read/write state"| STORE["💾 Shared State Store\\n(Redis / PostgreSQL)"]
      W1 & W2 & W3 -->|"enqueue tasks"| QUEUE["📬 Task Queue\\n(Temporal / Celery)"]
      QUEUE -->|"schedule"| W1 & W2 & W3
    end

    USER3["👤 Requests"] --> LB
    W1 & W2 & W3 -->|"structured logs"| OBS["🔭 Observability\\n(OTel traces, metrics)"]

    style DIST fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style OBS fill:#0c1a2e,stroke:#06b6d4,color:#bae6fd`,

    architecture: `flowchart TD
    subgraph PROD["🚀 Production Agentic Architecture"]
      direction TB

      GW["🌐 API Gateway\\n(rate limiting, auth)"]
      GW --> ORCH2["🧠 Orchestrator\\n(stateless, scales horizontally)"]

      ORCH2 --> TOOLS5["🔩 Tool Execution Layer\\n(idempotency keys, circuit breakers)"]
      TOOLS5 --> EXT["External APIs, DBs,\\nMCP Servers"]

      ORCH2 <-->|"state r/w"| REDIS["⚡ Redis\\n(working state, KV cache)"]
      ORCH2 <-->|"history"| PG["🐘 PostgreSQL\\n(episodic memory, audit log)"]
      ORCH2 <-->|"retrieval"| VDB2["🗄️ Vector DB\\n(semantic search)"]

      ORCH2 --> LLM4["🤖 LLM API\\n(+ fallback model)"]
    end

    PROD --> OTEL["📊 OpenTelemetry\\n(traces + metrics + logs)"]

    style PROD fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style OTEL fill:#064e3b,stroke:#10b981,color:#e2e8f0`,
  },

  9: {
    flowchart: `flowchart LR
    subgraph CLIP_TRAIN["🎯 CLIP Contrastive Training"]
      direction TB
      IMG["🖼️ Image\\n(cat photo)"] --> VENC["ViT Image Encoder"]
      TXT["📝 Caption\\n'a fluffy cat'"] --> TENC["Text Transformer"]
      VENC --> IVEC["Image Vector\\n[0.2, 0.8, -0.1...]"]
      TENC --> TVEC["Text Vector\\n[0.21, 0.79, -0.09...]"]
      IVEC & TVEC --> LOSS["Contrastive Loss:\\nMaximize similarity for\\nmatched pairs\\nMinimize for unmatched"]
    end

    subgraph ZERO_SHOT["🚀 Zero-Shot Classification"]
      direction TB
      QIMG["🖼️ Query Image"] --> VENC2["ViT Encoder"]
      LABELS["Labels:\\n'cat' / 'dog' / 'car'"] --> TENC2["Text Encoder × 3"]
      VENC2 --> SIM["Cosine Similarity"]
      TENC2 --> SIM
      SIM --> PRED["Prediction:\\n'cat' (0.94)"]
    end

    style CLIP_TRAIN fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style ZERO_SHOT fill:#1a1f3c,stroke:#10b981,color:#e2e8f0`,

    architecture: `flowchart LR
    subgraph DIFF["🎨 Stable Diffusion — Latent Diffusion"]
      direction TB

      subgraph FWD["Forward Process (training only)"]
        CLEAN["🖼️ Clean Image\\nx₀"] -->|"add noise T steps"| NOISE["🌫️ Pure Gaussian\\nNoise xₜ"]
      end

      subgraph REV["Reverse Process (inference)"]
        NSTART["🌫️ Random Noise\\nStart"] -->|"step t=T"| UNET1["U-Net\\n(predict noise ε)"]
        UNET1 -->|"subtract noise"| STEP1["Slightly cleaner\\nxₜ₋₁"]
        STEP1 -->|"repeat T times"| FINAL["🖼️ Generated Image"]
        PROMPT4["📝 Text Prompt\\n(CLIP encoded)"] -->|"condition"| UNET1
      end

      subgraph LATENT["💡 Latent Space Trick"]
        direction LR
        IMG2["Full Image\\n512×512×3"] --> VAE_E["VAE Encoder"]
        VAE_E --> LAT["Latent\\n64×64×4 (8x smaller!)"]
        LAT --> DIFF2["Diffuse in\\nlatent space"]
        DIFF2 --> VAE_D["VAE Decoder"]
        VAE_D --> OUT2["Final Image"]
      end
    end

    style FWD fill:#1a2035,stroke:#64748b,color:#94a3b8
    style REV fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style LATENT fill:#0c1a2e,stroke:#f472b6,color:#f9a8d4`,
  },

  10: {
    flowchart: `flowchart TD
    IDEA["💡 Project Idea"] --> SCORE{"Score on\\n4 Dimensions"}
    SCORE --> IMP["📈 Impact\\n(business value 1-5)"]
    SCORE --> FEAS["🔧 Feasibility\\n(data, compute, skill 1-5)"]
    SCORE --> MEAS["📏 Measurability\\n(clear metrics? 1-5)"]
    SCORE --> FIT["🤖 LLM Fit\\n(needs LLM? 1-5)"]

    IMP & FEAS & MEAS & FIT --> TOTAL["Total Score / 20"]
    TOTAL -->|"≥ 14"| BUILD["✅ Build It!"]
    TOTAL -->|"10-13"| REFINE["🔄 Refine the Idea"]
    TOTAL -->|"< 10"| REJECT["❌ Choose a Different Problem"]

    BUILD --> EVAL_FIRST["📋 Define Eval Metrics\\nBEFORE writing code"]
    EVAL_FIRST --> ARCH["📐 Architecture Design\\n(ADR document)"]
    ARCH --> MVP["⚡ Build MVP"]
    MVP --> RUN_EVALS["🔬 Run Eval Suite"]
    RUN_EVALS --> PROD_READY["🚀 Production Ready?"]

    style BUILD fill:#064e3b,color:#e2e8f0,stroke:#10b981
    style REJECT fill:#7f1d1d,color:#fca5a5,stroke:#ef4444
    style EVAL_FIRST fill:#4c1d95,color:#e2e8f0,stroke:#8b5cf6`,

    architecture: `flowchart TB
    subgraph PROD_AI["🚀 Production AI System — Full Architecture"]
      direction TB

      subgraph INPUT["📥 Input Layer"]
        FE["Frontend / API"]
        IG2["Input Guardrails\\n(PII, injection, intent)"]
        FE --> IG2
      end

      subgraph BRAIN["🧠 Intelligence Layer"]
        ROUTER["Intent Router"]
        RAG2["RAG Pipeline\\n(retrieval + rerank)"]
        AGENT2["Agent Orchestrator\\n(if multi-step)"]
        LLM5["LLM\\n(generation)"]
        IG2 --> ROUTER
        ROUTER --> RAG2
        ROUTER --> AGENT2
        RAG2 --> LLM5
        AGENT2 --> LLM5
      end

      subgraph DATA["💾 Data Layer"]
        VDB3[("Vector DB")]
        SQL[("SQL DB")]
        CACHE[("Cache (Redis)")]
        RAG2 <--> VDB3
        AGENT2 <--> SQL
        LLM5 <--> CACHE
      end

      subgraph OUTPUT["📤 Output Layer"]
        OG2["Output Guardrails\\n(faithfulness, PII, toxicity)"]
        LLM5 --> OG2
      end
    end

    PROD_AI --> OBS2["🔭 Observability Stack\\n(OTel, LLM traces, RAGAS evals)"]

    style INPUT fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style BRAIN fill:#1a1f3c,stroke:#8b5cf6,color:#e2e8f0
    style DATA fill:#0c1a2e,stroke:#06b6d4,color:#bae6fd
    style OUTPUT fill:#1a2035,stroke:#10b981,color:#e2e8f0`,
  },
};
