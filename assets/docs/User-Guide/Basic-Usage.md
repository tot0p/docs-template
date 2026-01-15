---
layout: doc.njk
title: "Basic Usage"
---

# Basic Usage

Learn the fundamental operations and everyday tasks.

## Getting Started

### Starting the Application

```bash
# Development mode
npm run dev

# Production mode
npm start

# With custom port
PORT=8080 npm start
```

### Basic Commands

```bash
# Check version
your-app --version

# Get help
your-app --help

# Run with options
your-app --port 3000 --host localhost
```

## Common Operations

### Creating Items

```javascript
// Create a new item
const item = {
  name: 'Example Item',
  description: 'This is an example',
  category: 'documentation'
};

// Save the item
const result = await create(item);
console.log('Created:', result.id);
```

### Reading Items

```javascript
// Get single item
const item = await getById('item-id');

// Get all items
const allItems = await getAll();

// Get with filters
const filtered = await getAll({
  category: 'documentation',
  status: 'active'
});
```

### Updating Items

```javascript
// Update item
const updated = await update('item-id', {
  name: 'Updated Name',
  description: 'Updated description'
});

// Partial update
const patched = await patch('item-id', {
  status: 'completed'
});
```

### Deleting Items

```javascript
// Delete single item
await delete('item-id');

// Delete multiple items
await deleteMany(['id1', 'id2', 'id3']);

// Soft delete (if supported)
await softDelete('item-id');
```

## Working with Files

### Reading Files

```javascript
// Read file
const content = await readFile('path/to/file.txt');

// Read JSON
const data = await readJSON('data.json');

// Read with options
const content = await readFile('file.txt', {
  encoding: 'utf8'
});
```

### Writing Files

```javascript
// Write file
await writeFile('output.txt', 'Hello World');

// Write JSON
await writeJSON('data.json', { key: 'value' });

// Append to file
await appendFile('log.txt', 'New log entry\n');
```

## Authentication

### Login

```javascript
// Login with credentials
const user = await login({
  email: 'user@example.com',
  password: 'password123'
});

// Save token
localStorage.setItem('token', user.token);
```

### Making Authenticated Requests

```javascript
// Get token
const token = localStorage.getItem('token');

// Include in requests
const response = await fetch('/api/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Logout

```javascript
// Logout
await logout();

// Clear token
localStorage.removeItem('token');
```

## Error Handling

### Try-Catch Pattern

```javascript
try {
  const result = await operation();
  console.log('Success:', result);
} catch (error) {
  console.error('Error:', error.message);
  
  // Handle specific errors
  if (error.code === 'NOT_FOUND') {
    console.log('Item not found');
  } else if (error.code === 'UNAUTHORIZED') {
    console.log('Please login');
  }
}
```

### Validation

```javascript
// Validate before operation
if (!isValid(data)) {
  throw new Error('Invalid data');
}

// Use validation library
const errors = validate(data, schema);
if (errors.length > 0) {
  console.error('Validation errors:', errors);
}
```

## Best Practices

### Do's ✅

- Always validate user input
- Handle errors gracefully
- Use async/await for cleaner code
- Log important operations
- Close resources when done

### Don'ts ❌

- Don't ignore errors
- Don't hardcode sensitive data
- Don't skip validation
- Don't leave resources open
- Don't use synchronous operations for I/O

## CLI Examples

### Basic Commands

```bash
# Create new item
your-app create --name "My Item" --type document

# List items
your-app list

# Show item details
your-app show item-id

# Update item
your-app update item-id --status completed

# Delete item
your-app delete item-id
```

### Advanced Usage

```bash
# Batch operations
your-app batch-create items.json

# Export data
your-app export --format json --output data.json

# Import data
your-app import data.json

# Search
your-app search "keyword" --category docs
```

## Next Steps

- [Explore advanced features]({{ '/docs/User-Guide/Advanced-Features/' | url }})
- [Learn about API endpoints]({{ '/docs/API-Reference/Endpoints/' | url }})
