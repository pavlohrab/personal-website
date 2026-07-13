---
title: "Global biosynthetic potential of Acidobacteriota"
status: ongoing
meta: "2023 - Present"
description: "Built a Nextflow pipeline to clean and dereplicate 19,720 Acidobacteriota MAGs from public data, and mined the result for biosynthetic gene clusters across every biome the phylum occupies."
tags: ["BGC mining", "Metagenomics", "Nextflow"]
links:
  - label: "MAG Cleaning Pipeline"
    href: "https://github.com/pavlohrab/Mag_cleaning_pipeline"
  - label: "bigscape-pfam-explorer"
    href: "https://github.com/pavlohrab/bigscape_pfam_explorer"
featured: true
category: research
order: 1
---

## The problem

Acidobacteriota are everywhere — soil, sediment, marine sponges — but almost none have been isolated, so nearly everything we know about them comes from metagenome-assembled genomes. Individual studies had hinted at real biosynthetic potential, but nobody had looked across biomes at once, which is the comparison that tells you whether that potential is a soil story or a general one.

## What I did

I collected 19,720 Acidobacteriota MAGs from public databases together with their environmental metadata, then built a Nextflow pipeline to make them usable: mash-based strain clustering, CheckM2 quality filtering, GUNC chimerism removal, dRep dereplication and GTDB-Tk classification. That pipeline is open source as [Mag_cleaning_pipeline](https://github.com/pavlohrab/Mag_cleaning_pipeline).

On the cleaned, species-level set I run antiSMASH and BiG-SCAPE. BiG-SCAPE writes its results to a SQLite database that resists inspection, so I also wrote [bigscape-pfam-explorer](https://github.com/pavlohrab/bigscape_pfam_explorer) to interrogate Pfam domain co-occurrence across BGC families directly.

## Status

BGC annotation across the dereplicated set is in progress. Both tools are finished and released.
