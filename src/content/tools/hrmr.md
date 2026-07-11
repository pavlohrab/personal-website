---
title: "hrmR"
description: "High Resolution Melting analysis from raw RFU data — a browser app for the wet-lab step that otherwise means exporting from the PCR machine and fighting with a spreadsheet."
role: author
stack: ["R", "Shiny", "MBmca", "mclust", "DBSCAN"]
signals: ["DOI", "released", "live demo"]
links:
  - label: "GitHub"
    href: "https://github.com/pavlohrab/hrmR"
  - label: "Live app"
    href: "https://pavloh.shinyapps.io/hrmR/"
  - label: "Zenodo"
    href: "https://doi.org/10.5281/zenodo.4491296"
year: "2021"
order: 7
---

hrmR takes RFU melting data straight out of a Bio-Rad CFX machine (tested on the CFX96) and produces melting and derivative curves, plus genotype clustering with several algorithms to choose from — k-means, model-based clustering with mclust, and DBSCAN.

Written because I needed it at the bench. Runs in the browser with no installation, or locally from the same source.
