## Overview

Research accepted at **ICMLC 2026** (presentation, Feb 2026). We study retrieval over dense academic citation graphs and ask: when does graph structure actually help KG-RAG?

## Key result

A lightweight **MLP-based path scorer achieves 93.9% AUC**, outperforming GCN and GAT models while using **13× fewer parameters**. In dense graphs, heavy message-passing architectures can amplify noise rather than signal.

## Method

- KG-augmented RAG pipeline over citation graphs
- Candidate path generation, then learned ranking of paths feeding the retriever
- Systematic comparison: MLP scorer vs. GCN vs. GAT under matched budgets

## Why it matters

Most KG-RAG work assumes more graph machinery = better retrieval. This shows the opposite can hold in dense regimes, useful for anyone deploying KG-RAG where inference cost matters.
