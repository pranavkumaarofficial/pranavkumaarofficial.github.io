export const metadata = {
  title: 'Sustify - AI-Driven Sustainability Marketplace | Pranav Kumaar Sridhar',
  description: 'Founded an AI-driven sustainability marketplace using transformer-based embeddings for automated vendor matching.',
}

export default function SustifyPage() {
  return (
    <div className="max-w-[680px] mx-auto px-6">
      <header className="mb-12">
        <p className="text-sm text-medium-gray uppercase tracking-wide mb-4">
          Independent Startup · Jan 2022 – Jan 2024
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          Sustify
        </h1>
        <p className="text-2xl text-medium-gray leading-relaxed">
          An AI-driven sustainability marketplace connecting businesses with verified sustainable vendors
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-medium-border">
        {['BERT', 'OpenAI Embeddings', 'Python', 'Startup', 'Sustainability', 'Semantic Search', 'Marketplace'].map((tech) => (
          <span key={tech} className="px-3 py-1 bg-medium-light text-sm text-medium-gray rounded-full">
            {tech}
          </span>
        ))}
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>The Vision</h2>
        <p>
          Corporate sustainability commitments are everywhere, but finding verified sustainable vendors remains a manual, time-consuming process. Procurement teams spend weeks researching vendors, validating sustainability claims, and matching requirements to capabilities.
        </p>

        <p>
          Sustify was founded to solve this problem using AI-powered matching. The core idea: use transformer-based embeddings to automatically match business sustainability requirements with verified vendor capabilities.
        </p>

        <h2>The Problem Space</h2>

        <h3>Why Vendor Matching is Hard</h3>

        <p>
          Unlike traditional B2B marketplaces where requirements are structured (e.g., "I need 1000 units of Product X"), sustainability requirements are nuanced:
        </p>

        <ul>
          <li>"We need carbon-neutral shipping for our supply chain"</li>
          <li>"Looking for packaging suppliers using 100% recycled materials"</li>
          <li>"Need data center vendors with renewable energy commitments"</li>
        </ul>

        <p>
          These requirements don't fit neatly into dropdown menus or category filters. They require semantic understanding of both what the business needs and what vendors offer.
        </p>

        <h3>The Verification Challenge</h3>

        <p>
          Sustainability claims are easy to make, hard to verify. "Greenwashing" is rampant. Businesses need confidence that vendor sustainability claims are legitimate.
        </p>

        <h2>Technical Approach</h2>

        <h3>Transformer-Based Matching</h3>

        <p>
          The core matching engine used transformer-based embeddings (BERT-family models and OpenAI embeddings) to encode both:
        </p>

        <ul>
          <li><strong>Requirement embeddings</strong>: What the business needs (free-text descriptions)</li>
          <li><strong>Capability embeddings</strong>: What vendors offer (extracted from vendor profiles, certifications, case studies)</li>
        </ul>

        <p>
          Matching happened in embedding space using cosine similarity, allowing semantic matches even when exact terminology differed.
        </p>

        <h4>Why Transformers?</h4>

        <p>
          Sustainability language is domain-specific. "Carbon neutral," "net zero," "carbon negative" have nuanced differences. BERT-based models fine-tuned on sustainability documents could capture these distinctions.
        </p>

        <p>
          I experimented with:
        </p>

        <ul>
          <li><strong>DistilBERT</strong>: Fast, lightweight, good baseline</li>
          <li><strong>RoBERTa</strong>: Better performance on domain-specific terminology</li>
          <li><strong>OpenAI text-embedding-ada-002</strong>: Excellent zero-shot performance without fine-tuning</li>
        </ul>

        <p>
          Final production system used a hybrid: OpenAI embeddings for general matching + fine-tuned RoBERTa for sustainability-specific scoring.
        </p>

        <h3>Vendor Recommendation Pipeline</h3>

        <p>
          The recommendation flow:
        </p>

        <ol>
          <li><strong>Requirement Parsing</strong>: Extract key sustainability criteria from free-text requirements</li>
          <li><strong>Embedding Generation</strong>: Convert requirements to dense vectors</li>
          <li><strong>Candidate Retrieval</strong>: Approximate nearest neighbor search across vendor database</li>
          <li><strong>Re-ranking</strong>: Cross-encoder re-ranking for top-K candidates</li>
          <li><strong>Verification Scoring</strong>: Boost vendors with verified certifications (ISO 14001, B Corp, etc.)</li>
          <li><strong>Presentation</strong>: Ranked list with explanations (why was this vendor matched?)</li>
        </ol>

        <h3>Verification System</h3>

        <p>
          To combat greenwashing, I built a multi-tier verification system:
        </p>

        <ul>
          <li><strong>Tier 1: Self-Reported</strong>: Vendor claims without external verification</li>
          <li><strong>Tier 2: Document-Verified</strong>: Vendors upload certification documents (automated OCR extraction of cert numbers + manual review)</li>
          <li><strong>Tier 3: Third-Party Verified</strong>: Direct API integration with certification bodies (e.g., B Corp API)</li>
        </ul>

        <p>
          Recommendations prioritized Tier 3 and Tier 2 vendors. Tier 1 vendors were clearly labeled as unverified.
        </p>

        <h2>Product Development</h2>

        <h3>User Research</h3>

        <p>
          Before building, I conducted 20+ interviews with:
        </p>

        <ul>
          <li>Corporate sustainability managers (target buyers)</li>
          <li>Sustainable product vendors (supply side)</li>
          <li>Procurement teams (secondary buyers)</li>
        </ul>

        <p>
          Key learnings:
        </p>

        <ul>
          <li>Buyers want <em>validated</em> vendors, not just search results</li>
          <li>Vendors struggle with discoverability—getting in front of the right buyers</li>
          <li>Certification verification is a huge pain point (manual, time-consuming)</li>
        </ul>

        <h3>MVP Features</h3>

        <p>
          The initial MVP focused on core value propositions:
        </p>

        <ol>
          <li><strong>Free-text requirement submission</strong>: Businesses describe what they need in plain language</li>
          <li><strong>AI-powered vendor matching</strong>: Transformer-based recommendations</li>
          <li><strong>Verification badges</strong>: Clear indicators of vendor verification status</li>
          <li><strong>Direct messaging</strong>: Connect buyers and vendors</li>
        </ol>

        <h2>Pilot Phase & Learnings</h2>

        <h3>Early Pilot Interest</h3>

        <p>
          I secured pilot interest from 3 companies:
        </p>

        <ul>
          <li>Mid-size retail company seeking sustainable packaging vendors</li>
          <li>Tech company looking for carbon-neutral shipping partners</li>
          <li>Food & beverage company sourcing sustainable ingredient suppliers</li>
        </ul>

        <p>
          The AI matching worked well—pilot users reported that recommendations were relevant and saved them significant research time.
        </p>

        <h3>The Pivot Decision</h3>

        <p>
          Despite positive pilot feedback, I made the difficult decision to pivot away from Sustify in early 2024. Key reasons:
        </p>

        <ol>
          <li><strong>Marketplace chicken-and-egg problem</strong>: Needed vendors to attract buyers, needed buyers to attract vendors. Slow, capital-intensive to solve.</li>
          <li><strong>Sales cycle length</strong>: Corporate procurement decisions take months. As a solo founder, I couldn't sustain long sales cycles without funding.</li>
          <li><strong>Verification scalability</strong>: Manual verification didn't scale. Automated verification required partnerships with certification bodies (complex, slow to establish).</li>
        </ol>

        <p>
          The technical matching system worked. The business model timing and execution were the challenges.
        </p>

        <h2>Technical Lessons Learned</h2>

        <ol>
          <li><strong>Embeddings are powerful for fuzzy matching</strong>: Transformer embeddings handled the semantic matching better than any keyword-based system could have.</li>
          <li><strong>Fine-tuning pays off in specialized domains</strong>: Domain-specific fine-tuning (sustainability language) improved precision by ~20% over zero-shot models.</li>
          <li><strong>Explainability matters</strong>: Users wanted to know <em>why</em> a vendor was recommended. I added feature highlighting (which parts of the vendor profile matched which requirements).</li>
          <li><strong>Data quality &gt; algorithm sophistication</strong>: Clean, structured vendor data mattered more than cutting-edge models. Garbage in, garbage out.</li>
        </ol>

        <h2>Business Lessons Learned</h2>

        <ol>
          <li><strong>Solve a painful problem, not just an interesting one</strong>: The matching problem was interesting technically, but the pain point wasn't urgent enough to drive fast adoption.</li>
          <li><strong>Marketplaces are hard</strong>: Two-sided marketplaces require solving two distinct customer acquisition problems simultaneously. Very challenging as a solo founder.</li>
          <li><strong>Timing matters</strong>: Corporate sustainability was gaining momentum, but procurement budgets and processes hadn't caught up yet.</li>
          <li><strong>Know when to pivot</strong>: Continuing to push a slow-growing startup as a solo founder while starting full-time work wasn't sustainable. Better to pivot and apply learnings elsewhere.</li>
        </ol>

        <h2>What I'd Do Differently</h2>

        <p>
          With hindsight, several things I'd change:
        </p>

        <ul>
          <li><strong>Start with one side</strong>: Build value for vendors first (help them get discovered) before worrying about buyer acquisition. Solve the chicken-and-egg sequentially, not simultaneously.</li>
          <li><strong>Narrow focus</strong>: "Sustainability" is too broad. Focusing on a specific vertical (e.g., sustainable packaging only) would have been more tractable.</li>
          <li><strong>Automate verification from day one</strong>: Manual verification was a bottleneck. Should have prioritized API integrations with certification bodies earlier.</li>
        </ul>

        <h2>Where the Technology Went</h2>

        <p>
          While Sustify as a business pivoted, the matching technology wasn't wasted. The transformer-based matching approach I developed influenced my later work on <strong>OneSKU</strong> (hybrid retrieval for vendor catalogs) and <strong>Channel AI</strong> (semantic search over structured data).
        </p>

        <p>
          Lessons about embedding-based search, verification systems, and handling fuzzy requirements carried forward into subsequent projects.
        </p>

        <div className="bg-medium-light p-6 rounded-lg my-12">
          <h3 className="mt-0">Startup Journey Takeaway</h3>
          <p className="mb-0">
            Sustify didn't become a successful company, but it was an invaluable learning experience. I learned more about product development, user research, marketplace dynamics, and startup execution in those two years than I could have learned from any course or book. The technical work was solid; the business execution is where I grew the most.
          </p>
        </div>
      </div>
    </div>
  )
}
