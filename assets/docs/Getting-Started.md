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
- 🔍 Built-in search functionality
- 📱 Mobile-friendly navigation
- ⚡ Fast static site generation

---

## Project Structure

```
docs-template/
├── assets/
│   └── docs/              # Your markdown documentation files
│       └── docs.json      # Configuration for docs
├── _includes/             # Layout templates
│   ├── base.njk          # Main layout
│   ├── base-clean.njk    # Clean layout (no nav)
│   ├── doc.njk           # Documentation page layout
│   └── nav-item.njk      # Navigation item template
├── _data/
│   └── navigation.js     # Navigation menu configuration
├── src/
│   ├── css/              # Stylesheets
│   └── js/               # JavaScript files
├── _site/                # Generated site (after build)
├── index.md              # Homepage
├── package.json          # Dependencies and scripts
└── .eleventy.js          # Eleventy configuration (if present)
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

### Navigation Menu

Edit `_data/navigation.js` to customize the navigation menu:

```javascript
module.exports = [
  {
    title: "Getting Started",
    url: "/docs/Getting-Started/"
  },
  {
    title: "User Guide",
    children: [
      {
        title: "Installation",
        url: "/docs/User-Guide/Installation/"
      },
      {
        title: "Configuration",
        url: "/docs/User-Guide/Configuration/"
      }
    ]
  },
  {
    title: "API Reference",
    url: "/docs/API-Reference/"
  }
];
```

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

- `base.njk` - Main layout with navigation
- `doc.njk` - Documentation page layout
- `base-clean.njk` - Layout without navigation

---

## Building and Deploying

### Build for Production

```bash
npm run build
```

This generates the static site in the `_site/` directory.

### Development Server

```bash
npm start
```

Runs a local server with live reload at `http://localhost:8080`

### Deployment Options

The generated `_site/` folder can be deployed to:

- **GitHub Pages**
  ```bash
  # Push _site folder to gh-pages branch
  ```

- **Netlify**
  - Connect your repository
  - Build command: `npm run build`
  - Publish directory: `_site`

- **Vercel**
  - Import project
  - Framework preset: Other
  - Build command: `npm run build`
  - Output directory: `_site`

- **Any static hosting**
  - Upload contents of `_site/` folder

---

## Examples

### Example 1: Simple Documentation Page

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

- [Read the full documentation](/docs/User-Guide/)
- [Check the API reference](/docs/API-Reference/)
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

## Tips and Best Practices

### Documentation Tips

1. **Write for your audience** - Use appropriate technical level
2. **Include code examples** - Show, don't just tell
3. **Keep it updated** - Review and update regularly
4. **Use screenshots** - Visual aids help understanding
5. **Cross-reference** - Link related documentation

### Markdown Best Practices

- Use consistent heading levels
- Include code language in code blocks
- Use tables for structured data
- Add alt text to images
- Keep paragraphs short and readable

### File Naming

- Use kebab-case: `my-doc-page.md`
- Be descriptive: `installation-guide.md` not `guide.md`
- Avoid spaces: Use hyphens or underscores
- Use .md extension for markdown files

---

## Troubleshooting

### Build Errors

**Problem:** `npm start` fails

**Solution:** 
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Navigation Not Updating

**Problem:** Added a page but it doesn't appear in navigation

**Solution:** Update `_data/navigation.js` to include your new page

### Styles Not Applying

**Problem:** CSS changes don't appear

**Solution:**
1. Clear browser cache
2. Restart development server
3. Check `src/css/style.css` for syntax errors

---

## Additional Resources

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
