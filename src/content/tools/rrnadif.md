---
title: "rRNADif"
description: "Measures how much a genome's own 16S rRNA copies disagree with each other — the intragenomic variability that silently distorts amplicon-based diversity estimates."
role: author
stack: ["Python", "R", "Bash", "Maximum likelihood phylogenetics"]
signals: ["DOI", "docs", "released"]
image: "/tools/rrnadif.png"
imageAlt: "rRNADif analysis pipeline diagram"
links:
  - label: "GitHub"
    href: "https://github.com/ostash-group/rRNADif"
  - label: "Documentation"
    href: "https://ostash-group.github.io/rRNADif/"
  - label: "Zenodo"
    href: "https://doi.org/10.5281/zenodo.4390532"
year: "2020"
order: 6
---

rRNADif extracts the 16S rRNA copies from a genome, builds a maximum likelihood tree from them, and uses branch length statistics as a variability measure — then compares that against a precomputed reference database of over 21,000 fully sequenced bacterial genomes. Custom reference databases can be built from any genome set.

Written from scratch, with a hosted documentation site and an archived Zenodo release.
