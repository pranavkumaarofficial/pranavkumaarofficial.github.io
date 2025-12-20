export const metadata = {
  title: 'PESU Venture Labs - Applied AI Developer | Pranav Kumaar Sridhar',
  description: 'Delivering production-ready AI/ML solutions across computer vision, semantic search, and generative AI use cases in a university-affiliated incubator.',
}

export default function PESUVentureLabsPage() {
  return (
    <div className="max-w-[680px] mx-auto px-6">
      <header className="mb-12">
        <p className="text-sm text-medium-gray uppercase tracking-wide mb-4">
          Applied AI Developer · Jan 2022 – Jan 2024
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          PESU Venture Labs
        </h1>
        <p className="text-2xl text-medium-gray leading-relaxed">
          Building production-ready AI/ML solutions for external clients in a university-affiliated incubator
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-medium-border">
        {['PyTorch', 'YOLO', 'OpenCV', 'LlamaIndex', 'OpenAI LLMs', 'BM25', 'BERT', 'Computer Vision', 'Applied AI'].map((tech) => (
          <span key={tech} className="px-3 py-1 bg-medium-light text-sm text-medium-gray rounded-full">
            {tech}
          </span>
        ))}
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Overview</h2>
        <p>
          PESU Venture Labs is a university-affiliated technology incubator where student developers work on real client projects. Unlike traditional internships or academic projects, we delivered production-ready solutions to paying external clients—real businesses with real problems and tight deadlines.
        </p>

        <p>
          Over two years as an Applied AI Developer, I worked across diverse domains: computer vision, semantic search, generative AI, and document processing. Each project taught me valuable lessons about bridging the gap between research and production.
        </p>

        <h2>Major Projects</h2>

        <h3>1. Advertease - Real-Time Advertisement Detection</h3>

        <p>
          <strong>Client Need</strong>: A media analytics company needed to detect advertisements in live broadcast streams to verify ad placement and measure screen time.
        </p>

        <p>
          <strong>Technical Approach</strong>:
        </p>

        <ul>
          <li>Built a YOLO-based object detection system trained to recognize TV commercial patterns</li>
          <li>Implemented confidence-scored event emission (probability scores for each detection)</li>
          <li>Optimized end-to-end video processing latency to sub-700ms (critical for real-time use)</li>
        </ul>

        <p>
          <strong>Key Challenges</strong>:
        </p>

        <ul>
          <li><strong>Latency Requirements</strong>: 700ms end-to-end meant every component needed optimization—video decoding, model inference, post-processing</li>
          <li><strong>False Positive Control</strong>: Ads and regular content can look similar. Implemented temporal consistency checks (an "ad" should last 15-30 seconds, not flicker on/off)</li>
          <li><strong>Model Size vs. Accuracy Trade-off</strong>: Smaller YOLO models run faster but sacrifice accuracy. Settled on YOLOv5-medium after extensive benchmarking</li>
        </ul>

        <p>
          <strong>Outcome</strong>: Deployed system processed live streams with 95% detection accuracy and sustained sub-700ms latency. Client used it for ad placement verification across multiple TV channels.
        </p>

        <h3>2. Document Processing Pipeline</h3>

        <p>
          <strong>Client Need</strong>: Government contractor processing thousands of scanned forms daily needed automated detection of predefined visual markers (checkboxes, signatures, stamps).
        </p>

        <p>
          <strong>Technical Approach</strong>:
        </p>

        <ul>
          <li>YOLO-based detection pipeline for visual markers in scanned documents</li>
          <li>Data pipeline to process and annotate training data</li>
          <li>Post-processing to extract structured data from detection results</li>
        </ul>

        <p>
          <strong>The Data Challenge</strong>:
        </p>

        <p>
          The client provided ~1,000 annotated samples. Not nearly enough for robust YOLO training. I:
        </p>

        <ul>
          <li>Built data augmentation pipeline (rotation, scaling, noise injection, perspective transforms)</li>
          <li>Expanded dataset from ~1K to ~25K annotations</li>
          <li>Implemented active learning loop—model predictions on unlabeled data, human review of uncertain cases, retrain</li>
        </ul>

        <p>
          <strong>Outcome</strong>: Achieved ~95% precision in deployment tests. System processed 10,000+ documents per day, reducing manual review time by 80%.
        </p>

        <h3>3. OneSKU - Vendor Catalog Alignment</h3>

        <p>
          <em>(See dedicated <a href="/projects/onesku">OneSKU project page</a> for full technical details)</em>
        </p>

        <p>
          <strong>Brief Summary</strong>: Built hybrid BM25 + embedding retrieval system for aligning heterogeneous vendor catalogs. Achieved sub-15s query latency across multi-million SKU inventories.
        </p>

        <h3>4. Sustify - AI-Driven Sustainability Marketplace</h3>

        <p>
          <em>(See dedicated <a href="/projects/sustify">Sustify project page</a> for full details)</em>
        </p>

        <p>
          <strong>Brief Summary</strong>: Founded an AI-driven sustainability marketplace using transformer-based embeddings for automated vendor matching. Secured early pilot interest before pivoting.
        </p>

        <h2>Cross-Project Learnings</h2>

        <h3>Production AI is Different from Research AI</h3>

        <p>
          Academic ML focuses on pushing state-of-the-art metrics. Production ML focuses on:
        </p>

        <ul>
          <li><strong>Reliability</strong>: Can this run 24/7 without crashing?</li>
          <li><strong>Latency</strong>: Does it respond fast enough for real users?</li>
          <li><strong>Maintainability</strong>: Can someone else debug this when I'm gone?</li>
          <li><strong>Cost</strong>: Can the client afford to run this at scale?</li>
        </ul>

        <p>
          This mindset shift—from "what's the best model?" to "what's the right model for this production context?"—was transformative.
        </p>

        <h3>Data Quality &gt; Model Sophistication</h3>

        <p>
          On multiple projects, I learned that:
        </p>

        <ul>
          <li>Cleaning and augmenting data improved results more than trying fancier models</li>
          <li>Domain-specific data engineering (e.g., separating categorical vs. numerical features in OneSKU) mattered more than hyperparameter tuning</li>
          <li>Active learning loops (model → predictions → human review → retrain) beat passive dataset collection</li>
        </ul>

        <h3>Latency Budgets Force Trade-offs</h3>

        <p>
          Real-time systems teach you about trade-offs fast. For Advertease:
        </p>

        <ul>
          <li>Could have used larger, more accurate YOLO model → missed latency target</li>
          <li>Could have used smaller model → accuracy too low</li>
          <li>Final solution: medium model + aggressive inference optimizations (TensorRT, batch size tuning, GPU memory management)</li>
        </ul>

        <p>
          Lesson: Understand your constraints (latency, cost, accuracy) upfront and design around them.
        </p>

        <h2>Technical Skills Developed</h2>

        <h3>Computer Vision</h3>

        <ul>
          <li><strong>Object Detection</strong>: YOLO family (v5, v7, v8), Faster R-CNN</li>
          <li><strong>Image Processing</strong>: OpenCV, PIL, data augmentation techniques</li>
          <li><strong>Video Processing</strong>: FFmpeg, frame extraction, real-time stream handling</li>
          <li><strong>Model Optimization</strong>: TensorRT, ONNX, quantization, pruning</li>
        </ul>

        <h3>Natural Language Processing</h3>

        <ul>
          <li><strong>Embeddings</strong>: BERT, RoBERTa, Sentence Transformers, OpenAI embeddings</li>
          <li><strong>Semantic Search</strong>: Vector databases (FAISS, Qdrant), BM25, hybrid retrieval</li>
          <li><strong>LLMs</strong>: Prompt engineering, RAG systems, LlamaIndex</li>
        </ul>

        <h3>MLOps & Deployment</h3>

        <ul>
          <li><strong>Containerization</strong>: Docker, Kubernetes for ML workloads</li>
          <li><strong>Model Serving</strong>: FastAPI, TorchServe, gRPC</li>
          <li><strong>Monitoring</strong>: Prometheus metrics, logging, performance profiling</li>
          <li><strong>CI/CD</strong>: Automated testing, model versioning, deployment pipelines</li>
        </ul>

        <h2>Client Collaboration Skills</h2>

        <p>
          Beyond technical skills, PESU Venture Labs taught me critical soft skills:
        </p>

        <h3>Requirements Gathering</h3>

        <p>
          Clients often don't know what's technically feasible. My job was to:
        </p>

        <ul>
          <li>Understand the business problem (not just the stated solution)</li>
          <li>Propose technically feasible approaches</li>
          <li>Set realistic expectations (accuracy, latency, cost)</li>
        </ul>

        <h3>Iterative Delivery</h3>

        <p>
          Rather than disappearing for months and delivering a final product, I learned to:
        </p>

        <ul>
          <li>Deliver MVPs quickly (2-3 weeks for initial prototype)</li>
          <li>Gather feedback early and often</li>
          <li>Iterate based on real user testing</li>
        </ul>

        <h3>Technical Communication</h3>

        <p>
          Clients don't care about model architectures. They care about:
        </p>

        <ul>
          <li>"Will this solve my problem?"</li>
          <li>"How accurate is it?"</li>
          <li>"What does it cost to run?"</li>
          <li>"When can I deploy it?"</li>
        </ul>

        <p>
          I learned to translate technical details into business outcomes.
        </p>

        <h2>Impact & Outcomes</h2>

        <div className="bg-medium-light p-6 rounded-lg my-8">
          <h3 className="mt-0">By The Numbers</h3>
          <ul className="mb-0">
            <li><strong>6 production deployments</strong> across diverse domains</li>
            <li><strong>4 external clients</strong> served (media, e-commerce, government, sustainability)</li>
            <li><strong>~25K annotations created</strong> through data augmentation and active learning</li>
            <li><strong>Sub-second latency</strong> achieved for real-time systems (Advertease: 700ms)</li>
          </ul>
        </div>

        <h2>What Made PESU Venture Labs Unique</h2>

        <p>
          Unlike traditional university research labs or internships, PESU Venture Labs offered:
        </p>

        <ul>
          <li><strong>Real clients with real budgets</strong>: Accountability to paying customers taught me discipline</li>
          <li><strong>Production deployments</strong>: Code actually ran in production, handling real user traffic</li>
          <li><strong>Cross-domain exposure</strong>: Worked on computer vision, NLP, and search problems (not just one narrow area)</li>
          <li><strong>Autonomy</strong>: Trusted to make technical decisions, not just execute predefined tasks</li>
        </ul>

        <h2>Transition to Full-Time Work</h2>

        <p>
          My time at PESU Venture Labs directly prepared me for my current role at Baxter International. Skills I use daily:
        </p>

        <ul>
          <li>Translating business requirements into technical solutions</li>
          <li>Building production-ready systems (not just research prototypes)</li>
          <li>Collaborating with cross-functional teams (product, security, DevOps)</li>
          <li>Making pragmatic trade-offs (perfect vs. good enough vs. shipping)</li>
        </ul>

        <div className="bg-medium-light p-6 rounded-lg my-12">
          <p className="text-sm text-medium-gray mb-2">INTERESTED IN APPLIED AI WORK?</p>
          <p className="mb-4">
            I'm happy to discuss lessons learned from client projects, share insights about production ML, or provide guidance on navigating university incubators and applied research opportunities.
          </p>
          <a
            href="mailto:pranavkumaar.in@gmail.com"
            className="inline-block px-6 py-3 bg-medium-dark text-white rounded-lg no-underline hover:bg-medium-gray transition-colors"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </div>
  )
}
