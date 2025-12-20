export const metadata = {
  title: 'When Graph Structure Hurts - Research Publication | Pranav Kumaar Sridhar',
  description: 'ICMLC 2026 accepted paper on lightweight path ranking for dense knowledge graph RAG systems.',
}

export default function KGRAGResearchPage() {
  return (
    <div className="max-w-[680px] mx-auto px-6">
      <header className="mb-12">
        <p className="text-sm text-medium-gray uppercase tracking-wide mb-4">
          Research Publication · ICMLC 2026 (Accepted, to be presented Feb 2026)
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          When Graph Structure Hurts
        </h1>
        <p className="text-2xl text-medium-gray leading-relaxed">
          Lightweight Path Ranking for Dense KG-RAG
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-medium-border">
        {['Knowledge Graphs', 'RAG', 'PyTorch', 'GNN', 'MLP', 'Graph Neural Networks', 'Research'].map((tech) => (
          <span key={tech} className="px-3 py-1 bg-medium-light text-sm text-medium-gray rounded-full">
            {tech}
          </span>
        ))}
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Abstract</h2>
        <p>
          Knowledge Graph-augmented Retrieval-Augmented Generation (KG-RAG) systems have emerged as a powerful approach for question answering over structured knowledge. The conventional wisdom suggests that Graph Neural Networks (GNNs) should excel at ranking paths in knowledge graphs due to their ability to aggregate neighborhood information.
        </p>

        <p>
          However, our research demonstrates a counterintuitive finding: <strong>in dense academic citation graphs with high entity overlap, simple MLP-based scorers outperform complex GNN architectures while using 13× fewer parameters.</strong>
        </p>

        <p>
          This paper was accepted to ICMLC 2026 and will be presented in February 2026.
        </p>

        <h2>The Research Question</h2>

        <p>
          Knowledge graph RAG systems typically follow a two-stage process:
        </p>

        <ol>
          <li><strong>Path Discovery</strong>: Find potential paths in the KG connecting query entities to candidate answers</li>
          <li><strong>Path Ranking</strong>: Score and rank these paths by relevance</li>
        </ol>

        <p>
          For path ranking, GNNs (Graph Convolutional Networks and Graph Attention Networks) are the popular choice. They're designed to leverage graph structure by aggregating information from neighboring nodes.
        </p>

        <p>
          But what if the graph is <em>too dense</em>? What if nearly every entity connects to nearly every other entity through short paths? Does graph structure still help, or does it become noise?
        </p>

        <h2>Experimental Setup</h2>

        <h3>Dataset: Dense Academic Citation Graph</h3>

        <p>
          I constructed a knowledge graph from academic papers in machine learning and NLP:
        </p>

        <ul>
          <li><strong>3,215 papers</strong> spanning 2010-2023</li>
          <li><strong>85.8% entity overlap</strong> (most papers cite many of the same foundational works)</li>
          <li><strong>784 test queries</strong> covering various types of paper relationships</li>
        </ul>

        <p>
          The key characteristic: this graph is <em>dense</em>. Most papers are connected through citation paths of length 2 or 3. This density is representative of real-world academic KGs where foundational papers create hub nodes.
        </p>

        <h3>Models Compared</h3>

        <p>
          I compared three path ranking approaches:
        </p>

        <ol>
          <li><strong>MLP Scorer</strong>: Simple feedforward network operating on path features (length, relation types, node features)</li>
          <li><strong>GCN (Graph Convolutional Network)</strong>: Multi-layer GCN aggregating neighborhood information</li>
          <li><strong>GAT (Graph Attention Network)</strong>: Attention-based GNN that learns to weight neighbors dynamically</li>
        </ol>

        <h3>Evaluation Metrics</h3>

        <ul>
          <li><strong>AUC (Area Under ROC Curve)</strong>: Primary metric for ranking quality</li>
          <li><strong>MRR (Mean Reciprocal Rank)</strong>: Measures how quickly correct paths are ranked</li>
          <li><strong>Parameter Count</strong>: Model complexity and inference cost</li>
        </ul>

        <h2>Key Findings</h2>

        <div className="bg-medium-light p-6 rounded-lg my-8">
          <h3 className="mt-0">Main Results</h3>
          <ul className="mb-0">
            <li><strong>MLP Scorer</strong>: 93.9% AUC, 180K parameters</li>
            <li><strong>GCN</strong>: 90.8% AUC, 2.4M parameters</li>
            <li><strong>GAT</strong>: 87.4% AUC, 3.1M parameters</li>
          </ul>
          <p className="mt-4 mb-0 text-medium-gray text-sm">
            Simple MLP outperforms complex GNNs while using 13× fewer parameters
          </p>
        </div>

        <h3>Why Do GNNs Fail in Dense Graphs?</h3>

        <p>
          Through ablation studies and error analysis, I identified two primary failure modes:
        </p>

        <h4>1. Hub-Noise Amplification</h4>

        <p>
          In dense graphs with high entity overlap, certain papers (like BERT, Attention Is All You Need, ImageNet) become hub nodes cited by thousands of papers. GNNs aggregate features from all neighbors, meaning:
        </p>

        <ul>
          <li>Hub node representations become diluted averages of thousands of papers</li>
          <li>Paths through hubs inherit this noisy, averaged representation</li>
          <li>The model struggles to distinguish between paths that happen to pass through popular hubs</li>
        </ul>

        <p>
          In contrast, the MLP scorer treats each path independently without aggregating across the full neighborhood, avoiding hub-induced noise.
        </p>

        <h4>2. Over-Smoothing</h4>

        <p>
          GNNs with multiple layers suffer from over-smoothing: node representations become increasingly similar as information propagates through the graph. In dense graphs where most nodes are within 2-3 hops of each other, this effect is pronounced.
        </p>

        <p>
          After 3 GNN layers, I observed that node embeddings had average cosine similarity of 0.87—nearly all papers looked the same to the model.
        </p>

        <h3>When Lightweight Scorers Win</h3>

        <p>
          Based on these findings, I hypothesize that lightweight scorers (like MLPs) outperform GNNs when:
        </p>

        <ol>
          <li><strong>High density</strong>: Entity overlap exceeds ~75%</li>
          <li><strong>Hub-dominated</strong>: A small number of nodes have extremely high degree</li>
          <li><strong>Short paths</strong>: Most paths are length 2-4 (little benefit from multi-hop aggregation)</li>
          <li><strong>Strong node features</strong>: Individual node embeddings (e.g., paper abstracts encoded with BERT) are already highly informative</li>
        </ol>

        <h2>Methodology Details</h2>

        <h3>Hybrid Retrieval Pipeline</h3>

        <p>
          The full KG-RAG system combines:
        </p>

        <ol>
          <li><strong>Semantic Retrieval</strong>: BERT-based embedding similarity to find candidate papers</li>
          <li><strong>Dual-Path Discovery</strong>:
            <ul>
              <li>Citation paths (Paper A → cites → Paper B)</li>
              <li>Author paths (Paper A → authored_by → Author X → authored → Paper B)</li>
            </ul>
          </li>
          <li><strong>Path Scoring</strong>: The lightweight MLP scorer ranks discovered paths</li>
          <li><strong>Answer Generation</strong>: GPT-4 synthesizes final answer using top-ranked paths as context</li>
        </ol>

        <h3>MLP Architecture</h3>

        <p>
          The winning MLP architecture is surprisingly simple:
        </p>

        <ul>
          <li>Input: Concatenated node embeddings + relation type embeddings + path metadata (length, recency)</li>
          <li>3 hidden layers (512 → 256 → 128 neurons)</li>
          <li>ReLU activations with dropout (0.2)</li>
          <li>Output: Single score representing path relevance</li>
        </ul>

        <p>
          Total parameters: 180K. Compare this to 2.4M for GCN and 3.1M for GAT.
        </p>

        <h2>Implications</h2>

        <h3>For Practitioners</h3>

        <ul>
          <li><strong>Start simple</strong>: Before reaching for GNNs, try lightweight scorers on your KG-RAG tasks</li>
          <li><strong>Measure graph density</strong>: Entity overlap percentage is a good indicator of whether GNNs will help or hurt</li>
          <li><strong>Node features matter</strong>: Invest in high-quality node embeddings (e.g., BERT for text-rich graphs)</li>
        </ul>

        <h3>For Researchers</h3>

        <ul>
          <li><strong>Density matters</strong>: Current GNN benchmarks focus on sparse graphs (social networks, molecular graphs). Dense KGs represent a different regime where GNN assumptions break down.</li>
          <li><strong>Hub robustness</strong>: Future GNN architectures should explicitly handle hub-dominated graphs, perhaps through degree-aware aggregation or selective neighbor sampling.</li>
          <li><strong>Task-specific architecture</strong>: Path ranking in dense graphs may fundamentally differ from node classification in sparse graphs—architectures should reflect this.</li>
        </ul>

        <h2>Limitations & Future Work</h2>

        <p>
          This research has several limitations:
        </p>

        <ul>
          <li><strong>Single domain</strong>: Results are based on academic citation graphs. Generalization to other dense KG domains (e.g., biological networks, knowledge bases) requires validation.</li>
          <li><strong>Static graphs</strong>: The citation graph is static. Dynamic KGs where structure evolves over time may behave differently.</li>
          <li><strong>Path length</strong>: Analysis focused on paths of length 2-5. Very long paths (6+) were not extensively studied.</li>
        </ul>

        <p>
          Future work directions include:
        </p>

        <ol>
          <li>Developing density-aware hybrid architectures that combine MLP and GNN approaches</li>
          <li>Exploring selective neighbor aggregation to mitigate hub-noise amplification</li>
          <li>Extending analysis to other dense KG domains beyond academic citations</li>
          <li>Investigating whether findings hold for very large graphs (10M+ nodes)</li>
        </ol>

        <h2>Code & Resources</h2>

        <p>
          The paper will be published with full reproducibility materials:
        </p>

        <ul>
          <li>Complete dataset (3,215 papers, 784 queries)</li>
          <li>Model implementations (PyTorch) for MLP, GCN, and GAT scorers</li>
          <li>Evaluation scripts and notebooks</li>
          <li>Pre-trained model checkpoints</li>
        </ul>

        <div className="bg-medium-light p-6 rounded-lg my-12">
          <p className="text-sm text-medium-gray mb-2">PRESENTATION AT ICMLC 2026</p>
          <p className="mb-4">
            I'll be presenting this work at ICMLC 2026 in February. If you're attending or interested in discussing the research, I'd love to connect.
          </p>
          <a
            href="mailto:pranavkumaar.in@gmail.com"
            className="inline-block px-6 py-3 bg-medium-dark text-white rounded-lg no-underline hover:bg-medium-gray transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}
