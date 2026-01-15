---
layout: doc.njk
title: "Installation Guide"
---

# Installation Guide

This guide walks you through the installation process step by step.

## Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- Git (optional, for cloning)
- Text editor (VS Code, Sublime, etc.)

## Installation Methods

### Method 1: Using npm

```bash
# Install globally
npm install -g your-package

# Verify installation
your-package --version
```

### Method 2: Local Installation

```bash
# Create project directory
mkdir my-project
cd my-project

# Initialize project
npm init -y

# Install as dependency
npm install your-package

# Install dev dependencies
npm install --save-dev your-dev-package
```

### Method 3: Clone from Repository

```bash
# Clone repository
git clone https://github.com/username/repo.git

# Navigate to directory
cd repo

# Install dependencies
npm install
```

## Platform-Specific Instructions

### Windows

```powershell
# Using PowerShell
npm install -g your-package

# Verify installation
Get-Command your-package
```

### macOS / Linux

```bash
# May require sudo
sudo npm install -g your-package

# Verify installation
which your-package
```

## Post-Installation

After installation, run the setup:

```bash
# Run setup wizard
your-package setup

# Verify configuration
your-package doctor
```

## Troubleshooting

### Common Issues

**Issue:** Permission denied errors

**Solution:**
```bash
# On macOS/Linux
sudo npm install -g your-package

# Or use nvm to avoid sudo
```

**Issue:** Command not found

**Solution:**
- Ensure npm global bin is in your PATH
- Restart your terminal
- Verify installation with `npm list -g`

## Next Steps

- [Configure your environment](../Configuration/)
- [Learn basic usage](../Basic-Usage/)
- [Explore advanced features](../Advanced-Features/)
