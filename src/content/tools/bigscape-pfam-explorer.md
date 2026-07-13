---
title: "bigscape-pfam-explorer"
description: "Point it at a BiG-SCAPE database and a Pfam domain, and it tells you which domains travel with it across BGC families."
role: author
stack: ["R", "Shiny", "SQLite", "BiG-SCAPE"]
signals: []
links:
  - label: "GitHub"
    href: "https://github.com/pavlohrab/bigscape_pfam_explorer"
project: acido_biosynhtetic_potential
year: "2026"
order: 5
---

This app joins the region, GenBank, connected-component, family and domain-hit tables. It attemp to answer a one question: whether given a target Pfam domain, what else co-occurs with it, how often, and how does that pattern distribute across BiG-SCAPE families and connected components?
