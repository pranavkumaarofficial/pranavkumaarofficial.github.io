export const metadata = {
  title: 'OneSKU - Hybrid Retrieval System | Pranav Kumaar Sridhar',
  description: 'Building a hybrid BM25 + embedding retrieval system for aligning heterogeneous vendor catalogs across multi-million SKU inventories.',
}

export default function OneSKUPage() {
  return (
    <div className="max-w-[680px] mx-auto px-6">
      <header className="mb-12">
        <p className="text-sm text-medium-gray uppercase tracking-wide mb-4">
          PESU Venture Labs · Jan 2022 – Jan 2024
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          OneSKU
        </h1>
        <p className="text-2xl text-medium-gray leading-relaxed">
          A hybrid BM25 + embedding retrieval system solving the vendor catalog alignment problem at scale
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-medium-border">
        {['PyTorch', 'YOLO', 'OpenCV', 'LlamaIndex', 'OpenAI LLMs', 'BM25', 'BERT', 'Python'].map((tech) => (
          <span key={tech} className="px-3 py-1 bg-medium-light text-sm text-medium-gray rounded-full">
            {tech}
          </span>
        ))}
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>The Challenge</h2>
        <p>
          E-commerce platforms face a fundamental problem: the same product can have dozens of different names, descriptions, and attributes across different vendor catalogs. A "Samsung 65-inch 4K Smart TV" might be listed as "Samsung QN65Q60AAFXZA 65 QLED 4K" by one vendor and "Samsung 65 Inch Class Q60A QLED 4K Smart TV" by another.
        </p>

        <p>
          For platforms aggregating products from multiple vendors, this heterogeneity makes it nearly impossible to:
        </p>

        <ul>
          <li>Deduplicate identical products</li>
          <li>Compare prices across vendors</li>
          <li>Provide accurate search results to customers</li>
          <li>Maintain consistent product catalogs</li>
        </ul>

        <p>
          Traditional exact-match or fuzzy-string approaches fail because they can't understand semantic equivalence. At PESU Venture Labs, I was tasked with building a solution that could harmonize vendor catalogs containing millions of SKUs.
        </p>

        <h2>Technical Architecture</h2>

        <h3>Hybrid Retrieval: Best of Both Worlds</h3>
        <p>
          Rather than choosing between lexical (BM25) and semantic (embeddings) approaches, I designed a hybrid system that leverages the strengths of both:
        </p>

        <ul>
          <li><strong>BM25 for precision</strong>: Excellent at matching exact terms, model numbers, and brand names</li>
          <li><strong>Embeddings for recall</strong>: Captures semantic similarity even when terminology differs</li>
        </ul>

        <p>
          The key innovation was the custom harmonization pipeline that intelligently combines these signals based on the nature of the query and available product attributes.
        </p>

        <h3>Domain-Aware Feature Separation</h3>
        <p>
          One critical insight: not all product attributes should be treated equally. I separated features into two categories:
        </p>

        <h4>Categorical Features</h4>
        <ul>
          <li>Brand names (e.g., "Samsung" vs "Sony")</li>
          <li>Product categories (e.g., "Television" vs "Monitor")</li>
          <li>Discrete attributes (e.g., "WiFi enabled" vs "No WiFi")</li>
        </ul>

        <p>
          For categorical features, exact matching (via BM25) is heavily weighted because "Samsung" and "Sony" are semantically similar in embedding space but represent fundamentally different products.
        </p>

        <h4>Numerical Features</h4>
        <ul>
          <li>Screen sizes (e.g., 65" vs 55")</li>
          <li>Resolutions (e.g., 4K vs 1080p)</li>
          <li>Capacities (e.g., 256GB vs 512GB)</li>
        </ul>

        <p>
          Numerical features required special handling. Rather than treating "65 inch" and "55 inch" as text tokens, I implemented range-aware matching that understands hierarchical relationships (4K contains 1080p in capability, but not vice versa).
        </p>

        <h3>Custom Harmonization Pipeline</h3>
        <p>
          The harmonization pipeline processes each product through multiple stages:
        </p>

        <ol>
          <li><strong>Attribute Extraction</strong>: Parse product titles and descriptions to extract structured attributes</li>
          <li><strong>Normalization</strong>: Standardize units, brand names, and common variations</li>
          <li><strong>Feature Encoding</strong>:
            <ul>
              <li>BM25 index for categorical and exact-match features</li>
              <li>BERT embeddings for semantic descriptions</li>
              <li>Specialized numerical encodings for size/capacity features</li>
            </ul>
          </li>
          <li><strong>Hybrid Scoring</strong>: Weighted combination based on feature confidence</li>
          <li><strong>Re-ranking</strong>: Final re-ranking using cross-encoder for top candidates</li>
        </ol>

        <h2>Performance Optimizations</h2>

        <h3>Sub-15s Query Latency at Scale</h3>
        <p>
          Achieving sub-15 second query latency across multi-million SKU inventories required aggressive optimization:
        </p>

        <h4>1. Approximate Nearest Neighbor Search</h4>
        <p>
          For embedding-based retrieval, exact nearest neighbor search doesn't scale. I implemented HNSW (Hierarchical Navigable Small World) indexing, reducing search time from O(n) to O(log n) with minimal accuracy trade-off.
        </p>

        <h4>2. Inverted Index Optimization</h4>
        <p>
          BM25 relies on inverted indexes. I optimized index construction by:
        </p>
        <ul>
          <li>Using vocabulary pruning to remove uninformative terms</li>
          <li>Implementing posting list compression (variable-byte encoding)</li>
          <li>Caching frequently accessed posting lists in memory</li>
        </ul>

        <h4>3. Early Termination</h4>
        <p>
          For many queries, the top results are obvious. I implemented confidence-based early termination—if the top candidate scores significantly higher than alternatives, skip full re-ranking.
        </p>

        <h3>Handling Noisy Data</h3>
        <p>
          Vendor catalogs are messy. Common issues included:
        </p>

        <ul>
          <li>Missing attributes (e.g., no screen size listed)</li>
          <li>Inconsistent formatting ("4K" vs "UHD" vs "2160p")</li>
          <li>Incorrect categorization (monitors listed as TVs)</li>
          <li>Promotional text mixed with product specs</li>
        </ul>

        <p>
          To handle this, I implemented a confidence scoring system that tracks data quality at the attribute level. Low-confidence attributes receive reduced weight in the final scoring function.
        </p>

        <h2>Real-World Impact</h2>

        <div className="bg-medium-light p-6 rounded-lg my-8">
          <h3 className="mt-0">Key Results</h3>
          <ul className="mb-0">
            <li><strong>Query Latency</strong>: Sub-15s across multi-million SKU inventories</li>
            <li><strong>Accuracy</strong>: 94% precision on vendor catalog matching benchmarks</li>
            <li><strong>Scale</strong>: Successfully deployed on catalogs with 5M+ products</li>
            <li><strong>Recall Improvement</strong>: 40% increase vs. pure BM25 baseline</li>
          </ul>
        </div>

        <p>
          The system was deployed in production for a major e-commerce client, where it powers product matching across 20+ vendor catalogs. The client reported a 60% reduction in manual catalog curation effort.
        </p>

        <h2>Technical Challenges & Solutions</h2>

        <h3>Challenge 1: Embedding Space Collapse</h3>
        <p>
          Early experiments with BERT embeddings revealed a problem: products from the same category (e.g., all Samsung TVs) clustered too tightly in embedding space, making it hard to distinguish between different models.
        </p>

        <p>
          <strong>Solution</strong>: Implemented contrastive learning with hard negative mining. The model learned to separate similar-but-different products (e.g., "Samsung 65 Q60A" vs "Samsung 65 Q70A") by explicitly training on these challenging cases.
        </p>

        <h3>Challenge 2: BM25 Keyword Stuffing</h3>
        <p>
          Some vendors include extensive keyword stuffing in product descriptions ("TV television smart TV 4K TV…"), which inflates BM25 scores artificially.
        </p>

        <p>
          <strong>Solution</strong>: Term frequency saturation using BM25+ variant, which penalizes excessive term repetition. Combined with term importance weighting based on inverse document frequency across the entire catalog.
        </p>

        <h3>Challenge 3: Cross-Category Leakage</h3>
        <p>
          Occasionally, products from different categories would match incorrectly (e.g., "Apple iPhone 13" matching "Apple MacBook 13-inch" due to shared brand and "13" appearing in both).
        </p>

        <p>
          <strong>Solution</strong>: Category-aware filtering as a pre-processing step. Before detailed matching, enforce category consistency using a lightweight classifier. This reduced cross-category errors by 95%.
        </p>

        <h2>Lessons Learned</h2>

        <ol>
          <li><strong>Hybrid approaches dominate</strong>: Pure neural models sound elegant, but combining them with classical IR techniques (BM25) consistently outperforms either alone.</li>
          <li><strong>Domain knowledge is crucial</strong>: Understanding that brand names require exact matching while descriptions benefit from semantic similarity made the difference between 75% and 94% accuracy.</li>
          <li><strong>Data quality matters more than model complexity</strong>: Spending time on robust attribute extraction and normalization improved results more than trying increasingly complex models.</li>
          <li><strong>Performance is a feature</strong>: Sub-15s latency was a hard requirement. Users won't wait 60 seconds for catalog matching results.</li>
        </ol>

        <h2>Future Improvements</h2>

        <p>
          Several areas remain for future work:
        </p>

        <ul>
          <li>Incorporating product images for visual similarity matching</li>
          <li>Active learning to improve the model using user feedback</li>
          <li>Multilingual support for international vendor catalogs</li>
          <li>Real-time catalog updates with incremental index maintenance</li>
        </ul>

        <div className="bg-medium-light p-6 rounded-lg my-12">
          <p className="text-sm text-medium-gray mb-2">WANT TO DISCUSS IR & RETRIEVAL SYSTEMS?</p>
          <p className="mb-4">
            I'm happy to dive deeper into hybrid retrieval architectures, BM25 optimization techniques, or embedding-based search systems.
          </p>
          <a
            href="mailto:pranavkumaar.in@gmail.com"
            className="inline-block px-6 py-3 bg-medium-dark text-white rounded-lg no-underline hover:bg-medium-gray transition-colors"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </div>
  )
}
