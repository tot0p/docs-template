# Fablab Documentation Site

Welcome to the Fablab documentation portal! This site automatically generates navigation based on the structure of documentation files.

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Add your documentation files to the `assets/docs` folder
4. The navigation will automatically update to reflect your folder structure

## Adding Documentation

- Create `.md` files in the `assets/docs` directory
- Use subfolders to organize content - they will appear as dropdown menus
- Each file should include frontmatter with a title (optional, filename will be used as fallback)

Example:
```markdown
---
title: "Getting Started Guide"
---

# Your content here
```