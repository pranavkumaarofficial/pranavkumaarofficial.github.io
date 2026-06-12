## Overview

OneSKU is a hybrid retrieval system for product search across heterogeneous vendor catalogs — where the same item appears under different names, units, and attribute schemas per vendor.

**Impact:** sub-15 second query latency across multi-million SKU inventories.

## How it works

- **Hybrid retrieval**: BM25 lexical matching fused with BERT-based dense embeddings, so exact part numbers and fuzzy descriptions both work.
- **Harmonization pipeline**: custom normalization that aligns vendor catalogs (units, attribute names, category taxonomies) before indexing.
- Built in PyTorch with offline evaluation on labeled query-product pairs.

## What I'd highlight

Hybrid wasn't a buzzword choice — pure dense retrieval failed on exact SKU lookups and pure BM25 failed on descriptive queries. The fusion weighting was tuned against real query logs.
