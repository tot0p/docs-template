# Getting Started with the Documentation Template

This documentation template is built with [Eleventy (11ty)](https://www.11ty.dev/) and provides a simple, fast, and customizable way to create documentation websites.

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Creating Documentation](#creating-documentation)
5. [Configuration](#configuration)
6. [Customization](#customization)
7. [Building and Deploying](#building-and-deploying)
8. [Examples](#examples)

---

## Overview

This template provides:
- 📝 Markdown-based content
- 🎨 Clean, responsive design
- 🔍 Built-in search functionality (recherche en temps réel)
- 📱 Mobile-friendly navigation
- ⚡ Fast static site generation
- 🌙 Dark mode support (automatique + manuel)
- 🚀 Automatic deployment to GitHub Pages
- 🖼️ Image and media support
- 🎯 Customizable site branding (logo + title)
- 📦 Path prefix support for subdirectory hosting

---

## Project Structure

```
docs-template/
├── assets/
│   ├── docs/              # Your markdown documentation files
│   │   └── docs.json      # Configuration for docs
│   └── img/               # Images for documentation
├── _includes/             # Layout templates
│   ├── base.njk          # Main layout with full navigation
│   ├── doc.njk           # Documentation page layout
│   └── nav-item.njk      # Navigation item template
├── _data/
│   └── navigation.js     # Auto-generated navigation menu
├── src/
│   ├── css/              # Stylesheets
│   │   └── style.css     # Main stylesheet with dark mode
│   └── js/               # JavaScript files
│       └── main.js       # Navigation, search, dark mode logic
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions deployment
├── _site/                # Generated site (after build)
├── index.md              # Homepage
├── package.json          # Dependencies and scripts
├── .eleventy.js          # Eleventy configuration
└── search-index.njk      # Search index generator
```

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone or download this template**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

---

## Creating Documentation

### Adding a New Page

1. **Create a markdown file** in `assets/docs/`:
   ```
   assets/docs/My-New-Doc.md
   ```

2. **Add front matter** at the top of the file:
   ```markdown
   ---
   layout: doc.njk
   title: "My New Documentation Page"
   ---
   
   # My New Documentation Page
   
   Your content here...
   ```

3. **The page is automatically generated** at `/docs/My-New-Doc/`

### Adding Images and Media

1. **Place images** in `assets/img/`:
   ```
   assets/img/
   ├── screenshot.png
   ├── diagram.jpg
   └── logo.svg
   ```

2. **Reference images in markdown**:
   ```markdown
   ![Alt text]({{ '/img/screenshot.png' | url }})
   
   # Or with relative path
   ![Diagram]({{ '/img/diagram.jpg' | url }})
   ```

3. **Example with caption**:
   ```markdown
   ![Architecture Diagram]({{ '/img/architecture.png' | url }})
   *Figure 1: System Architecture Overview*
   ```

4. **Supported formats**:
   - Images: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`
   - Videos: Embed via HTML
   - PDFs: Link directly

5. **Image best practices**:
   - Use descriptive alt text for accessibility
   - Optimize images before uploading (compress, resize)
   - Use `.webp` for better performance
   - Keep images under 1MB when possible

### Creating Nested Documentation

Create folders to organize your documentation:

```
assets/docs/
├── Getting-Started.md
├── User-Guide/
│   ├── Installation.md
│   └── Configuration.md
└── API-Reference/
    ├── Authentication.md
    └── Endpoints.md
```

---

## Configuration

### Site Branding

Configure your site title and logo in `.eleventy.js`:

```javascript
module.exports = function(eleventyConfig) {
  // Site configuration - Change these values
  eleventyConfig.addGlobalData("siteTitle", "docs-template");
  eleventyConfig.addGlobalData("siteLogo", "📖");
  
  // ... rest of configuration
}
```

These variables are automatically used in:
- Page title tags (`<title>`)
- Navigation header
- All layout templates

### Path Prefix Configuration

For hosting in a subdirectory (e.g., `username.github.io/my-docs/`):

**Option 1: Environment variable (recommended)**

```bash
# Development (local)
npm start

# Production build with prefix
PREFIX=/my-docs/ npm run build
```

**Option 2: GitHub repository variable**

Set `PATH_PREFIX` in your repository settings:
- Go to Settings → Secrets and variables → Actions → Variables
- Create variable: `PATH_PREFIX` = `/your-repo-name/`
- The GitHub Action will use it automatically

The pathPrefix is configured in `.eleventy.js`:
```javascript
return {
  pathPrefix: process.env.PREFIX || '/',
  // ...
};
```

### Navigation Menu

The navigation is **automatically generated** from your `assets/docs/` folder structure.

Files and folders are displayed in alphabetical order:
- Folders appear as expandable dropdowns
- Markdown files appear as direct links
- Supports up to 4 levels of nesting

To customize titles, rename your files using kebab-case:
- `User-Guide.md` → "User Guide"
- `API-Reference.md` → "API Reference"

### Homepage

Edit `index.md` to customize the homepage content:

```markdown
---
layout: base.njk
title: "Your Documentation Portal"
---

<div class="hero">
  <h1>{{ title }}</h1>
  <p>Welcome message here</p>
</div>

<div class="content-grid">
  <!-- Your content cards -->
</div>
```

### Docs Configuration

Edit `assets/docs/docs.json` to set default values for all documentation pages:

```json
{
  "layout": "doc.njk",
  "tags": "docs",
  "permalink": "/docs/{{ page.filePathStem | replace('assets/docs/', '') }}/index.html"
}
```

---

## Customization

### Dark Mode

The template includes automatic dark mode support:

**Features:**
- Automatic detection via `prefers-color-scheme`
- Manual toggle button in the navigation
- Persistent user preference (saved in localStorage)
- Custom colors for light and dark themes

**Customizing colors:**

Edit `src/css/style.css`:

```css
/* Light mode colors */
:root {
  --primary-color: #2563eb;
  --background: #ffffff;
  --surface: #f8fafc;
  --text-primary: #1e293b;
}

/* Dark mode colors */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f172a;
    --surface: #1e293b;
    --text-primary: #f1f5f9;
  }
}
```

**Toggle behavior:**
- First visit: Uses system preference
- After manual toggle: Remembers user choice
- Clear localStorage to reset

### Search Functionality

The built-in search is powered by a generated index:

**How it works:**
1. `search-index.njk` generates a JSON file during build
2. JavaScript loads the index on page load
3. Real-time search as you type
4. Searches titles, content, and headings

**Customizing search:**

Edit `search-index.njk` to change what's indexed:

```nunjucks
{
  "documents": [
    {%- for page in collections.docs -%}
    {
      "title": "{{ page.data.title }}",
      "url": "{{ page.url }}",
      "content": {{ content | striptags | dump }},
      "sections": [...]
    }
    {%- endfor -%}
  ]
}
```

**Search features:**
- Searches in page titles (higher priority)
- Searches in page content
- Searches in section headings with anchor links
- Highlights matching terms
- Shows relevant excerpts

### Styling

Edit `src/css/style.css` to customize the appearance:

```css
/* Example: Change primary color */
:root {
  --primary-color: #0066cc;
  --text-color: #333;
  --background-color: #ffffff;
}
```

### JavaScript

Add custom JavaScript in `src/js/main.js`:

```javascript
// Example: Add custom functionality
document.addEventListener('DOMContentLoaded', function() {
  // Your code here
});
```

### Layout Templates

Modify layouts in `_includes/`:

- `base.njk` - Main layout with full navigation, search, and dark mode
- `doc.njk` - Documentation page layout (extends base.njk)
- `nav-item.njk` - Reusable navigation item component

**Note:** `base-clean.njk` has been removed as it's no longer needed.

---

## Building and Deploying

### Build for Production

```bash
npm run build
```

This generates the static site in the `_site/` directory.

**Build with path prefix:**

```bash
PREFIX=/my-docs/ npm run build
```

### Development Server

```bash
npm start
```

Runs a local server with live reload at `http://localhost:8080`

### Automatic Deployment to GitHub Pages

This template includes a GitHub Action for automatic deployment:

**Setup:**

1. **Push your repository to GitHub**

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Build and deployment":
     - Source: Select **"GitHub Actions"**

3. **Configure path prefix (if needed)**
   - Go to Settings → Secrets and variables → Actions → Variables
   - Add variable: `PATH_PREFIX` with value like `/your-repo-name/`
   - Or let it auto-detect from repository name

4. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy documentation"
   git push
   ```

5. **Site will be automatically deployed**
   - Workflow runs on every push to `main`
   - Builds the site with correct path prefix
   - Deploys to `gh-pages` branch
   - Available at: `https://username.github.io/repository-name/`

**GitHub Action workflow** (`.github/workflows/deploy.yml`):
- Automatically detects repository name for path prefix
- Uses environment variable `PREFIX` during build
- Supports custom CNAME for custom domains
- Deploys to `gh-pages` branch

**Custom domain:**

Edit `.github/workflows/deploy.yml` to change the CNAME:

```yaml
# CNAME file
echo "yourdomain.com" > CNAME
```

### Deployment Options

The generated `_site/` folder can be deployed to:

- **GitHub Pages (Recommended)**
  - Automatic via GitHub Actions (included)
  - See "Automatic Deployment" section above

- **Netlify**
  - Connect your repository
  - Build command: `npm run build`
  - Publish directory: `_site`
  - Environment variable: `PREFIX=/` (or leave empty)

- **Vercel**
  - Import project
  - Framework preset: Other
  - Build command: `npm run build`
  - Output directory: `_site`

- **Any static hosting**
  - Upload contents of `_site/` folder
  - Configure web server for clean URLs

---

## Examples

### Example 1: Page with Images

**File:** `assets/docs/Tutorial.md`

```markdown
---
layout: doc.njk
title: "Tutorial with Images"
---

# Tutorial with Images

## Overview

This tutorial demonstrates how to use images in your documentation.

## Adding Screenshots

Here's a screenshot of the interface:

![Application Interface]({{ '/img/screenshot.png' | url }})
*Figure 1: Main application interface*

## Diagram Example

The following diagram shows the architecture:

![System Architecture]({{ '/img/architecture.svg' | url }})

## Multiple Images in a Row

You can use HTML for more control:

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
  <div>
    <img src="{{ '/img/before.png' | url }}" alt="Before">
    <p><em>Before</em></p>
  </div>
  <div>
    <img src="{{ '/img/after.png' | url }}" alt="After">
    <p><em>After</em></p>
  </div>
</div>

## Tips

- Always use descriptive alt text
- Keep images optimized (< 1MB)
- Use {{ '/img/path' | url }} for proper path handling
```

### Example 2: Simple Documentation Page

**File:** `assets/docs/Quick-Start.md`

```markdown
---
layout: doc.njk
title: "Quick Start Guide"
---

# Quick Start Guide

## Introduction

Welcome to the quick start guide. This will help you get up and running quickly.

## Step 1: Installation

Install the required dependencies:

\`\`\`bash
npm install
\`\`\`

## Step 2: Configuration

Create a configuration file:

\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0"
}
\`\`\`

## Step 3: Run

Start the application:

\`\`\`bash
npm start
\`\`\`

## Next Steps

- [Read the full documentation]({{ '/docs/User-Guide/' | url }})
- [Check the API reference]({{ '/docs/API-Reference/' | url }})
```

---

### Example 2: Documentation with Code Examples

**File:** `assets/docs/API-Example.md`

```markdown
---
layout: doc.njk
title: "API Examples"
---

# API Examples

## Authentication

All API requests require authentication:

\`\`\`javascript
const apiKey = 'your-api-key';
const headers = {
  'Authorization': `Bearer ${apiKey}`
};
\`\`\`

## Making Requests

### GET Request

\`\`\`javascript
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: headers
})
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

### POST Request

\`\`\`javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Error Handling

\`\`\`javascript
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error:', error);
  });
\`\`\`
```

---

### Example 3: Documentation with Tables and Lists

**File:** `assets/docs/Configuration-Options.md`

```markdown
---
layout: doc.njk
title: "Configuration Options"
---

# Configuration Options

## Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `port` | number | `8080` | Server port |
| `host` | string | `localhost` | Server host |
| `debug` | boolean | `false` | Enable debug mode |
| `cache` | boolean | `true` | Enable caching |

## Environment Variables

Set these environment variables:

- `NODE_ENV` - Environment (development/production)
- `API_KEY` - Your API key
- `DATABASE_URL` - Database connection string

## Feature Flags

Enable or disable features:

- ✅ **Search** - Full-text search enabled
- ✅ **Navigation** - Sidebar navigation
- ⚠️ **Analytics** - Coming soon
- ❌ **Comments** - Not available

## Configuration File

Example `config.json`:

\`\`\`json
{
  "server": {
    "port": 8080,
    "host": "localhost"
  },
  "features": {
    "search": true,
    "navigation": true
  },
  "api": {
    "baseUrl": "https://api.example.com",
    "timeout": 5000
  }
}
\`\`\`
```

---

### Example 4: Using Callouts and Alerts

**File:** `assets/docs/Best-Practices.md`

```markdown
---
layout: doc.njk
title: "Best Practices"
---

# Best Practices

## Writing Documentation

::: TIP
Keep your documentation concise and to the point. Users appreciate brevity.
:::

::: WARNING
Always test your code examples before publishing documentation.
:::

::: DANGER
Never commit sensitive information like API keys or passwords to documentation.
:::

## Code Organization

### Good Example ✅

\`\`\`javascript
// Clear, descriptive function name
function calculateUserAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  return today.getFullYear() - birth.getFullYear();
}
\`\`\`

### Bad Example ❌

\`\`\`javascript
// Unclear function name
function calc(d) {
  const t = new Date();
  const b = new Date(d);
  return t.getFullYear() - b.getFullYear();
}
\`\`\`

## Documentation Structure

1. **Start with an overview** - Explain what the feature does
2. **Provide examples** - Show practical usage
3. **Document edge cases** - Explain limitations
4. **Include troubleshooting** - Help users solve common problems

## Markdown Tips

Use proper heading hierarchy:

# H1 - Page Title
## H2 - Major Sections
### H3 - Subsections
#### H4 - Details

Use code blocks with language specification:

\`\`\`javascript
// JavaScript code
console.log('Hello World');
\`\`\`

\`\`\`bash
# Bash commands
npm install
\`\`\`

\`\`\`json
{
  "json": "example"
}
\`\`\`
```

---

## Search Functionality

The template includes a search feature powered by `search-index.json`:

1. Search index is automatically generated from your documentation
2. Search bar appears in the navigation
3. Results are filtered as you type

To customize search, edit `search-index.njk`.

---

## Advanced Features

### Dark Mode

- **Automatic detection:** Uses system preference by default
- **Manual toggle:** Click the sun/moon icon in the header
- **Persistent:** Saves user preference in localStorage
- **Custom themes:** Fully customizable via CSS variables

### Search System

- **Real-time search:** Results appear as you type
- **Smart ranking:** Page titles ranked higher than content
- **Section search:** Finds specific sections with anchor links
- **Highlighted results:** Search terms highlighted in excerpts

### Path Prefix Support

Perfect for hosting in subdirectories:
- Set via `PREFIX` environment variable
- Auto-detection from GitHub repository name
- Applies to all internal links via `| url` filter

### Image Optimization

Best practices for images:
- Place in `assets/img/` directory
- Use modern formats (WebP, SVG when possible)
- Compress before uploading
- Use descriptive filenames
- Always include alt text

### Automatic Navigation

- Auto-generated from folder structure
- Supports unlimited nesting levels
- Alphabetically sorted
- Folders become expandable dropdowns
- Active page automatically highlighted

---

## Tips and Best Practices

### Documentation Tips

1. **Write for your audience** - Use appropriate technical level
2. **Include code examples** - Show, don't just tell
3. **Use images and diagrams** - Visual aids improve understanding
4. **Keep it updated** - Review and update regularly
5. **Cross-reference** - Link related documentation
6. **Test all examples** - Ensure code snippets work

### Markdown Best Practices

- Use consistent heading levels (H1 for title, H2 for sections)
- Include code language in code blocks for syntax highlighting
- Use tables for structured data
- Add descriptive alt text to all images
- Keep paragraphs short and readable
- Use lists for sequential steps

### File Naming

- Use kebab-case: `my-doc-page.md`
- Be descriptive: `installation-guide.md` not `guide.md`
- Avoid spaces: Use hyphens instead
- Keep names concise but meaningful
- Use .md extension for markdown files

---

## Troubleshooting

### Build Errors

**Problem:** `npm start` fails

**Solution:** 
1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` again
3. Check Node.js version (requires v14+)

### Images Not Displaying

**Problem:** Images show broken link icon

**Solution:**
1. Verify image is in `assets/img/` folder
2. Check image path uses `{{ '/img/filename.ext' | url }}`
3. Ensure image filename matches exactly (case-sensitive)
4. Rebuild site with `npm run build`

### Navigation Not Updating

**Problem:** Added a page but it doesn't appear in navigation

**Solution:** 
- Navigation is auto-generated from `assets/docs/` structure
- Restart dev server (`Ctrl+C` then `npm start`)
- Check file has `.md` extension
- Verify file is in `assets/docs/` directory

### Styles Not Applying

**Problem:** CSS changes don't appear

**Solution:**
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Restart development server
4. Check `src/css/style.css` for syntax errors

### GitHub Pages 404 Error

**Problem:** Site shows 404 on GitHub Pages

**Solution:**
1. Verify GitHub Pages is enabled (Settings → Pages)
2. Source must be set to "GitHub Actions"
3. Check workflow ran successfully (Actions tab)
4. Ensure `PATH_PREFIX` matches repository name
5. Wait a few minutes for deployment to complete

### Search Not Working

**Problem:** Search returns no results

**Solution:**
1. Check `search-index.json` was generated in `_site/`
2. Verify JavaScript is enabled in browser
3. Check browser console for errors
4. Rebuild site to regenerate search index

### Dark Mode Not Switching

**Problem:** Dark mode toggle doesn't work

**Solution:**
1. Check JavaScript is enabled
2. Clear localStorage: `localStorage.clear()` in browser console
3. Verify `src/js/main.js` is loaded correctly
4. Check browser console for JavaScript errors

---

## Additional Resources

### Official Documentation

- [Eleventy Documentation](https://www.11ty.dev/docs/) - Complete Eleventy guide
- [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax reference
- [Nunjucks Templates](https://mozilla.github.io/nunjucks/) - Template language docs

### Useful Tools

- [Squoosh](https://squoosh.app/) - Image compression and optimization
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimizer
- [WebP Converter](https://developers.google.com/speed/webp) - Convert images to WebP

### Community

- [Eleventy Discord](https://www.11ty.dev/blog/discord/) - Get help and share tips
- [GitHub Discussions](https://github.com/11ty/eleventy/discussions) - Ask questions

---

## Quick Reference

### Essential Commands

```bash
# Development
npm start              # Start dev server with live reload
npm run build         # Build for production
npm run serve         # Serve built site locally

# With environment variables
PREFIX=/docs/ npm run build
```

### File Structure Quick Reference

```
assets/
  ├── docs/           → Your markdown files (auto-navigation)
  └── img/            → Images (use {{ '/img/file.png' | url }})

src/
  ├── css/style.css   → Styles (dark mode, colors)
  └── js/main.js      → Logic (search, navigation, dark mode)

_includes/
  ├── base.njk        → Main layout
  └── doc.njk         → Doc page layout

.eleventy.js          → Site config (siteTitle, siteLogo, pathPrefix)
```

### Common Tasks

**Change site title:**
```javascript
// Edit .eleventy.js
eleventyConfig.addGlobalData("siteTitle", "My Docs");
eleventyConfig.addGlobalData("siteLogo", "🚀");
```

**Add image:**
```markdown
![Description]({{ '/img/photo.png' | url }})
```

**Create new doc:**
```markdown
---
layout: doc.njk
title: "My Page"
---

# Content here
```

**Deploy to GitHub:**
```bash
git add .
git commit -m "Update docs"
git push
# Auto-deploys via GitHub Actions
```

---

## Support

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Nunjucks Templates](https://mozilla.github.io/nunjucks/)

---

## Support

For issues or questions:
1. Check this documentation
2. Review the example files
3. Consult Eleventy documentation
4. Open an issue on the project repository

---

**Happy documenting! 📚**
