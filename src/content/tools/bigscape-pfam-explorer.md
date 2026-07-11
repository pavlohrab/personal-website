---
title: "bigscape-pfam-explorer"
description: "Point it at a BiG-SCAPE database and a Pfam domain, and it tells you which domains travel with it across BGC families — co-occurrence patterns you can't see in the raw output."
role: author
stack: ["R", "Shiny", "SQLite", "BiG-SCAPE", "UpSetR"]
signals: []
links:
  - label: "GitHub"
    href: "https://github.com/pavlohrab/bigscape_pfam_explorer"
project: acido_biosynhtetic_potential
year: "2026"
order: 5
---

BiG-SCAPE writes its results to a SQLite database that nobody wants to query by hand. This app joins the region, GenBank, connected-component, family and domain-hit tables for you, then answers one question well: given a target Pfam domain, what else co-occurs with it, how often, and how does that pattern distribute across BiG-SCAPE families and connected components?

Co-occurrence rates and family/CC coverage in one tab, an UpSet plot of domain combinations in another, and a filterable, downloadable table of every record in a third. Ships with a Conda environment file.
