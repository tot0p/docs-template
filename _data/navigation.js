const fs = require('fs');
const path = require('path');

function buildNavigationTree(dirPath, basePath = '') {
  const navigation = [];
  
  if (!fs.existsSync(dirPath)) {
    return navigation;
  }
  
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  // Sort items: directories first, then files
  items.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    const relativePath = path.join(basePath, item.name);
    
    if (item.isDirectory()) {
      // Create navigation entry for directory
      const dirNav = {
        name: item.name,
        title: formatTitle(item.name),
        type: 'directory',
        path: relativePath,
        children: buildNavigationTree(itemPath, relativePath)
      };
      navigation.push(dirNav);
    } else if (item.isFile() && path.extname(item.name) === '.md') {
      // Create navigation entry for markdown file
      const fileNav = {
        name: item.name,
        title: formatTitle(path.basename(item.name, '.md')),
        type: 'file',
        path: relativePath,
        url: generateUrl(relativePath)
      };
      navigation.push(fileNav);
    }
  }
  
  return navigation;
}

function formatTitle(name) {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function generateUrl(filePath) {
  // Convert file path to URL path
  let url = filePath.replace(/\\/g, '/'); // Convert Windows paths
  url = url.replace(/\.md$/, '/'); // Remove .md extension and add trailing slash
  // Return relative path that will be processed by | url filter
  return `docs/${url}`;
}

module.exports = function() {
  const docsPath = path.join(process.cwd(), 'assets', 'docs');
  return buildNavigationTree(docsPath);
};