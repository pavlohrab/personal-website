---
title: "Host adaptations of marine Acidobacteriota"
status: ongoing
meta: "2024 - Present"
description: "Analysed 488 marine Acidobacteriota genomes across 16 families to separate genuine host adaptation from shared ancestry, using Pfam-based feature matrices, phylogenomics and machine learning."
tags: ["Machine learning", "Phylogenomics", "Comparative genomics"]
links:
  - label: "pfam_tools"
    href: "https://github.com/pavlohrab/pfam_tools"
featured: true
category: research
order: 3
---

## The problem

Marine sponges and corals are full of Acidobacteriota. The obvious question is whether living inside a host selects for a recognisable set of genomic adaptations, or whether the bacteria we find there are simply the descendants of ancestors that happened to be there first. Those two explanations predict very different genomes, and telling them apart requires controlling for phylogeny rather than just comparing gene lists.

## What I did

I assembled a set of 488 marine Acidobacteriota genomes spanning 16 families, annotated them against Pfam, and built a QC-filtered domain presence/absence matrix — the feature table that everything downstream runs on. The tooling for that step is open source as [pfam_tools](https://github.com/pavlohrab/pfam_tools): a pyhmmer-based scanner, an overlap-resolving matrix builder, and GO/GO-Slim annotation.

From there the question becomes a statistical one: which domains are enriched in host-associated lineages once shared ancestry is accounted for, and can a model separate host-associated from free-living genomes on genomic features alone. I combine phylogenomic reconstruction with random forest models and enrichment testing to answer it.

## Status

Analysis ongoing; the annotation tooling is released.
