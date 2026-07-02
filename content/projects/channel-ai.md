## Overview

Channel AI is a multi-agent conversational analytics system I built and ran across 12 private pilot deployments with small and mid-sized teams. Users asked business questions over WhatsApp, in English or a regional language, and got answers, plots, and full reports generated from their own data. No dashboards, no SQL, no analyst queue.

The venture is concluded. What survives is the case study: the architecture, the data platform, and the failure modes, documented in full in the [repository](https://github.com/pranavkumaarofficial/channel-ai-enterprise). The failures shaped my later research on lightweight graph-based context modeling (ICMLC 2026).

**Measured in pilots:** reporting turnaround dropped from a ~2 day analyst queue to under 30 minutes of self-service conversation.

## The design thesis: SQL generation is the last step, not the first

Text-to-SQL demos beautifully and collapses on real schemas. Top systems clear 90% on academic Spider 1.0; on Spider 2.0's real enterprise warehouses the best agents solved roughly 17% of tasks at launch, and error analyses consistently rank schema and value linking (matching what the user said to real tables, columns, and stored values) as the largest failure category.

So the pipeline inverts the usual order. A dialog agent fills required slots (metric definition, time grain, entity filters) and refuses to proceed on ambiguity. A planning agent turns the resolved request into a validated, staged plan. Only then does schema-aware generation run against the data layer, materializing transient intermediate tables for multi-step questions, before analysis agents lift results into descriptive, diagnostic, and prescriptive tiers with spec-driven charts. Orchestration is LangGraph plus the OpenAI Agents SDK.

## The data platform underneath

Client truth never lived in one place. It arrived as Excel exports with merged headers, Postgres or MySQL behind an ERP, and the occasional abandoned BigQuery project. Spark ingestion jobs landed everything into Apache Iceberg tables (schema inference and type coercion for the spreadsheets, scheduled JDBC snapshots for the databases), then reshaped raw tables into per-client star schemas: fact tables at a declared grain, conformed dimensions, and a date dimension carrying business-day boundaries and fiscal calendars.

Two results mattered most:

- **Federation was the moat.** Because everything became Iceberg with shared metadata conventions, one question could join the ERP against the finance spreadsheet against BigQuery. Platform-bound agents (Genie, Cortex Analyst) still can't cross that boundary, and SMB questions never respect source boundaries.
- **Dimensional modeling is model context.** Star schemas plus a real date dimension improved SQL generation accuracy more than any prompting change. The warehouse layout is part of the prompt.

## The two failure classes that break simple SQL

**Grain mismatch.** "How many sales today?" fails against a table that only has `transaction_ts`: the business day runs 6am to 6am, timestamps are UTC against an IST business, and "sales" might mean booked, dispatched, or paid. The fix was structural (a date dimension with business-day boundaries, joined instead of computed) plus dialog that pins "today" and "sales" to definitions before generating.

**Value linking.** "Sales of Parle-G" against a dimension storing `PARLE G GLUCO 70G(P)` and forty sibling SKUs returns zero rows, and a silent zero looks exactly like a real zero. The fix was a distinct-value index per categorical column (trigram + embedding match), a clarifying turn when multiple SKUs plausibly match, and one hard rule: a zero-row result on a filtered query is treated as a probable linking failure, never as an answer.

## Transient querying: the biggest lesson

Multi-step questions ("compare this quarter's top 20 SKUs against last year, by region") were decomposed by the planner and executed as staged CTAS materializations: short-lived, conversation-scoped Iceberg tables with TTLs and snapshot-based invalidation. Materializing stages instead of nesting one giant query made failures inspectable, made follow-up questions nearly free (the follow-up reuses the intermediate instead of rescanning millions of rows), and capped Spark executor memory per step. Getting invalidation wrong produced the worst bug class in the system, stale intermediates feeding fresh questions, which is why I now think conversational state deserves first-class infrastructure.

## Explore the system

Everything below is interactive: the ingestion path from raw dumps to Iceberg star schemas, the query lifecycle from dialog to charts, the two failure classes with real naive-vs-fixed SQL, the benchmark cliff, and the 2026 market map.
