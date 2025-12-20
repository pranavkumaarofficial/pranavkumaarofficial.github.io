import Image from 'next/image'

export const metadata = {
  title: 'Channel AI - Conversational Business Intelligence Platform | Pranav Kumaar Sridhar',
  description: 'Building a conversational BI platform that reduced reporting turnaround from ~2 days to under 30 minutes using multi-agent LLM orchestration.',
}

export default function ChannelAIPage() {
  return (
    <div className="max-w-[680px] mx-auto px-6">
      {/* Header */}
      <header className="mb-12">
        <p className="text-sm text-medium-gray uppercase tracking-wide mb-4">
          Independent Project · Nov 2023 – Dec 2024
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          Channel AI
        </h1>
        <p className="text-2xl text-medium-gray leading-relaxed">
          A conversational business intelligence platform enabling non-technical users to query enterprise data through natural language
        </p>
      </header>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-medium-border">
        {['LangGraph', 'OpenAI Agents SDK', 'Apache Iceberg', 'SQL', 'RAG', 'LlamaIndex', 'Qdrant', 'WhatsApp Business API', 'AWS', 'Azure'].map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-medium-light text-sm text-medium-gray rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <h2>The Problem</h2>
        <p>
          In enterprise environments, accessing business intelligence typically requires either technical SQL expertise or waiting days for analysts to generate reports. Small businesses face similar challenges without the luxury of dedicated analytics teams. This creates a fundamental barrier between decision-makers and their data.
        </p>

        <p>
          I identified this gap during my final undergraduate year and continued developing the solution alongside my full-time role at Baxter. The goal was simple: make enterprise data accessible through conversation, reducing what typically takes days into minutes.
        </p>

        <h2>Technical Architecture</h2>

        <h3>Multi-Agent Orchestration</h3>
        <p>
          At the core of Channel AI is a multi-agent orchestration system built using <strong>LangGraph</strong> and the <strong>OpenAI Agents SDK</strong>. Rather than relying on a single LLM to handle all tasks, I designed a system where specialized agents collaborate:
        </p>

        <ul>
          <li><strong>Schema Agent</strong>: Understands database structure and relationships</li>
          <li><strong>SQL Generation Agent</strong>: Converts natural language to optimized SQL queries</li>
          <li><strong>Validation Agent</strong>: Ensures queries are safe and semantically correct</li>
          <li><strong>Insights Agent</strong>: Interprets results and generates business-friendly summaries</li>
        </ul>

        <p>
          This architecture allows each agent to specialize in its domain while maintaining contextual awareness through the LangGraph orchestration layer.
        </p>

        <h3>Unified Data Layer with Apache Iceberg</h3>
        <p>
          One of the most significant technical challenges was handling heterogeneous data sources across different enterprises. I chose <strong>Apache Iceberg</strong> as the unified data layer because it provides:
        </p>

        <ul>
          <li>Schema evolution without breaking existing queries</li>
          <li>Time-travel capabilities for auditing and compliance</li>
          <li>Efficient columnar storage for OLAP workloads</li>
          <li>Strong ACID guarantees for data consistency</li>
        </ul>

        <p>
          This foundation enabled the system to support multi-million row OLAP workloads with sub-20s query latency, even when dealing with complex joins and aggregations.
        </p>

        <h3>RAG-Enhanced Schema Understanding</h3>
        <p>
          Understanding enterprise schemas goes beyond just knowing table structures. I implemented a RAG (Retrieval-Augmented Generation) system using <strong>LlamaIndex</strong> and <strong>Qdrant</strong> to:
        </p>

        <ul>
          <li>Index business logic and domain knowledge</li>
          <li>Map common business terms to technical field names</li>
          <li>Maintain context about data quality and known edge cases</li>
          <li>Provide semantic search over historical queries and patterns</li>
        </ul>

        <p>
          This approach dramatically improved the accuracy of SQL generation, especially for domain-specific queries that required understanding business context beyond raw schema information.
        </p>

        <h2>Performance Optimizations</h2>

        <h3>Semantic Caching</h3>
        <p>
          Rather than using exact-match caching, I implemented semantic caching that recognizes when queries are functionally equivalent, even if phrased differently. This reduced redundant database hits and LLM calls by ~60% in production.
        </p>

        <h3>Optimized SQL Templates</h3>
        <p>
          Through analysis of thousands of generated queries across pilot deployments, I identified common patterns and created optimized SQL templates. These templates:
        </p>

        <ul>
          <li>Pre-aggregate common metric combinations</li>
          <li>Use materialized views for frequently accessed data</li>
          <li>Apply intelligent indexing strategies</li>
          <li>Leverage columnar storage characteristics of Iceberg</li>
        </ul>

        <h3>Persona-Based Access Control</h3>
        <p>
          Security was critical, especially for enterprise deployments. I implemented persona-based access control that ensures users only see data they're authorized to access, with row-level security enforced at the SQL generation stage.
        </p>

        <h2>Deployment & Validation</h2>

        <h3>Enterprise Pilots</h3>
        <p>
          I conducted 4 enterprise pilot evaluations across retail and hospitality sectors. Key learnings:
        </p>

        <ul>
          <li><strong>Retail (2 deployments)</strong>: Primary use cases involved inventory analytics and sales performance tracking. Users particularly valued the ability to ask follow-up questions and drill down into metrics.</li>
          <li><strong>Hospitality (2 deployments)</strong>: Focus on occupancy analytics and revenue optimization. The natural language interface reduced training time for new managers from weeks to hours.</li>
        </ul>

        <h3>WhatsApp Business API Integration</h3>
        <p>
          For small businesses, I deployed 12 lightweight instances accessible via WhatsApp. This removed the friction of learning new software—business owners could literally ask questions about their sales or inventory through a familiar messaging interface.
        </p>

        <p>
          The WhatsApp integration proved particularly successful in emerging markets where business owners are comfortable with messaging but resistant to complex software interfaces.
        </p>

        <h2>Impact & Results</h2>

        <div className="bg-medium-light p-6 rounded-lg my-8">
          <h3 className="mt-0">Key Metrics</h3>
          <ul className="mb-0">
            <li><strong>Reporting turnaround</strong>: Reduced from ~2 days to under 30 minutes</li>
            <li><strong>Query latency</strong>: Sub-20s for multi-million row OLAP workloads</li>
            <li><strong>Cache hit rate</strong>: ~60% through semantic caching</li>
            <li><strong>Accuracy</strong>: Cross-domain schema generalization validated across 16 pilot instances</li>
          </ul>
        </div>

        <h2>Technical Challenges & Solutions</h2>

        <h3>Challenge 1: Schema Complexity</h3>
        <p>
          Enterprise schemas are rarely clean. I encountered scenarios with hundreds of tables, ambiguous naming conventions, and undocumented relationships.
        </p>

        <p>
          <strong>Solution</strong>: Built a schema profiling system that automatically discovers relationships through foreign key analysis, naming pattern matching, and statistical correlation. This metadata feeds into the RAG system, improving query accuracy over time.
        </p>

        <h3>Challenge 2: Natural Language Ambiguity</h3>
        <p>
          Business users often ask ambiguous questions. "Show me sales" could mean total revenue, unit sales, specific products, or trending data over time.
        </p>

        <p>
          <strong>Solution</strong>: Implemented a clarification agent that identifies ambiguous queries and asks targeted follow-up questions before generating SQL. This reduced incorrect query generations by ~75%.
        </p>

        <h3>Challenge 3: Cost Management</h3>
        <p>
          Running multiple LLM agents for every query can become expensive at scale.
        </p>

        <p>
          <strong>Solution</strong>: Hybrid approach combining smaller, fine-tuned models for routine tasks (schema lookup, validation) with frontier models (GPT-4) only for complex reasoning and generation. This reduced per-query cost by ~80% while maintaining quality.
        </p>

        <h2>Lessons Learned</h2>

        <p>
          Building Channel AI while working full-time taught me valuable lessons about product development and technical architecture:
        </p>

        <ol>
          <li><strong>Start with the data layer</strong>: Investing time in a robust data foundation (Apache Iceberg) paid massive dividends later in query performance and reliability.</li>
          <li><strong>User feedback is gold</strong>: The WhatsApp interface wasn't in the original design. It emerged from observing how small business owners actually wanted to interact with their data.</li>
          <li><strong>Specialization over generalization</strong>: Multi-agent architecture outperformed single-model approaches because each agent could focus on doing one thing exceptionally well.</li>
          <li><strong>Performance is a feature</strong>: Sub-20s query latency was critical. If users had to wait 60+ seconds, they'd go back to requesting reports from analysts.</li>
        </ol>

        <h2>Future Direction</h2>

        <p>
          While the pilot deployments validated the core concept, several areas remain for future development:
        </p>

        <ul>
          <li>Expanding beyond SQL to support graph databases and unstructured data</li>
          <li>Building predictive capabilities (e.g., "Will we meet our Q4 targets?")</li>
          <li>Developing a self-service schema onboarding flow for new deployments</li>
          <li>Exploring agentic workflows that can take action, not just answer questions</li>
        </ul>

        <h2>Technical Deep Dive Resources</h2>

        <p>
          For those interested in the technical implementation details:
        </p>

        <ul>
          <li>Multi-agent orchestration patterns with LangGraph</li>
          <li>Semantic caching strategies for LLM applications</li>
          <li>Apache Iceberg for OLAP workloads</li>
          <li>RAG system design for structured data</li>
        </ul>

        <div className="bg-medium-light p-6 rounded-lg my-12">
          <p className="text-sm text-medium-gray mb-2">INTERESTED IN LEARNING MORE?</p>
          <p className="mb-4">
            I'm happy to discuss the technical architecture, share lessons learned, or explore potential collaborations.
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
