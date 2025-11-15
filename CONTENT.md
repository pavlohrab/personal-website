# Content Management Guide

This guide explains how to add, edit, and manage content on your portfolio website.

## Table of Contents

- [Content Structure](#content-structure)
- [Adding New Content](#adding-new-content)
  - [Projects](#projects)
  - [Thoughts (Blog Posts)](#thoughts-blog-posts)
  - [Adventures](#adventures)
  - [Publications](#publications)
  - [News](#news)
- [Projects Categories & Homepage Display](#projects-categories--homepage-display)
- [Tags and Filtering](#tags-and-filtering)
- [Search Functionality](#search-functionality)
- [Publishing and Drafts](#publishing-and-drafts)
- [Frontmatter Reference](#frontmatter-reference)

## Content Structure

Your content is organized in the `src/content/` directory:

```
src/content/
├── projects/       # Research projects and development work
├── thoughts/       # Blog posts, essays, and reflections
├── adventures/     # Field work, travel, and hiking experiences
├── publications/   # Research papers and academic publications
└── news/          # News items, talks, and updates
```

Each piece of content is a Markdown (.md) file with frontmatter metadata at the top.

## Adding New Content

### Projects

**Location:** `src/content/projects/`

**To add a new project:**

1. Create a new `.md` file in `src/content/projects/`
2. Use kebab-case for the filename (e.g., `my-new-project.md`)
3. Add frontmatter and content:

```markdown
---
title: "Your Project Title"
status: ongoing
meta: "2024 - Present"
description: "A brief description of your project that appears in project cards"
tags: ["Bioinformatics", "Machine Learning", "Genomics"]
links:
  - label: "GitHub"
    href: "https://github.com/yourusername/yourproject"
  - label: "Documentation"
    href: "https://docs.yourproject.com"
  - label: "Paper"
    href: "https://doi.org/10.xxxx/xxxxx"
featured: true
category: research
order: 1
publishedDate: 2024-10-15
draft: false
---

## Project Overview

Your detailed project content goes here...

## Key Findings

More content...
```

**Field Explanations:**
- `title`: Project name (required)
- `status`: `ongoing`, `complete`, or `released` (required)
- `meta`: Timeline or date range (required)
- `description`: Short summary for cards (required)
- `tags`: Array of tags for categorization (optional)
- `links`: Array of {label, href} objects (optional)
- `featured`: Show on homepage (true/false)
- `category`: `research`, `software`, `teaching`, etc. (required)
- `order`: Display order (lower numbers first)
- `publishedDate`: YYYY-MM-DD format for sorting (optional)
- `draft`: Hide from site when `true` (default: false)

### Thoughts (Blog Posts)

**Location:** `src/content/thoughts/`

**To add a new blog post:**

1. Create a new `.md` file in `src/content/thoughts/`
2. Use kebab-case for the filename (e.g., `my-blog-post.md`)
3. Add frontmatter and content:

```markdown
---
title: "Your Blog Post Title"
date: "October 2024"
excerpt: "A compelling excerpt that appears in the blog post cards"
publishedDate: 2024-10-15
tags: ["Bioinformatics", "Coding", "Research"]
draft: false
---

## Your First Section

Your blog post content goes here...

## Another Section

More content...
```

**Field Explanations:**
- `title`: Post title (required)
- `date`: Human-readable date (e.g., "October 2024") (required)
- `excerpt`: Short summary for cards (required)
- `publishedDate`: YYYY-MM-DD format for sorting (required)
- `tags`: Array of tags for filtering (optional)
- `draft`: Hide from site when `true` (default: false)

### Adventures

**Location:** `src/content/adventures/`

**To add a new adventure:**

1. Create a new `.md` file in `src/content/adventures/`
2. Use kebab-case for the filename (e.g., `field-expedition.md`)
3. Add frontmatter and content:

```markdown
---
title: "Your Adventure Title"
location: "Location, Country"
description: "Brief description of the adventure"
category: field-work
date: "2024"
publishedDate: 2024-10-01
draft: false
---

## The Story

Your adventure narrative goes here...

## Photos

You can include photos and more content...
```

**Field Explanations:**
- `title`: Adventure name (required)
- `location`: Where it happened (required)
- `description`: Short summary for cards (required)
- `category`: `field-work`, `hiking`, `travel`, or `personal` (required)
- `date`: Human-readable date (required)
- `publishedDate`: YYYY-MM-DD format for sorting (required)
- `draft`: Hide from site when `true` (default: false)

**Available Categories:**
- `field-work`: Scientific field work and research expeditions
- `hiking`: Hiking and mountain experiences
- `travel`: General travel experiences
- `personal`: Personal trips and experiences

### Publications

**Location:** `src/content/publications/`

**To add a new publication:**

1. Create a new `.md` file in `src/content/publications/`
2. Use kebab-case for the filename (e.g., `my-paper-2024.md`)
3. Add frontmatter and content:

```markdown
---
title: "Your Paper Title"
authors: "Author 1, Author 2, Author 3"
venue: "Journal Name or Conference"
year: 2024
publishedDate: 2024-06-15
type: journal
url: "https://doi.org/10.xxxx/xxxxx"
doi: "10.xxxx/xxxxx"
links:
  - label: "Code"
    href: "https://github.com/yourusername/yourcode"
  - label: "Data"
    href: "https://doi.org/10.xxxx/data"
featured: true
draft: false
---

Optional: Add abstract or additional details here.
```

**Field Explanations:**
- `title`: Full paper title (required)
- `authors`: Formatted author list as string (required) - Use `<strong>Your Name</strong>` to highlight your name
- `venue`: Journal or conference name (required)
- `year`: Publication year (required)
- `publishedDate`: YYYY-MM-DD format for sorting (required)
- `type`: `journal`, `conference`, or `preprint` (default: journal)
- `url`: Link to paper (optional)
- `doi`: DOI identifier (optional)
- `links`: Additional links like Code, Data, Slides, etc. (optional)
- `featured`: Show on homepage when `true` (default: false)
- `draft`: Hide from site when `true` (default: false)

**Homepage Display:**
- Publications with `featured: true` appear on the homepage (up to 3)
- Sorted by `publishedDate` (newest first)
- Control which publications appear by setting `featured: true`

**Publications Page (`/publications/`):**
- Automatically grouped by type (Journal Articles, Conference Papers, Preprints)
- All non-draft publications are shown
- Sorted by `publishedDate` within each type

### News

**Location:** `src/content/news/`

**To add a news item:**

1. Create a new `.md` file in `src/content/news/`
2. Use kebab-case for the filename (e.g., `conference-talk-2024.md`)
3. Add frontmatter and content:

```markdown
---
title: "News Item Title"
date: "October 2024"
description: "Brief description of the news item"
publishedDate: 2024-10-15
draft: false
---

Optional: Add full article content here for a detail page.

Leave empty for a simple news item without a detail page.
```

**Field Explanations:**
- `title`: News headline (required)
- `date`: Human-readable date (e.g., "October 2024") (required)
- `description`: Brief description shown on list pages and homepage (required)
- `publishedDate`: YYYY-MM-DD format for sorting (required)
- `draft`: Hide from site when `true` (default: false)

**Detail Pages (Optional):**
- If the markdown body contains content, the news item becomes clickable
- A detail page is automatically created at `/news/[filename]/`
- If the body is empty, the news item is displayed only on list pages (not clickable)

**Homepage Display:**
- Latest 3 news items appear on the homepage
- Sorted by `publishedDate` (newest first)
- Clickable if they have body content

**News Archive Page (`/news/`):**
- All non-draft news items are shown
- Grouped by year
- Sorted by `publishedDate` (newest first)
- Clickable if they have body content

## Projects Categories & Homepage Display

### How Projects Appear on Pages

Projects use a category-based system to control where they appear:

**On `/projects/` (Projects Archive Page):**
- **Featured Projects**: Projects with `featured: true` AND `category: "research"`
- **Software & Tools**: Projects with `category: "software"` (shows first 3)
- **Past Projects**: Projects with `category: "archive"` (shows first 2)

**On Homepage (`/`):**
- Shows up to 4 projects with `featured: true`
- Sorted by `order` field (lower numbers first)
- Must have `draft: false`

### Controlling Project Display

In your project's frontmatter:

```yaml
featured: true          # Shows in Featured Projects & on homepage
category: research      # Options: research, software, archive
order: 1               # Lower numbers appear first (homepage & within category)
draft: false           # Must be false to appear anywhere
```

**Categories:**
- `research`: Research projects (can be featured)
- `software`: Software tools and packages
- `archive`: Past or completed projects

**To feature a project on the homepage:**
1. Set `featured: true`
2. Set `category: "research"` (or another category)
3. Set `order` to control position (1, 2, 3, 4...)
4. Set `draft: false`

**No code changes needed** - just edit the `.md` file frontmatter!

## Tags and Filtering

### How Tags Work

Tags are automatically extracted from your content and displayed as filter buttons on archive pages.

**For Thoughts:**
- Tags appear as clickable filter buttons on `/beyond/thoughts/`
- Clicking a tag filters to show only posts with that tag
- Multiple clicks can combine search + tag filtering

**For Projects:**
- Tags are displayed on project detail pages
- Currently shown as labels (filtering coming soon)

**For Adventures:**
- Uses category-based filtering instead of tags
- Categories: Field Work, Hiking, Travel, Personal

### Adding New Tags

**Simply add them to your frontmatter!** No code changes needed.

```markdown
tags: ["Bioinformatics", "My New Tag", "Another Tag"]
```

The new tags will automatically:
1. Appear in the tag filter buttons
2. Be sorted alphabetically
3. Work with the filtering system
4. Be case-sensitive (use consistent capitalization)

**Tag Best Practices:**
- Use Title Case for consistency
- Keep tags concise (1-2 words)
- Reuse existing tags when possible
- Check existing content for tag naming conventions

**Current Tags in Use:**

*Thoughts:*
- Bioinformatics
- Coding
- Field Work
- Research
- Work-Life Balance

*Projects:*
- Bioinformatics
- Machine Learning
- Genomics
- Python
- R
- Data Analysis

## Search Functionality

### How Search Works

Search is implemented client-side using JavaScript, which means:
- **No page reload** - Results appear instantly as you type
- **Works offline** - Once the page loads, search works without server connection
- **Fast** - Searches only loaded content in your browser

### What Search Looks For

**Thoughts Archive** (`/beyond/thoughts/`)
Searches in:
- Post title
- Excerpt text
- Date

**Adventures Archive** (`/beyond/adventures/`)
Searches in:
- Adventure title
- Description text
- Location

### Search + Filter Combinations

Search works in combination with filters:
1. Select a tag/category filter
2. Type in the search box
3. Results show items matching BOTH the filter AND search query

### Technical Note

Search is case-insensitive and looks for partial matches. For example, searching "bio" will find "Bioinformatics", "biology", and "biotech".

## Publishing and Drafts

### Draft System

Control visibility of your content with the `draft` field:

```markdown
draft: false   # Published - visible on the site
draft: true    # Draft - hidden from site
```

**Draft content:**
- Won't appear in archive pages
- Won't appear on homepage previews
- Can still be accessed directly if you know the URL (during development)
- Won't be built in production deployments

### Publishing Workflow

1. **Create draft:**
   ```markdown
   draft: true
   ```

2. **Write and preview** your content locally

3. **When ready to publish:**
   ```markdown
   draft: false
   publishedDate: 2024-10-15  # Add current date
   ```

4. Commit and push to deploy

### Sorting and Order

Content is sorted by `publishedDate` (newest first) when:
- Displaying on archive pages
- Showing on homepage previews
- No `publishedDate`? Falls back to date: 0 (appears last)

For projects, you can also use the `order` field to manually control display order.

## Frontmatter Reference

### Projects

```yaml
title: string (required)
status: "ongoing" | "complete" | "released" (required)
meta: string (required) - Timeline info
description: string (required)
tags: string[] (optional)
links: {label: string, href: string}[] (optional)
featured: boolean (optional)
category: string (required)
order: number (optional)
publishedDate: YYYY-MM-DD (optional)
draft: boolean (default: false)
```

### Thoughts

```yaml
title: string (required)
date: string (required) - Human-readable
excerpt: string (required)
publishedDate: YYYY-MM-DD (required)
tags: string[] (optional)
draft: boolean (default: false)
```

### Adventures

```yaml
title: string (required)
location: string (required)
description: string (required)
category: "field-work" | "hiking" | "travel" | "personal" (required)
date: string (required) - Human-readable
publishedDate: YYYY-MM-DD (required)
draft: boolean (default: false)
```

### Publications

```yaml
title: string (required)
authors: string (required) - Formatted author string
venue: string (required) - Journal or conference name
year: number (required)
publishedDate: YYYY-MM-DD (required)
type: "journal" | "conference" | "preprint" (default: journal)
url: string (optional) - Link to paper
doi: string (optional) - DOI identifier
links: {label: string, href: string}[] (optional) - Additional links
featured: boolean (default: false) - Show on homepage
draft: boolean (default: false)
```

### News

```yaml
title: string (required)
date: string (required) - Human-readable (e.g., "October 2024")
description: string (required)
publishedDate: YYYY-MM-DD (required)
draft: boolean (default: false)

# Body content (optional):
# - If present, creates a clickable detail page
# - If empty, news item is display-only
```

## Tips and Best Practices

1. **File Naming:** Use kebab-case (lowercase with hyphens): `my-new-post.md`

2. **Dates:** Use ISO format for `publishedDate`: `2024-10-15`

3. **Consistency:** Check existing content for style and formatting conventions

4. **Images:** Place images in `public/` directory and reference with `/path/to/image.jpg`

5. **Links:** Use external links for GitHub, papers, etc. They'll open in new tabs automatically

6. **Preview:** Always preview your content locally before pushing:
   ```bash
   npm run dev
   ```

7. **Markdown:** Standard markdown syntax is supported, including:
   - Headers (##, ###)
   - Lists (-, *)
   - Links ([text](url))
   - Bold (**text**)
   - Italic (*text*)
   - Code blocks (```)

## Need Help?

- Check existing content files for examples
- Refer to the [Astro Content Collections docs](https://docs.astro.build/en/guides/content-collections/)
- Markdown syntax: [CommonMark](https://commonmark.org/help/)
