---
title: "MAG Cleaning Pipeline"
description: "Nextflow pipeline that takes a directory of raw metagenome-assembled genomes and returns a dereplicated, quality-filtered, taxonomically classified set — the step everyone rewrites badly before every comparative genomics project."
role: author
stack: ["Nextflow", "CheckM2", "GUNC", "dRep", "GTDB-Tk", "Conda"]
signals: []
links:
  - label: "GitHub"
    href: "https://github.com/pavlohrab/Mag_cleaning_pipeline"
project: acido_biosynhtetic_potential
year: "2026"
order: 2
---

Seven steps, one command: `seqkit` statistics, mash-distance strain clustering with best-genome-per-cluster selection by N50, CheckM2 completeness and contamination filtering, GUNC chimerism removal, optional rRNA/tRNA filtering with Barrnap and tRNAscan-SE, dRep ANI dereplication, and GTDB-Tk classification.

Every threshold is a documented parameter with a sane default, and each step runs in its own Conda environment. This is the pipeline that took 19,720 Acidobacteriota MAGs down to a clean species-level set.
