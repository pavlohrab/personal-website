# Quick Start Guide

## Adding Content to Your Portfolio

Everything uses **Content Collections** - just create markdown files and they automatically appear on your site!

---

## 📝 Add a Blog Post (Thought)

1. Create a file: `src/content/thoughts/my-post.md`
2. Add this at the top:

```markdown
---
title: "My Post Title"
date: "November 2024"
excerpt: "A brief summary..."
publishedDate: 2024-11-15
tags: ["Tag1", "Tag2"]
draft: false
---

## Your content here

Write anything using Markdown!
```

3. **That's it!** Your post appears at `/beyond/thoughts/`

---

## 🌍 Add an Adventure Story

1. Create a file: `src/content/adventures/my-trip.md`
2. Add this at the top:

```markdown
---
title: "My Amazing Trip"
location: "Location, Country"
description: "Brief description..."
date: "Summer 2024"
publishedDate: 2024-08-01
draft: false
---

## The Journey

Write your adventure story here!
```

3. **That's it!** Your adventure appears at `/beyond/adventures/`

---

## 🔬 Add a Project

1. Create a file: `src/content/projects/my-project.md`
2. Add this at the top:

```markdown
---
title: "My Research Project"
status: ongoing
meta: "2024 - Present"
description: "Brief description..."
tags: ["Tag1", "Tag2"]
category: research
order: 1
featured: true
links:
  - label: "GitHub"
    href: "https://github.com/..."
---

## Project Details

Write about your project here!
```

3. **That's it!** Your project appears at `/projects/`

---

## Key Points

- **No coding required** - Just create markdown files
- **Automatic pages** - Each file gets its own page automatically
- **Sorted automatically** - Newest content appears first
- **Draft mode** - Set `draft: true` to hide content while working on it
- **Categories** - Projects have categories (research/software/archive)
- **Tags** - Add tags to organize content

---

## File Locations

```
src/content/
├── thoughts/        ← Blog posts
├── adventures/      ← Travel stories
└── projects/        ← Research projects
```

---

## Need More Help?

See `CONTENT_MANAGEMENT.md` for detailed documentation with examples and all available options.
