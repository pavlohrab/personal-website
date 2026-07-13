---
title: "Arrower"
description: "Draws gene cluster arrow diagrams from a GenBank file as SVG. I revived an abandoned Python 2 script: ported it to Python 3, gave it a real CLI, and added category-based arrow colouring with a legend."
role: contributor
stack: ["Python 3", "Biopython", "SVG"]
signals: []
links:
  - label: "GitHub"
    href: "https://github.com/pavlohrab/Arrower"
  - label: "My commits"
    href: "https://github.com/pavlohrab/Arrower/commits?author=pavlohrab"
year: "2026"
order: 9
---

Arrower turns a GenBank file into a publication-ready SVG of a biosynthetic gene cluster — the arrow diagram every natural-product paper needs. The original had been untouched since 2016 and still ran on Python 2.

I ported it to Python 3, replaced the hand-rolled flag parsing with a proper `argparse` CLI (including writing straight to a file rather than piping stdout), and added the feature it was missing: colouring arrows by category — Pfam domains, gene class, whatever you supply in an annotation file — with an automatically drawn legend, plus manual per-gene colour overrides. Colouring is optional; with no annotation file the arrows stay grey. Documented and given a `requirements.txt`.
