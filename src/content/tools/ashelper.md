---
title: "ashelper"
description: "Turns antiSMASH and BiG-SCAPE output into iTOL annotation files."
role: author
stack: ["Python", "antiSMASH", "BiG-SCAPE", "iTOL"]
signals: ["tests", "packaged", "released"]
links:
  - label: "GitHub"
    href: "https://github.com/pavlohrab/ashelper"
project: acido_biosynhtetic_potential
year: "2026"
order: 1
---

Mapping biosynthetic gene clusters onto a tree is a routine step in genome mining, and it is routinely done by hand. `ashelper` takes an antiSMASH output directory, a BiG-SCAPE output directory and a Newick tree, and emits the iTOL dataset files needed to render BGC classes, counts and family membership as tree annotations.

Installable with `pip install .`, with a CLI entry point, a test suite, and a tagged release.
