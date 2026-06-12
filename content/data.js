/* =================================================================
   ALL SITE CONTENT LIVES HERE.
   To add a project: add an object to `projects`, drop a markdown
   file in content/projects/<slug>.md, optionally add a thumbnail
   to assets/thumbs/. That's it.
   To add an article: add an object to `writing`.
   ================================================================= */

const SITE = {
  name: "Pranav Kumaar",
  role: "Software Engineer · AI/ML Systems",
  intro:
    "I build LLM orchestration, retrieval systems, and production ML infrastructure. Starting my MS in Computer Science at UMass Amherst, Fall 2026. Based in Bangalore, India.",
  email: "pranavkumaarofficial@gmail.com",
  github: "https://github.com/pranavkumaarofficial",
  linkedin: "https://linkedin.com/in/pranavkumaarofficial",
  resume: "assets/resume.pdf", // drop your resume PDF at this path
};

const PROJECTS = [
  {
    slug: "channel-ai",
    title: "Channel AI",
    subtitle: "Conversational business intelligence platform",
    summary:
      "Lets non-technical users query enterprise data in natural language. Cut reporting turnaround from ~2 days to under 30 minutes.",
    tags: ["LangGraph", "OpenAI Agents SDK", "Apache Iceberg", "RAG"],
    thumb: "assets/thumbs/channel-ai.svg",
    repo: "https://github.com/pranavkumaarofficial", // replace with repo URL
    featured: true,
  },
  {
    slug: "kg-rag-research",
    title: "When Graph Structure Hurts",
    subtitle: "Lightweight path ranking for dense KG-RAG · ICMLC 2026",
    summary:
      "A simple MLP scorer hits 93.9% AUC on dense citation graphs — beating GCN and GAT with 13× fewer parameters.",
    tags: ["Knowledge Graphs", "RAG", "PyTorch", "GNN"],
    thumb: "assets/thumbs/kg-rag.svg",
    repo: "",
    featured: true,
  },
  {
    slug: "onesku",
    title: "OneSKU",
    subtitle: "Hybrid BM25 + embedding retrieval",
    summary:
      "Hybrid retrieval with a custom harmonization pipeline for heterogeneous vendor catalogs. Sub-15s queries across multi-million SKU inventories.",
    tags: ["PyTorch", "BM25", "BERT", "Embeddings"],
    thumb: "assets/thumbs/onesku.svg",
    repo: "",
    featured: true,
  },
  {
    slug: "est-service",
    title: "EST Certificate Management",
    subtitle: "Production PKI infrastructure",
    summary:
      "Led end-to-end development of an EST service for automated certificate issuance and rotation across internal microservices.",
    tags: ["Python", "PKI / EST", "Docker", "Kubernetes"],
    thumb: "assets/thumbs/est.svg",
    repo: "",
    featured: true,
  },
  {
    slug: "sustify",
    title: "Sustify",
    subtitle: "AI-driven sustainability marketplace",
    summary:
      "Founded a marketplace using transformer embeddings for automated requirement matching and vendor recommendations.",
    tags: ["BERT", "OpenAI Embeddings", "Python"],
    thumb: "assets/thumbs/sustify.svg",
    repo: "",
    featured: true,
  },
  {
    slug: "pesu-venture-labs",
    title: "PESU Venture Labs",
    subtitle: "Applied AI for external clients",
    summary:
      "Production pipelines across computer vision, semantic search, and generative AI in a university-affiliated incubator.",
    tags: ["PyTorch", "YOLO", "OpenCV", "LlamaIndex"],
    thumb: "assets/thumbs/pvl.svg",
    repo: "",
    featured: true,
  },
];

const EXPERIENCE = [
  {
    when: "2024 – 2026",
    title: "Software Engineer I",
    where: "Enterprise healthcare technology · Bangalore",
    desc: "Enterprise interoperability and cybersecurity. Built production PKI/EST certificate infrastructure. Company details on LinkedIn.",
    link: "project.html?p=est-service",
  },
  {
    when: "2022 – 2024",
    title: "Applied AI Developer",
    where: "PESU Venture Labs · Bangalore",
    desc: "Shipped applied AI/ML for external clients: computer vision, semantic search, generative AI.",
    link: "project.html?p=pesu-venture-labs",
  },
];

const EDUCATION = [
  {
    when: "2026 – 2028",
    title: "MS, Computer Science",
    where: "University of Massachusetts Amherst",
    desc: "Incoming Fall 2026.",
  },
  {
    when: "2026",
    title: "Research publication · ICMLC 2026",
    where: "Accepted for presentation, Feb 2026",
    desc: "When Graph Structure Hurts: Lightweight Path Ranking for Dense KG-RAG.",
    link: "project.html?p=kg-rag-research",
  },
];

const WRITING = [
  // Add Medium articles here:
  // { when: "Jun 2026", title: "Article title", where: "Medium", link: "https://medium.com/@you/..." },
];

const SKILLS = [
  { label: "Languages", items: "Python, TypeScript, SQL, Bash" },
  { label: "ML / LLM", items: "PyTorch, LangGraph, RAG, embeddings, BM25, GNNs, OpenAI Agents SDK" },
  { label: "Infrastructure", items: "Docker, Kubernetes, Apache Iceberg, PKI/EST, CI/CD" },
  { label: "Focus areas", items: "LLM orchestration, retrieval systems, production ML infrastructure" },
];
