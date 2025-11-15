# GitHub Pages Deployment Guide

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [GitHub Pages Setup](#github-pages-setup)
3. [Astro Configuration](#astro-configuration)
4. [Deployment Process](#deployment-process)
5. [Custom Domain Setup](#custom-domain-setup-optional)
6. [Security Considerations](#security-considerations)
7. [SEO Optimization](#seo-optimization)
8. [Post-Deployment Testing](#post-deployment-testing)

---

## Pre-Deployment Checklist

### Critical: Replace ALL Placeholder Content
Before deploying, you MUST replace:

- [ ] **Social media URLs** in `src/components/Nav.astro` (lines 19-23)
  - GitHub: `https://github.com/your-username`
  - LinkedIn: `https://linkedin.com/in/your-username`
  - Google Scholar: `https://scholar.google.com/citations?user=your-id`
  - ResearchGate: `https://researchgate.net/profile/your-name`
  - ORCID: `https://orcid.org/0000-0000-0000-0000`

- [ ] **Email address** in `src/pages/contact.astro` (line 20)
  - Change `pavlo.hrab@example.com` to your real institutional email

- [ ] **Social media URLs** in `src/pages/contact.astro` (lines 33-65)
  - Same placeholders as Nav.astro

- [ ] **Profile photo** in `src/pages/index.astro` (line 49-52)
  - Replace placeholder with actual image

- [ ] **CV details** in `src/pages/cv.astro`
  - University/Institution names (multiple locations)
  - Thesis titles
  - Tool names (line 109: "Tool1, Tool2, Tool3")
  - Actual dates and details

- [ ] **Publications** in `src/pages/publications.astro`
  - Real publication titles, authors, venues
  - Working DOI/PDF links (replace all `href="#"`)

- [ ] **Projects** in `src/pages/projects.astro`
  - Real project descriptions
  - GitHub repository links (replace all `href="#"`)

- [ ] **Talks** in `src/pages/talks.astro`
  - Real talk titles and venues
  - Slides/video links (replace all `href="#"`)

- [ ] **Contact page location** in `src/pages/contact.astro` (lines 77-78)
  - Real university name and city/country

### Content Quality Check
- [ ] Verify all research stats on homepage are accurate (15+ publications, 500+ genomes, etc.)
- [ ] Ensure all internal links work
- [ ] Check for typos and grammar
- [ ] Test all interactive elements

### Privacy & Security Check
- [ ] Remove any personal information you don't want public (phone number, home address)
- [ ] Ensure no API keys or secrets are committed to repository
- [ ] Check that `.env` files are in `.gitignore` (if any exist)
- [ ] Review adventure/blog posts for overly personal details

---

## GitHub Pages Setup

### Option 1: User/Organization Site (username.github.io)

**Repository name:** `<username>.github.io`
**URL:** `https://<username>.github.io/`

1. Create a new repository named exactly `<username>.github.io`
2. Make it **public** (required for free GitHub Pages)
3. Do not initialize with README (you'll push existing code)

### Option 2: Project Site (username.github.io/portfolio)

**Repository name:** Any name (e.g., `portfolio` or `academic-website`)
**URL:** `https://<username>.github.io/<repository-name>/`

1. Create a new public repository with any name
2. This requires additional Astro configuration (see below)

---

## Astro Configuration

### For User/Organization Site (username.github.io)

Your `astro.config.mjs` should have:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<username>.github.io',
  // No 'base' needed for user/org sites
});
```

### For Project Site (username.github.io/repository-name)

Your `astro.config.mjs` must include `base`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/repository-name',
});
```

**Important:** With a `base` URL, all internal links must be updated:
- `/contact/` becomes `/repository-name/contact/`
- Use `import.meta.env.BASE_URL` in code for dynamic paths

---

## Deployment Process

### Method 1: GitHub Actions (Recommended)

This is the automated, modern approach.

#### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  # Trigger on push to main branch
  push:
    branches: [ main ]
  # Allow manual trigger from Actions tab
  workflow_dispatch:

# Set permissions for deployment
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Step 2: Configure GitHub Repository

1. Go to repository **Settings** → **Pages**
2. Under **Build and deployment**, select:
   - **Source:** GitHub Actions
3. Save

#### Step 3: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add remote (replace with your URL)
git remote add origin https://github.com/<username>/<repository>.git

# Stage all files
git add .

# Commit
git commit -m "Initial commit: Academic portfolio website"

# Push to main branch
git push -u origin main
```

The GitHub Action will automatically build and deploy your site!

#### Step 4: Monitor Deployment

1. Go to repository → **Actions** tab
2. Watch the "Deploy to GitHub Pages" workflow
3. If successful, your site is live at `https://<username>.github.io/`

---

### Method 2: Manual Deployment (Not Recommended)

Only use if GitHub Actions won't work for some reason.

```bash
# Build the site locally
npm run build

# Install gh-pages package
npm install -D gh-pages

# Deploy
npx gh-pages -d dist
```

Then configure GitHub Pages to serve from the `gh-pages` branch.

---

## Custom Domain Setup (Optional)

If you own a custom domain (e.g., `pavlohrab.com`):

### Step 1: Add CNAME File

Create `public/CNAME` with your domain:

```
www.pavlohrab.com
```

### Step 2: Configure DNS

In your domain registrar's DNS settings:

**For apex domain (pavlohrab.com):**
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

**For www subdomain:**
```
CNAME www   <username>.github.io.
```

### Step 3: Update Astro Config

```javascript
export default defineConfig({
  site: 'https://www.pavlohrab.com',
});
```

### Step 4: Enable HTTPS

1. Go to repository **Settings** → **Pages**
2. Check **Enforce HTTPS** (wait for SSL certificate to provision)

DNS propagation can take 24-48 hours.

---

## Security Considerations

### What GitHub Pages Is
- **Static hosting only** - No server-side code, no backend, no databases
- **Public by default** - All content is publicly accessible
- **No authentication** - Cannot create password-protected pages

### Security Best Practices

#### 1. **Never Commit Secrets**
- ❌ API keys
- ❌ Database credentials
- ❌ Private keys or certificates
- ❌ OAuth secrets
- ❌ Personal email passwords

**Check before pushing:**
```bash
git log --all --full-history -- "**/*.env*"
git grep -i "api_key\|secret\|password"
```

#### 2. **Sanitize Personal Information**
Before deploying, remove:
- Home address (if in CV)
- Personal phone number
- Detailed location data
- Internal institutional information

Keep:
- Institutional email
- Office/lab location (general)
- Professional social media links

#### 3. **Content Security Policy (CSP)**

Add to `src/components/MainHead.astro`:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               font-src 'self' data:;">
```

This prevents XSS attacks by restricting resource loading.

#### 4. **robots.txt Configuration**

Create `public/robots.txt` to control search engine crawling:

```txt
# Allow all search engines
User-agent: *
Allow: /

# Disallow specific pages if needed
# Disallow: /private-notes/

# Sitemap location
Sitemap: https://<username>.github.io/sitemap-index.xml
```

#### 5. **HTTPS Enforcement**
- GitHub Pages provides free HTTPS via Let's Encrypt
- Always enable "Enforce HTTPS" in repository settings
- Never link to HTTP resources (images, scripts)

#### 6. **Dependency Security**

```bash
# Regularly audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

#### 7. **Git History Cleanup**

If you accidentally committed secrets:

```bash
# Remove sensitive file from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/secret/file" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (DANGEROUS - only do if absolutely necessary)
git push origin --force --all
```

**Better:** Delete repository and create a new one if secrets were exposed.

---

## SEO Optimization

### 1. **Sitemap Generation**

Astro auto-generates sitemaps. Ensure in `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<username>.github.io',
  // Sitemap is generated automatically by Astro
});
```

### 2. **Meta Tags**

Your `MainHead.astro` should include (already implemented):

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title}</title>
<meta name="description" content={description} />

<!-- Open Graph (for social sharing) -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
```

### 3. **Structured Data (JSON-LD)**

Add to `src/pages/index.astro` for better Google understanding:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Pavlo Hrab",
  "jobTitle": "Ph.D. Candidate in Marine Bioinformatics",
  "url": "https://<username>.github.io",
  "sameAs": [
    "https://github.com/<username>",
    "https://linkedin.com/in/<username>",
    "https://scholar.google.com/citations?user=<id>",
    "https://orcid.org/<orcid-id>"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Your University"
  },
  "knowsAbout": ["Marine Biology", "Bioinformatics", "Phylogenetics", "Genomics"]
}
</script>
```

### 4. **Performance Optimization**

```bash
# Test build size
npm run build
ls -lh dist/

# Optimize images before adding to project
# Use WebP format for better compression
```

### 5. **Google Search Console**

After deployment:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property with your site URL
3. Verify ownership (HTML file upload or meta tag)
4. Submit sitemap: `https://<username>.github.io/sitemap-index.xml`

### 6. **Canonical URLs**

Ensure each page has correct canonical URL in `MainHead.astro`:

```html
<link rel="canonical" href={Astro.url} />
```

### 7. **Alt Text for Images**

When adding profile photo:

```html
<img src="/profile.jpg" alt="Pavlo Hrab - Marine Bioinformatics Researcher" />
```

---

## Post-Deployment Testing

### Immediate Checks

1. **Visit your site:** `https://<username>.github.io/`
2. **Test all navigation links**
3. **Check mobile responsiveness** (Chrome DevTools → Device Mode)
4. **Test dark/light theme toggle**
5. **Verify social media links work**
6. **Test contact email link** (opens email client)

### Performance Testing

**PageSpeed Insights:**
https://pagespeed.web.dev/
- Target: 90+ score for both mobile and desktop

**Lighthouse (Chrome DevTools):**
```
Right-click → Inspect → Lighthouse tab → Generate report
```
Check:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Cross-Browser Testing

Test on:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if you have Mac/iPhone)

### Accessibility Testing

**WAVE Tool:**
https://wave.webaim.org/

**Check:**
- All images have alt text
- Proper heading hierarchy (h1 → h2 → h3)
- Color contrast ratios meet WCAG AA standards
- Keyboard navigation works

### SEO Testing

**Check indexing:**
```
site:<username>.github.io
```
in Google (after a few days)

**Validate structured data:**
https://validator.schema.org/

---

## Ongoing Maintenance

### Regular Updates

```bash
# Update dependencies monthly
npm update

# Check for security issues
npm audit

# Rebuild and redeploy
git add .
git commit -m "Update dependencies"
git push
```

### Content Updates

1. Edit content in `src/pages/`
2. Test locally: `npm run dev`
3. Commit and push - GitHub Actions will auto-deploy

### Monitoring

- Check Google Search Console weekly for crawl errors
- Monitor site uptime (GitHub Pages has 99.9% uptime)
- Review Google Analytics if added

---

## Troubleshooting

### Site Not Deploying

1. Check **Actions** tab for error messages
2. Verify repository is **public**
3. Ensure `package.json` has build script: `"build": "astro build"`
4. Check Astro config has correct `site` URL

### 404 Errors on Page Refresh

If using project site (`/repository-name/`), you MUST:
1. Add `base: '/repository-name'` to Astro config
2. Update all internal links

### CSS/JS Not Loading

1. Check browser console for errors
2. Verify all asset paths are relative or use `import.meta.env.BASE_URL`
3. Clear browser cache

### Custom Domain Not Working

1. Wait 24-48 hours for DNS propagation
2. Verify CNAME file exists in `public/` folder
3. Check DNS records in domain registrar

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub (if using gh-pages method)
npm run build && npx gh-pages -d dist

# Check for issues
npm audit
npm run build && ls -lh dist/
```

---

## Security Incident Response

**If you accidentally expose secrets:**

1. **Immediately revoke/rotate** the exposed credential
2. **Remove from git history** (see Git History Cleanup section)
3. **Force push** new history (breaks things for collaborators)
4. **Consider deleting repository** and recreating if severe

**If you're unsure if you exposed something:**
```bash
git log -p | grep -i "password\|secret\|api_key"
```

---

## Resources

- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org Person Schema](https://schema.org/Person)

---

**Last Updated:** October 2025
**Astro Version:** 5.14.5
**Node Version:** 20.x
