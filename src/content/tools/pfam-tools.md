---
title: "pfam_tools"
description: "Scans proteomes against Pfam-A, builds a QC-filtered presence/absence matrix, and annotates it with GO terms — the feature table that comparative genomics and ML models actually run on."
role: author
stack: ["Python", "pyhmmer", "Pfam-A", "GO / GO-Slim"]
signals: []
links:
  - label: "GitHub"
    href: "https://github.com/pavlohrab/pfam_tools"
project: marine-acido-host
year: "2026"
order: 4
---

Four composable scripts. `run_hmmscan.py` scans protein FASTAs against a pressed Pfam-A database with pyhmmer, parallelised over genomes. `pfam_scan.py` applies e-value and coverage filtering, resolves overlapping domain hits, and writes a presence/absence matrix. `pfam_mapping.py` annotates Pfam IDs with GO and GO-Slim terms. `pfam_neighbourhood_extractor.py` pulls the genomic neighbourhood around a domain of interest back out as GenBank and FASTA.

This is where the feature matrix for the marine Acidobacteriota host-adaptation work came from.
