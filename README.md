# Documentation Template

A simple, fast, and customizable documentation site template built with [Eleventy (11ty)](https://www.11ty.dev/).

## ✨ Features

- 📝 Markdown-based content
- 🎨 Clean, responsive design
- 🔍 Built-in search functionality
- 📱 Mobile-friendly navigation
- ⚡ Fast static site generation
- 🌙 Dark mode support
- 🚀 Automatic deployment to GitHub Pages

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open in browser**
   Navigate to `http://localhost:8080`

### Creating Documentation

1. Create markdown files in `assets/docs/`
2. Add front matter with title
3. Write your content
4. The page is automatically generated

Example:
```markdown
---
layout: doc.njk
title: "My Page"
---

# My Documentation

Your content here...
```

## 📁 Project Structure

```
docs-template/
├── assets/
│   └── docs/              # Your markdown documentation files
├── _includes/             # Layout templates
├── _data/                 # Data files (navigation, etc.)
├── src/
│   ├── css/              # Stylesheets
│   └── js/               # JavaScript files
├── _site/                # Generated site (after build)
├── .github/
│   └── workflows/        # GitHub Actions workflows
├── index.md              # Homepage
└── package.json          # Dependencies and scripts
```

## 🌐 Deploying to GitHub Pages

### Automatic Deployment (Recommended)

This template is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"

2. **Push to main/master branch**
   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```

3. **Site will be automatically deployed**
   - The workflow will build and deploy your site
   - Your site will be available at: `https://username.github.io/repository-name/`

### Using as a Template

If this repository is a template:

1. Click "Use this template" button
2. Create your new repository
3. Clone and customize your content
4. Enable GitHub Pages in settings (Source: GitHub Actions)
5. Push to main branch
6. Your documentation site is ready!

## 📝 Available Commands

```bash
# Start development server with live reload
npm start

# Build for production
npm run build

# Serve built site locally
npm run serve
```

## ⚙️ Configuration

### Navigation Menu

Edit `_data/navigation.js` to customize the menu:

```javascript
module.exports = [
  {
    title: "Getting Started",
    url: "/docs/Getting-Started/"
  },
  {
    title: "User Guide",
    children: [
      { title: "Installation", url: "/docs/User-Guide/Installation/" }
    ]
  }
];
```

### Site Title

Edit `_includes/base.njk` to change the site title and branding.

### Styling

Customize styles in `src/css/style.css`.

## 📚 Documentation

For detailed usage instructions and examples, see the [Getting Started Guide](assets/docs/Getting-Started.md) or visit your deployed site.

## 🔧 Troubleshooting

### 404 Errors on GitHub Pages

Make sure:
- GitHub Pages is enabled in repository settings
- Source is set to "GitHub Actions"
- The workflow has run successfully
- You're using the correct URL format
- All links use the `| url` filter in templates

### Build Fails

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Try building again with `npm run build`

## 📄 License

MIT License - feel free to use this template for your projects!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

- Check the [documentation](assets/docs/Getting-Started.md)
- Open an issue on GitHub
- Review [Eleventy documentation](https://www.11ty.dev/docs/)