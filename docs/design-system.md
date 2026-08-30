 Design system: “Herbarium” — pavlohrab.com

A design unification pass for an existing Astro site (`pavlohrab/personal-website`, branch `master`).
Structure, components and page layouts **stay as they are**. What changes: the colour ramp, the accent's
*job*, the three type roles, the header, and five content-presentation rules.
**Do not restyle anything not named here.**

---

## 1 · Principles

1. **Green is information; ink is action.** The accent marks what is current, live, dated or linked. Filled buttons use ink. At most one green fill per viewport, usually zero.
2. **Three type roles, never four.** Display (serif), body (sans), data (mono). Display never sets a date or a count; data never sets a heading.
3. **Underline colour carries meaning.** Green underline = you are here. Grey/ink underline = hover, interactive. Never both on one element.
4. **Keep the existing structural rules verbatim.** One 3px accent bar (top on grid cards, left on list rows), one hover gesture (rise 2px + one shadow step), square controls, rounded surfaces, the three-part link taxonomy. These were already right.
5. **Tint the neutrals.** No pure greys. Every neutral carries a constant hue and a trace of chroma.

---

## 2 · Tokens

Replace the corresponding blocks in `src/styles/global.css`.

```css
:root {
  /* Neutrals — warm paper, hue 85 light / 60 ink. No pure greys. */
  --gray-999: oklch(0.977 0.009 85);   /* page background      */
  --gray-900: oklch(0.955 0.010 85);
  --gray-800: oklch(0.930 0.012 85);   /* rules, tag bg        */
  --gray-700: oklch(0.880 0.012 85);
  --gray-600: oklch(0.760 0.012 70);
  --gray-500: oklch(0.690 0.012 65);
  --gray-400: oklch(0.620 0.012 60);   /* meta text            */
  --gray-300: oklch(0.450 0.012 60);   /* body text            */
  --gray-200: oklch(0.400 0.013 60);
  --gray-100: oklch(0.360 0.014 60);
  --gray-50:  oklch(0.310 0.015 60);
  --gray-0:   oklch(0.270 0.015 60);   /* headings, ink        */
  --surface:  #ffffff;                 /* NEW: cards sit above the page */

  /* Accent — information only. */
  --accent-light:    oklch(0.60 0.09 148);
  --accent-regular:  oklch(0.50 0.10 148);
  --accent-dark:     oklch(0.42 0.10 148);
  --accent-tint:     oklch(0.93 0.035 148);      /* NEW: status pill bg */
  --accent-overlay:  oklch(0.50 0.10 148 / 0.10);
  --accent-subtle-overlay: oklch(0.50 0.10 148 / 0.05);
  --accent-text-over: var(--gray-999);

  /* Second hue — status pills ONLY, never UI. */
  --status-alt:      oklch(0.50 0.10 58);
  --status-alt-tint: oklch(0.93 0.035 58);

  /* Action — filled controls. Ink, not accent. */
  --action:       var(--gray-0);
  --action-hover: var(--gray-50);
  --action-text:  var(--gray-999);

  --link-color: var(--accent-dark);

  /* Fonts — three roles. */
  --font-brand: "Source Serif 4", Georgia, "Times New Roman", serif;
  --font-body:  "Public Sans", var(--font-system);
  --font-data:  "IBM Plex Mono", ui-monospace, monospace;   /* NEW */

  --header-height: 96px;   /* NEW — was ~104px of pill chrome. 54px tier 1 + 42px tier 2. */
}

:root.theme-dark {
  --gray-999: oklch(0.190 0.010 80);
  --gray-900: oklch(0.215 0.010 80);
  --gray-800: oklch(0.300 0.010 80);
  --gray-700: oklch(0.360 0.010 80);
  --gray-600: oklch(0.450 0.009 82);
  --gray-500: oklch(0.540 0.009 84);
  --gray-400: oklch(0.620 0.008 85);
  --gray-300: oklch(0.740 0.008 85);
  --gray-200: oklch(0.810 0.008 85);
  --gray-100: oklch(0.880 0.008 85);
  --gray-50:  oklch(0.920 0.008 85);
  --gray-0:   oklch(0.950 0.008 85);
  --surface:  oklch(0.235 0.010 80);

  --accent-light:   oklch(0.80 0.08 148);
  --accent-regular: oklch(0.72 0.09 148);
  --accent-dark:    oklch(0.62 0.10 148);
  --accent-tint:    oklch(0.30 0.045 148);
  --accent-text-over: var(--gray-999);

  --status-alt:      oklch(0.70 0.09 58);
  --status-alt-tint: oklch(0.30 0.045 58);

  --action:       var(--gray-0);
  --action-hover: var(--gray-50);
  --action-text:  var(--gray-999);

  --link-color: var(--accent-light);
}
```

**Delete** all six `--gradient-*` variables and every use of them — they all alias flat greys now.
Replace `background: var(--gradient-stroke)` stroke rings with `box-shadow: 0 0 0 1px var(--gray-800)`.

**Fonts:** add Source Serif 4 (400, 400 italic, 600) and IBM Plex Mono (400, 500) alongside Public Sans.
Drop Fira Code entirely.

---

## 3 · Type

### Roles

- **h1–h5 → `--font-brand`** (serif), weight 600, `line-height` per table, colour `--gray-0`. Keep the existing `overflow-wrap: anywhere` (long taxonomic names).
- **Body, lede, buttons, nav → `--font-body`.**
- **→ `--font-data`:** all dates (`.blog-date`, `.project-date`, `.post-date`, CV years, news months), `.tag`, `.project-status`, `kbd`, counts, accession numbers, the hero eyebrow, the provenance strip.
- **Eyebrow pattern** (above every page title): `--font-data`, 0.625rem, `letter-spacing .14em`, uppercase, `--accent-regular`.
- **Taxon rule:** **every organism name is italic, at every rank** — binomials
  (*Inflatella pellicula*, *Geodia barretti*, *Streptomyces cyanogenus*), genera
  (*Streptomyces*), and higher ranks too (*Acidobacteriota*, *Streptomycetaceae*).
  Use the `<i class="taxon">` convention; it works in markdown bodies, in frontmatter
  strings rendered with `set:html`, and in hand-written `.astro` prose. `organism:` tag
  values stay plain text in the data and are italicised at render time by `isTaxon()`
  in `src/tags.ts`, so the AI-context bundle and the Pagefind index stay clean.

Never letterspace the serif positively. Never set a heading in mono.

### Scale

Root stays 16px; all values in rem so browser text settings still work.

```css
--text-2xs:  0.625rem;  /* 10px — eyebrow, kbd            (NEW) */
--text-xs:   0.6875rem; /* 11px — tags, status, dates      (NEW) */
--text-sm:   0.875rem;  /* 14px — meta, small buttons            */
--text-base: 1rem;      /* 16px — body                           */
--text-md:   1.125rem;  /* 18px — nav in mobile sheet            */
--text-lg:   1.25rem;   /* 20px — lede, card titles              */
--text-xl:   1.625rem;  /* 26px — h5, section titles (mobile)    */
--text-2xl:  2.125rem;  /* 34px — h4, section titles             */
--text-3xl:  2.625rem;  /* 42px — h3, page titles (mobile)       */
--text-4xl:  3.5rem;    /* 56px — h2, page titles                */
--text-5xl:  4.5rem;    /* 72px — h1, home hero only             */

/* Line heights — three named steps, not a continuum. */
--lh-tight: 1.1;   /* all headings                */
--lh-snug:  1.4;   /* card titles, nav, buttons   */
--lh-text:  1.6;   /* body, lede, descriptions    */
--lh-long:  1.8;   /* long-form article body      */
```

### Every text style on the site

| Element | Font | Size | Weight | Line-height | Tracking | Colour |
|---|---|---|---|---|---|---|
| h1 — home hero name | brand | 5xl · 72px | 600 | 1.05 | −0.015em | `--gray-0` |
| h2 / `.page-title` | brand | 4xl · 56px | 600 | 1.1 | −0.01em | `--gray-0` |
| h3 / detail page title | brand | 3xl · 42px | 600 | 1.15 | −0.01em | `--gray-0` |
| h4 / `.section-title` | brand | 2xl · 34px | 600 | 1.2 | 0 | `--gray-0` |
| h5 / in-content h2 | brand | xl · 26px | 600 | 1.25 | 0 | `--gray-0` |
| card title (project/blog/tool) | brand | lg · 20px | 600 | 1.3 | 0 | `--gray-0` |
| `.lede` / `.page-subtitle` | body | lg · 20px | 400 | 1.6 | 0 | `--gray-300` |
| body / card description | body | base · 16px | 400 | 1.6 | 0 | `--gray-300` |
| article body (`.content-section p`) | body | base · 16px | 400 | 1.8 | 0 | `--gray-300` |
| nav link (tier 2) | body | 13px | 400 / 600 current | 1.4 | 0 | `--gray-300` → `--gray-0` |
| wordmark | brand | 22px | 600 | 1.1 | −0.01em | `--gray-0` + accent on `hrab` |
| button `.btn` | body | base · 16px | 600 | 1.4 | 0 | `--action-text` |
| button `.btn-sm` | body | sm · 14px | 500 | 1.4 | 0 | `--gray-0` |
| `.read-more` | body | sm · 14px | 600 | 1.4 | 0 | `--accent-regular` |
| `.view-all-link` | body | sm · 14px | 600 | 1.4 | 0 | `--gray-0` (ink) |
| `.project-meta` / `.info-item` | body | sm · 14px | 400 | 1.6 | 0 | `--gray-400` |
| dates (all) | data | xs · 11px | 500 | 1.5 | 0 | `--accent-regular` |
| `.tag` / `.project-status` | data | xs · 11px | 500 | 1.4 | 0 | `--gray-100` / tinted |
| provenance strip | data | xs · 11px | 400 | 1.5 | 0 | key `--gray-400`, value `--gray-100` |
| scale-band number | data | 22px | 500 | 1.0 | 0 | `--accent-regular` |
| eyebrow / header tagline | data | 2xs · 10px | 500 | 1.4 | +0.14em | accent / `--gray-400` |
| `kbd` (⌘K) | data | 2xs · 10px | 400 | 1 | 0 | `--gray-400` |
| footer | body / data | sm · 14px | 400 | 1.6 | 0 | `--gray-400` |
| inline `code` / `pre` | data | sm · 14px | 400 | 1.7 | 0 | `--gray-100` on `--gray-800` |

### Responsive type

Only headings and the lede change; everything else is already small enough to stay fixed.

```css
@media (max-width: 50em) {
  h1                 { font-size: var(--text-3xl); }  /* 72 → 42 */
  h2, .page-title    { font-size: var(--text-2xl); }  /* 56 → 34 */
  h3                 { font-size: var(--text-xl);  }  /* 42 → 26 */
  h4, .section-title { font-size: var(--text-xl);  }  /* 34 → 26 */
  h5                 { font-size: var(--text-lg);  }  /* 26 → 20 */
  .lede, .page-subtitle { font-size: var(--text-base); line-height: 1.55; }
  .content-section p    { line-height: 1.7; }
  /* card titles, meta, tags, dates: unchanged */
}
```

**Floors.** Nothing below 10px anywhere; nothing below 11px on mobile — bump the eyebrow to 11px under 50em.
**Measure.** Prose columns 60–75ch (`--width-reading` already does this), card descriptions ≤ 50ch, lede ≤ 65ch.
**No `clamp()`** anywhere — two fixed steps are easier to reason about and never produce a 47.3px heading.

---

## 4 · Accent budget

### Accent — keep / add

- the 3px accent bar on surfaces
- `.section-title` 2px bottom border
- current nav item: 2px underline
- the mono eyebrow
- all dates
- inline links + their sweep
- “Read more →” and “Read more ↓”
- `hrab` in the wordmark
- phylogram / alignment / BGC tips

### Accent — remove

- `.btn-primary` fill → `--action` (ink)
- `.btn-outline` border/text → ink; hover fills ink
- `.link[aria-current]` pill fill → deleted
- ThemeToggle's sliding `::before` → `--surface` on a `--gray-800` track
- `.project-status.*` solid fills → tint + ink text
- `.meta-section .tag` accent fill → `--gray-800`
- `.back-link`, `.breadcrumb a` → `--gray-300`, ink on hover
- `.location`, `.view-all-link` → ink

### Accent — remove (found during the build, not in the original list)

The original list covered `components.css`. An audit of the page-scoped styles turned up **eighteen** more
solid accent fills. All are controls or badges, so all go to ink or to the tag treatment:

| Site | Was | Now |
|---|---|---|
| `CallToAction` (3× on the homepage) | `--gradient-accent-orange` fill | `--action` fill, `--action-hover` on hover |
| `BackToTop` | `--accent-regular` fill | `--action` / `--action-hover` |
| `Pill.astro` | `--accent-regular` fill | `--action` fill |
| `SearchPalette` `.search-mode.is-active` | `--accent-regular` fill | `--action` fill |
| `tools` `.signal` (up to 8 per card) | `--accent-regular` fill | `--gray-800` + `--gray-100`, mono — a signal is a tag |
| `publications` `.pub-link` | `--accent-regular` fill | `--action` fill |
| `outreach` `.event-link:hover` | `--accent-regular` fill | `--action` fill |
| `outreach` `.select-option.active` | `--accent-regular` fill | `--gray-800` + `--gray-0` |
| `outreach` `.year` marker | `--accent-regular` fill | `--accent-tint` + `--accent-dark` — it is a date |
| `cv` `.toc-toggle` | `--accent-regular` fill | `--action` fill |
| `thoughts` / `adventures` active filter chip | `--accent-regular` fill | `--action` fill |

**Kept green**, because they are a rule or a dot rather than a fill: the CV timeline's 2px spine and its
entry dots, and the outreach timeline dots.

### Second palette removed — `outreach` `.event-type`

Eight event types were fills in seven **arbitrary hex hues** (`#7b9db5`, `#8b5cf6`, `#06b6d4`, `#10b981`,
`#d4a574` …) belonging to no palette on the site. They collapse onto the two hues the system has:

- `invited` → `--accent-tint` / `--accent-dark`
- `conference`, `course`, `workshop` → `--status-alt-tint` / `--status-alt`
- `poster`, `hackathon`, `volunteering`, `PhD trip` → `--gray-800` / `--gray-100`

All `--font-data`, 11px, weight 500, lowercase — the same vocabulary as `.project-status`. This trades
eight-way colour coding for three-way; the type is still spelled out in the label.

### Surfaces — the rule reaches every page, not just `components.css`

`--surface` had to be applied to **28 further card and panel rules** defined in page-scoped styles, or those
cards stay level with the page and vanish in dark mode: `.interest-card`, `.pub-preview`, `.news-item`,
`.publication-card`, `.news-card`, `.event-card`, `.contact-card`, `.location-card`, `.message-card`,
`.hobby-card`, `.fact-item`, `.cv-entry`, `.software-entry`, `.skill-category`, `.content-body`,
`.project-info`, and the SearchPalette panel and rows.

`Nav` and the `BaseLayout` page shell stay `--gray-999`: they are the page, not something sitting on it.

---

## 5 · Header — rewrite `src/components/Nav.astro`

**Two tiers, no pills.** Delete the `.nav-items` radial-gradient pill, its `::before` stroke ring, the
`.search-trigger` pill chrome, and the three-column grid.

- **Wordmark:** `pavlo<span>hrab</span>`, one lowercase word, `--font-brand` 600, 1.375rem, `letter-spacing -0.01em`; the span is `--accent-regular`. Keep the existing inner-span hover sweep.
- **Tier 1 (54px):** wordmark + tagline (`--font-data` 0.625rem, uppercase, `.12em`, `--gray-400`) left; search + theme toggle right.
- **Tier 2 (42px):** section links, **centred** in the content column, `--font-body` 1rem, `gap 1.75rem`, hairline `--gray-800` above and below.
  *(Revised in build. Originally 38px, left-aligned, 0.8125rem — too small and too far left against a full-width
  header; centring gives the row its own weight instead of reading as a caption under the wordmark. Total header
  is therefore 96px, not 92px.)*
- **Short labels in tier 2:** Home · Tools · Projects · CV · Publications · **Talks** · Beyond · Contact. Full “Talks & Teaching” only in the mobile sheet and in `<title>`.
- **Current page:** `color: var(--gray-0); font-weight: 600` plus a 2px `--accent-regular` underline 7px below the text box, implemented as a box-shadow so it never affects layout. No pill, no background.
  A shadow inset by S and offset down Y is `(H − 2S)` tall and sits `(S + Y − H)` below the box, so the numbers
  depend on the link's line box. With `line-height: 18px` pinned: `box-shadow: 0 17px 0 -8px var(--accent-regular)`.
  *(The originally quoted `0 9px 0 -7px` only resolves to 2px on a 16px-tall box, and puts the rule flush against
  the text rather than 7px under it.)*
- **Hover (non-current):** the existing global sweep, but in `--gray-400` — *not* the accent. Green underline = here; grey underline = interactive. Current page keeps `background-image: none`.
- **Search trigger:** `<Icon icon="search" />` + `<kbd>⌘K</kbd>`, no background, no border, `--gray-400` → `--gray-0` on hover. The word “Search” is hidden at **every** width and the control is named by `aria-label`; the kbd is hidden <50em.
  *(Revised in build. Spelling “Search” out below 50em pushes the four 44px targets in tier 1 past the width of a
  phone, and all three header mockups show the icon alone.)*
- **Theme toggle:** keep `ThemeToggle.astro`'s two-cell slider, its `aria-pressed` and its sr-only label. Shrink each `.icon` to 1.375rem, recolour the sliding `::before` to `--surface` with `--gray-800` as the track, inactive icon `--gray-400`, active `--gray-0`. Icons stay `sun` and `moon-stars` from `IconPaths.ts`. Below 50em, replace with a single 44px button showing the target state.

### Breakpoints

| Width | Behaviour |
|---|---|
| ≥ 62em | Both tiers, tagline visible, tier 2 centred. Total 96px. |
| 50–62em | Tagline `display:none`. Tier 2 switches to **left-aligned** and scrolls horizontally (`overflow-x:auto; scrollbar-width:none`). **Never wrap to a third row.** *(Left-aligned, not centred: centred flex content clips past the left edge and cannot be scrolled back to.)* |
| < 50em | Tier 2 becomes the existing `menu-button` sheet. Tier 1 is 52px: wordmark + search icon + single-button toggle + menu button, each a 44px target. Inside the sheet: full labels, 44px rows, and “here” marked by the 3px **left** bar instead of an underline (an underline doesn't read in a vertical list). |

### Accessibility

- `aria-current="page"` stays the source of truth for the underline.
- Focus ring: `outline: 2px solid var(--gray-0); outline-offset: 2px` — ink, not accent, so focus never reads as “current”.
- Keep the `<noscript>` link list.

---

## 6 · Components — `src/styles/components.css`

- **Buttons.** `.btn-primary`: `background var(--action); color var(--action-text); border-color var(--action)`. `.btn-outline`: `color`/`border` `var(--gray-0)`, hover fills `var(--action)`. Keep square corners and the lift.
- **Surfaces.** `.surface`, `.project-card`, `.blog-card`, `.travel-card`: `background: var(--surface)` (not `--gray-999`) so cards separate from the page in both themes. Bar placement unchanged.
- **Status pills.** `ongoing` → `--accent-tint` bg + `--accent-dark` text; `released` → `--status-alt-tint` + `--status-alt`; `complete` → `--gray-800` + `--gray-100`. All `--font-data`, weight 500, lowercase.
- **Tags.** `--gray-800` bg, `--gray-100` text, `--font-data` 0.6875rem, radius 4px — everywhere, including `.meta-section .tag`, which currently fills with accent.
- **Deprecated.** Delete `.project-link` and `.project-link-btn`; migrate their markup to `.btn .btn-outline .btn-sm`. Two button classes, not four.

---

## 7 · Content presentation — five moves

1. **Taxon italics** (§3) across projects, publications, tools and news — authored by hand as
   `<i class='taxon'>…</i>`, no remark plugin and no helper. 19 occurrences in 12 content files plus 4 lines of
   CV prose. 
   **Single quotes inside the attribute, always.** These strings live in YAML frontmatter, where an inner
   double quote terminates the value and breaks the build.

   **Three plain-text sinks must strip the markup**, or the tags appear as literal text:
   - `MainHead.astro` — a one-line `plain()` helper wraps `<title>` and the meta description.
   - `ask-context.txt.ts` — the existing `clean()` helper gains a tag strip, covering all seven collections.
   - Every render site for an affected field switches from `{value}` to `set:html={value}`: the three
     publication lists, the outreach event title and description, the project detail title and description,
     the CV's three "related work" link lists, the homepage publication preview, and `ProjectCard`
     (one edit covering five pages).

   Pagefind indexes rendered text, so `<i>` is transparent to search.
2. **Provenance strip on project cards.** A `--font-data` two-column grid — *focus / source / stack / output* —
   as a `<dl>` **below** the meta line, not replacing it. Four optional fields added to the projects collection
   in `src/content.config.ts` and authored for all seven projects from facts already in their prose.

   *(Revised in build: `meta` is the only date a project card carries — "2023 - Present", "Open Source • 2020".
   Deleting it to make room would take every date off the card, and §3 puts all dates in the data role. So
   `.project-meta` is retyped as a date — `--font-data`, 11px, weight 500, `--accent-regular` — and the
   provenance strip sits under it.)*
3. ~~**Scale band under the hero.**~~ **Dropped at the client's request** after seeing it
   built. Four numbers under the hero read as marketing on a personal research site; the
   same figures already appear in the project cards' provenance strips, where they are
   attached to the work that produced them.


4. ~~**One canvas per section.**~~ **Dropped — one canvas everywhere.** `BACKGROUND` stays the single
   constant `'phylogram'`; there is no route→variant map. *(Decided during the build: a background that changes
   as you navigate reads as a different site, not a different section.)*

   The **accent fix still happens**, in all four canvases: the hardcoded `const amber = isDark ? '#d4a574' :
   '#c9925e'` is replaced by a read of `--accent-regular` off `document.documentElement`, so the canvas follows
   the theme forever. `draw()` runs at 24fps and `getComputedStyle` forces a style recalc, so the value is
   memoised per theme and read at most twice per session. The variable is renamed `accent` — it is not amber
   any more. `Alignment`'s canvas font string also moves from `"Fira Code"` to `"IBM Plex Mono"`.
5. **One tag vocabulary.** Tags are namespaced `method:` / `organism:` / `data:`, shared by projects, tools and
   publications, so a tag can become a cross-collection filter later. `tagValue()` in `src/tags.ts` renders the
   value only. `tools` and `publications` gain an optional `tags` array; the seven projects are re-tagged.

   **Languages and frameworks are not tags.** `R`, `Python`, `Shiny`, `Shell`, `Nextflow` were dropped from
   `tags` — they are stack, and the new `stack` provenance field carries them. A language is not a facet you
   would ever filter a publication by.

   `thoughts` keeps its own un-namespaced vocabulary ("Field Work", "Work-Life Balance"): it is personal
   writing with a live filter UI, not research metadata.

---

## 8 · Order of work

1. Tokens + fonts in `global.css`; delete the gradient vars. The whole site shifts at once — review before continuing.
2. Type roles: headings to serif, all dates/tags/counts to `--font-data`, then the size table.
3. Accent budget: the removal list in §4, then the component edits in §6.
4. Header rewrite (§5) with all three breakpoints.
5. Canvas accent + per-section mapping.
6. Content moves 1, 2, 3, then 5.

---

## 8b · Two findings from the codebase

**`--text-xs` was used but never defined.** Thirteen declarations referenced `var(--text-xs)` — in the nav,
the footer, the CV, tools, outreach and the search palette — with no such token in `global.css`. Every one of
them was an invalid declaration, so those elements silently inherited their parent's size. Defining
`--text-xs: 0.6875rem` in §2 makes all thirteen take effect at once.

**`index.astro`'s hero `::before` references five undefined variables** (`--bg-image-subtle-1/2`, `--bg-scale`,
`--bg-gradient-size`, `--bg-blend-mode`). It paints noise over `--gray-999` and nothing else. Left alone —
out of scope for this pass, but it is dead decoration and should be deleted or finished.

---

## 9 · Acceptance checklist

- [ ] No screen shows more than one green filled element.
- [ ] No heading is set in a monospace; no date is set in the serif.
- [ ] Header is 96px ≥62em, 52px <50em, and never wraps to three rows.
- [ ] Every interactive target <50em is ≥44px.
- [ ] Green underline appears only under the current section; hover underlines are grey.
- [ ] Canvas tips match `--accent-regular` in both themes, verified by toggling.
- [ ] Cards are visibly above the page background in dark mode.
- [ ] Every organism name on the site is italic, at every rank.
- [ ] No `--gradient-*` variable remains in the codebase.
- [ ] Contrast: body text ≥ 7:1, meta text ≥ 4.5:1, in both themes.

---

## Appendix A · Decisions taken during the build

Recorded here so the doc and the site agree.

| # | Decision | Why |
|---|---|---|
| 1 | Green fills the spec never named — `CallToAction` (×3 on the homepage), `BackToTop`, `Pill`, `SearchPalette`'s active mode, `tools` `.signal`, `publications` `.pub-link`, `cv` `.toc-toggle`, the filter chips, `outreach`'s `.event-link` and `.select-option` — all go to ink. | Acceptance item 1 ("no more than one green filled element per screen") cannot pass otherwise; the homepage alone had four. |
| 2 | `outreach`'s eight `.event-type` hues collapse to accent / clay / neutral. | Seven arbitrary hex values belonging to no palette on the site. |
| 3 | `--surface` applied to 28 further page-scoped card rules. | The rule was written against `components.css` only; without this, most cards on most pages stay level with the page in dark mode. |
| 4 | Tier 2 is centred, 1rem, 42px — header 96px, not 92px. | Left-aligned 13px read as a caption under the wordmark rather than as navigation. |
| 5 | The "you are here" box-shadow is `0 17px 0 -8px` on an 18px line box. | The quoted `0 9px 0 -7px` resolves to 2px only on a 16px box, and sits flush against the text rather than 7px below. |
| 6 | The word "Search" is hidden at every width. | Four 44px targets plus a spelled-out label overflow a phone; all three mockups show the icon alone. |
| 7 | One canvas everywhere; §7 move 4 dropped. | A background that changes as you navigate reads as a different site. |
| 8 | `.project-meta` is retyped as a date rather than replaced by the provenance strip. | It is the only date on a project card, and §3 puts all dates in the data role. |
| 9 | `.view-all-link` is ink, resolving a contradiction between §3's table (accent) and §4's removal list (ink). | §4 is the specific instruction about accent, so it wins. `.read-more` keeps the accent. |
| 10 | Standalone genus names are italic. | A genus is italic under ICNP; §3 names only phylum, class, family and order as roman. |
| 11 | Languages and frameworks dropped from `tags`. | They are `stack`, and a language is not a facet you would filter a publication by. |
| 12 | **Software names keep the data face** — `rRNADif`, `BGCViz`, `bigscape-pfam-explorer` — even where they sit in an `<h3>` (the existing `.mono` class, on `tools` and CV tool entries). | The one deliberate exception to "no heading in a monospace". These are literal package and command names, the same class of thing as the accession numbers §3 already assigns to the data role; setting `bigscape-pfam-explorer` in a serif reads as prose about a tool rather than as the tool's name. **Flagged for review** — if you disagree, deleting the `.mono` class from the two `tools.astro` headings and `cv.astro:259` is the whole change. |
| 13 | The hero scale band (§7 move 3) is dropped. | Client's call after seeing it: it reads as marketing, and the numbers already live in the provenance strips. |
| 14 | `publications` `.pub-link`, `outreach` `.event-link` and `cv` `.consortium-link` all become `.btn .btn-outline .btn-sm`. | "Two button classes, not four" — §6 named only `.project-link` and `.project-link-btn`, but five one-off button classes existed. `.consortium-link` also carried two off-palette brand hues (`#5da3d5`, `#6bb8a7`). |
| 15 | The CV **Profile** section gets the same surface as every other CV block. | It was the one section whose prose sat directly on the page while everything below it was a white card, so the page appeared to start unstyled. |
| 16 | The eyebrow is added to all 13 `.page-header` pages, naming the *kind* of page rather than repeating the title. | §3 specifies the pattern "above every page title" but nothing rendered it; the class was defined and unused. |
| 17 | Two **pre-existing** layout bugs fixed, both exposed rather than caused by the redesign. | (a) Every centred content wrapper (`.projects-content`, `.blog-list`, 10 more) is a flex child of a `.stack`; auto inline margins make a flex item shrink to fit-content, so `max-width` never applied and card grids collapsed to one column. Fixed with `width: 100%`. (b) `.project-header` named two different things — a detail page's `<header>` and a `<div>` inside every project card — so the detail rule centred short card titles and capped cards at 50rem. Fixed by qualifying the detail rule with `header.`, which also removed the two `!important`s that were working around it. |
| 18 | The provenance strip's first field is `focus`, not `clade`. | "Clade" is only true for the phylum-scoped projects; BGCViz's subject is bacterial BGCs and rRNADif's is a 21,000-genome reference set, neither of which is a clade in any scientific sense. |
| 19 | The hero drops to one filled button plus two accent text links. | Three boxes of equal weight gave the eye nowhere to land. The arrow cue carries the secondary actions, and the accent budget is unchanged — text links were already allowed the accent. |
| 20 | Fixed a pre-existing typo: *Streptomyces cyangenus* → *cyanogenus*, in the Master's thesis project's `focus` and body. | A misspelt species name on a microbial-genomics site. |
| 21 | Taxonomy is italic at **every rank**, superseding decision 10 and §3's original "phylum, class, family and order roman". | Client's call. Consistency beats the typographic convention here: a reader scanning the site sees organism names as one visual class, and the mixed rule made *Acidobacteriota* look like an oversight beside *Geodia barretti*. 37 further names wrapped; `organism:` tag values are italicised at render time rather than in the data. |
| 22 | The hero states the role in one green mono line above the name — "Computational biologist, PhD, Microbial genomics" — and the separate tagline below the name is gone. | Client's call. It matches the CV's `.availability` treatment, so both pages state the role in the same voice, and it removes a third near-repetition of "computational biologist" from the first viewport. |

## Appendix B · What was diagnosed

- `--accent-regular` was `#4a4a4a` — a grey. The site's whole rule system is built around a 3px accent bar that therefore carried no signal.
- Fira Code was `--font-brand`, so a monospace set every heading up to 4.5rem. That reads “terminal”, which fights the warm, human half of the brief.
- The header cost ~104px because eight links, a labelled search control and a two-cell toggle each sat in their own radial-gradient pill.
- `ThemeToggle.astro`'s sliding `::before` was filled `--accent-regular` — a green fill spent on a utility.
- The phylogram/alignment/BGC canvases hardcode amber tips (`#c9925e` / `#d4a574`) that belong to no colour scheme on the site.
- Six `--gradient-*` variables all alias flat greys and only cost reading time.

