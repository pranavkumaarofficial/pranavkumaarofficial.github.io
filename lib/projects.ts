export interface Project {
  id: string
  title: string
  subtitle: string
  date: string
  category: 'work' | 'research' | 'independent'
  description: string
  tags: string[]
  featured: boolean
  href?: string
}

export const projects: Project[] = [
  {
    id: 'channel-ai',
    title: 'Channel AI',
    subtitle: 'Conversational Business Intelligence Platform',
    date: 'Nov 2023 – Dec 2024',
    category: 'independent',
    description: 'Built a conversational BI platform enabling non-technical users to query enterprise data via natural language. Reduced reporting turnaround from ~2 days to under 30 minutes.',
    tags: ['LangGraph', 'OpenAI Agents SDK', 'Apache Iceberg', 'RAG', 'LlamaIndex', 'Qdrant', 'WhatsApp API'],
    featured: true,
  },
  {
    id: 'onesku',
    title: 'OneSKU',
    subtitle: 'Hybrid BM25 + Embedding Retrieval System',
    date: 'Jan 2022 – Jan 2024',
    category: 'work',
    description: 'Developed a hybrid retrieval system with custom harmonization pipeline for aligning heterogeneous vendor catalogs. Achieved sub-15s query latency across multi-million SKU inventories.',
    tags: ['PyTorch', 'BM25', 'BERT', 'Embeddings', 'Python', 'Semantic Search'],
    featured: true,
  },
  {
    id: 'est-service',
    title: 'EST Certificate Management Service',
    subtitle: 'Production PKI Infrastructure @ Baxter',
    date: 'Feb 2024 – Present',
    category: 'work',
    description: 'Led end-to-end development of a production-ready EST certificate-management service enabling automated certificate issuance and rotation across internal microservices.',
    tags: ['Python', 'PKI/EST', 'Docker', 'Kubernetes', 'OAuth2/Keycloak', 'PostgreSQL'],
    featured: true,
  },
  {
    id: 'kg-rag-research',
    title: 'When Graph Structure Hurts',
    subtitle: 'Lightweight Path Ranking for Dense KG-RAG',
    date: 'ICMLC 2026 (Accepted)',
    category: 'research',
    description: 'Developed a KG-augmented RAG pipeline for dense academic citation graphs. Demonstrated that simple MLP-based scorer achieves 93.9% AUC—outperforming GCN and GAT models while using 13× fewer parameters.',
    tags: ['Knowledge Graphs', 'RAG', 'PyTorch', 'GNN', 'Research'],
    featured: true,
  },
  {
    id: 'sustify',
    title: 'Sustify',
    subtitle: 'AI-Driven Sustainability Marketplace',
    date: 'Jan 2022 – Jan 2024',
    category: 'independent',
    description: 'Founded an AI-driven sustainability marketplace applying transformer-based embeddings for automated requirement matching and vendor recommendations.',
    tags: ['BERT', 'OpenAI Embeddings', 'Python', 'Startup', 'Sustainability'],
    featured: true,
  },
  {
    id: 'pesu-venture-labs',
    title: 'PESU Venture Labs',
    subtitle: 'Applied AI Developer Experience',
    date: 'Jan 2022 – Jan 2024',
    category: 'work',
    description: 'Delivered applied AI/ML solutions for external clients in a university-affiliated incubator, building production-ready pipelines across computer vision, semantic search, and generative AI use cases.',
    tags: ['PyTorch', 'YOLO', 'OpenCV', 'LlamaIndex', 'Computer Vision', 'Applied AI'],
    featured: true,
  },
]

export const timeline = [
  {
    year: '2024 - Present',
    title: 'Software Engineer I',
    company: 'Baxter International',
    location: 'Bangalore, India',
    description: 'Enterprise Interoperability & Cybersecurity',
    projects: ['est-service'],
  },
  {
    year: '2023 - 2024',
    title: 'Independent Project',
    company: 'Channel AI',
    location: 'Self-Driven',
    description: 'Conversational Business Intelligence Platform',
    projects: ['channel-ai'],
  },
  {
    year: '2022 - 2024',
    title: 'Applied AI Developer',
    company: 'PESU Venture Labs',
    location: 'Bangalore, India',
    description: 'University-Affiliated Incubator',
    projects: ['onesku', 'sustify', 'pesu-venture-labs'],
  },
  {
    year: '2026',
    title: 'Research Publication',
    company: 'ICMLC 2026',
    location: 'Conference',
    description: 'Accepted for Presentation (Feb 2026)',
    projects: ['kg-rag-research'],
  },
]
