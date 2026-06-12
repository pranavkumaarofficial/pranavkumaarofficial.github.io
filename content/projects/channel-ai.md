## Overview

Channel AI is a conversational business intelligence platform: non-technical users type questions in plain English and get answers from enterprise data, with the full SQL/agent pipeline hidden behind a chat interface.

**Impact:** reduced reporting turnaround from ~2 days (analyst queue) to under 30 minutes of self-service.

## How it works

- **Agent orchestration** with LangGraph and the OpenAI Agents SDK — query understanding, schema grounding, SQL generation, and result summarization run as separate, inspectable steps.
- **Lakehouse backend** on Apache Iceberg for versioned, queryable enterprise tables.
- **RAG over metadata** so the agent grounds itself in table schemas, column descriptions, and business glossaries instead of hallucinating joins.

## What I'd highlight

The hard part wasn't generating SQL — it was making wrong answers *visibly* wrong: every response links back to the exact tables and filters used, so users can audit instead of blindly trust.

<!-- Add architecture diagrams or screenshots:
![Architecture](../assets/channel-ai-arch.png)
-->
