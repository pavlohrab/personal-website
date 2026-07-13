---
title: "MAG Cleaning Pipeline"
description: "Nextflow pipeline that takes a directory of metagenome-assembled genomes and returns a dereplicated, quality-filtered, taxonomically classified set"
role: author
stack: ["Nextflow", "CheckM2", "GUNC", "dRep"]
signals: []
links:
  - label: "GitHub"
    href: "https://github.com/pavlohrab/Mag_cleaning_pipeline"
project: acido_biosynhtetic_potential
year: "2026"
order: 2
---

`seqkit` statistics, mash-distance strain clustering with best-genome-per-cluster selection by N50, CheckM2 completeness and contamination filtering, GUNC chimerism removal, optional rRNA/tRNA filtering with Barrnap and tRNAscan-SE, dRep ANI dereplication, and GTDB-Tk classification.
