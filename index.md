---
layout: base.njk
title: "Documentation Template"
---

<div class="hero">
  <h1>{{ title }}</h1>
  <p>A simple, fast, and customizable documentation site template built with Eleventy (11ty).</p>
</div>

<div class="content-grid">
  <div class="card">
    <h3>📖 Getting Started</h3>
    <p>Learn how to use this template to create your own documentation site.</p>
    <ul>
      <li><a href="{{ '/docs/Getting-Started/' | url }}">Complete Guide & Examples</a></li>
    </ul>
  </div>
  
  <div class="card">
    <h3>⚡ Quick Start</h3>
    <p>Get up and running in minutes.</p>
    <ol>
      <li>Run <code>npm install</code></li>
      <li>Run <code>npm start</code></li>
      <li>Create .md files in <code>assets/docs/</code></li>
    </ol>
  </div>
  
  <div class="card">
    <h3>✨ Features</h3>
    <p>What this template includes:</p>
    <ul>
      <li>📝 Markdown-based content</li>
      <li>🔍 Built-in search</li>
      <li>📱 Responsive design</li>
      <li>⚡ Fast static generation</li>
    </ul>
  </div>
  
  <div class="card">
    <h3>📚 Documentation</h3>
    <p>Everything you need to know:</p>
    <ul>
      <li>Project structure</li>
      <li>Creating pages</li>
      <li>Configuration</li>
      <li>Examples & best practices</li>
    </ul>
  </div>
</div>