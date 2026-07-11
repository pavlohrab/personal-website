---
title: "BGCViz"
description: "Six BGC prediction tools disagree about where the clusters are. BGCViz shows you the overlap on a circular genome plot, so you can see what everything agrees on and what only one tool found."
role: author
stack: ["R", "Shiny", "BioCircos", "antiSMASH", "DeepBGC", "PRISM"]
signals: ["tests", "packaged", "docs", "released", "live demo"]
image: "/tools/bgcviz.png"
imageAlt: "BGCViz circular genome plot showing overlapping BGC predictions from multiple tools"
links:
  - label: "GitHub"
    href: "https://github.com/ostash-group/BGCViz"
  - label: "Live app"
    href: "https://ostash-group.shinyapps.io/BGCViz"
year: "2020"
order: 3
---

BGCViz compares biosynthetic gene cluster annotations from antiSMASH, PRISM, SEMPI, DeepBGC, RRE-Finder and ARTS by their genomic coordinates, and renders the agreements and disagreements as an interactive BioCircos plot. Regions found by several tools and regions found by only one are both immediately visible.

Built as a proper R package — DESCRIPTION, namespace, man pages, vignettes and tests — and deployed as a hosted Shiny app that needs no installation.
