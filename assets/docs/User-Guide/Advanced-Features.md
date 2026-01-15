---
layout: doc.njk
title: "Advanced Features"
---

# Advanced Features

Unlock the full potential with advanced capabilities and techniques.

## Performance Optimization

### Caching

```javascript
// Configure caching
const cache = new Cache({
  maxAge: 3600000, // 1 hour
  maxSize: 100,    // 100 items
  strategy: 'LRU'  // Least Recently Used
});

// Use cache
async function getData(key) {
  // Check cache first
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }
  
  // Fetch and cache
  const data = await fetchData(key);
  cache.set(key, data);
  return data;
}
```

### Connection Pooling

```javascript
// Create connection pool
const pool = new Pool({
  min: 2,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Use pool
async function query(sql, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } finally {
    client.release();
  }
}
```

## Custom Middleware

### Creating Middleware

```javascript
// Authentication middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Logging middleware
function logMiddleware(req, res, next) {
  console.log(`${req.method} ${req.path}`, {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
}

// Apply middleware
app.use(logMiddleware);
app.use('/api', authMiddleware);
```

## Custom Plugins

### Creating a Plugin

```javascript
// Define plugin
class CustomPlugin {
  constructor(options) {
    this.options = options;
  }
  
  async initialize(app) {
    console.log('Plugin initialized');
    
    // Register routes
    app.get('/plugin/status', this.getStatus.bind(this));
    
    // Add hooks
    app.on('before:request', this.beforeRequest.bind(this));
  }
  
  async getStatus(req, res) {
    res.json({ status: 'active', plugin: 'custom' });
  }
  
  async beforeRequest(req) {
    console.log('Before request:', req.path);
  }
}

// Register plugin
app.registerPlugin(new CustomPlugin({
  enabled: true,
  priority: 10
}));
```

## Event System

### Event Emitters

```javascript
// Create event emitter
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register listeners
emitter.on('user:created', (user) => {
  console.log('User created:', user.id);
  // Send welcome email
  sendEmail(user.email, 'Welcome!');
});

emitter.on('user:updated', (user, changes) => {
  console.log('User updated:', user.id, changes);
  // Log changes
  auditLog.record('user.update', user.id, changes);
});

// Emit events
emitter.emit('user:created', { id: 1, email: 'user@example.com' });
emitter.emit('user:updated', user, { name: 'New Name' });
```

## Streaming Data

### Stream Processing

```javascript
// Read stream
const fs = require('fs');
const readline = require('readline');

async function processLargeFile(filename) {
  const fileStream = fs.createReadStream(filename);
  
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  for await (const line of rl) {
    // Process each line
    await processLine(line);
  }
}

// Write stream
function streamResponse(res) {
  const stream = getDataStream();
  
  stream.on('data', (chunk) => {
    res.write(chunk);
  });
  
  stream.on('end', () => {
    res.end();
  });
  
  stream.on('error', (error) => {
    res.status(500).send('Stream error');
  });
}
```

## Advanced Querying

### Complex Filters

```javascript
// Build complex query
const results = await query({
  where: {
    and: [
      { status: 'active' },
      { 
        or: [
          { category: 'premium' },
          { priority: { gte: 5 } }
        ]
      },
      {
        created_at: {
          gte: '2025-01-01',
          lte: '2025-12-31'
        }
      }
    ]
  },
  orderBy: [
    { field: 'priority', direction: 'desc' },
    { field: 'created_at', direction: 'asc' }
  ],
  limit: 50,
  offset: 0,
  include: ['author', 'tags']
});
```

### Aggregations

```javascript
// Aggregate data
const stats = await aggregate({
  groupBy: ['category', 'status'],
  aggregate: {
    count: '*',
    total: { sum: 'amount' },
    average: { avg: 'rating' },
    minimum: { min: 'price' },
    maximum: { max: 'price' }
  },
  having: {
    count: { gte: 10 }
  }
});
```

## Webhooks

### Setting Up Webhooks

```javascript
// Register webhook
await registerWebhook({
  url: 'https://example.com/webhook',
  events: ['user.created', 'user.updated'],
  secret: 'webhook-secret',
  active: true
});

// Handle webhook delivery
function deliverWebhook(event, data) {
  const webhooks = getWebhooks(event);
  
  webhooks.forEach(async (webhook) => {
    const signature = generateSignature(data, webhook.secret);
    
    try {
      await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
          'X-Event-Type': event
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Webhook delivery failed:', error);
      // Queue for retry
      retryQueue.add(webhook, data);
    }
  });
}
```

## Background Jobs

### Job Queue

```javascript
// Create job queue
const Queue = require('bull');
const queue = new Queue('tasks', {
  redis: { host: 'localhost', port: 6379 }
});

// Add jobs
queue.add('sendEmail', {
  to: 'user@example.com',
  subject: 'Hello',
  body: 'Welcome!'
}, {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000
  }
});

// Process jobs
queue.process('sendEmail', async (job) => {
  console.log('Processing:', job.id);
  await sendEmail(job.data);
});

// Handle events
queue.on('completed', (job) => {
  console.log('Job completed:', job.id);
});

queue.on('failed', (job, error) => {
  console.error('Job failed:', job.id, error);
});
```

## Rate Limiting

### Implementing Rate Limits

```javascript
// Rate limiter
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false
});

// Apply to routes
app.use('/api/', limiter);

// Custom rate limit per user
const userLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: async (req) => {
    const user = req.user;
    return user.premium ? 1000 : 100;
  },
  keyGenerator: (req) => req.user.id
});

app.use('/api/user/', userLimiter);
```

## Advanced Error Handling

### Custom Error Classes

```javascript
// Define custom errors
class ValidationError extends Error {
  constructor(message, fields) {
    super(message);
    this.name = 'ValidationError';
    this.fields = fields;
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} not found: ${id}`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  res.status(error.statusCode || 500).json({
    error: {
      name: error.name,
      message: error.message,
      ...(error.fields && { fields: error.fields })
    }
  });
});
```

## Testing Advanced Features

### Integration Tests

```javascript
describe('Advanced Features', () => {
  it('should handle caching', async () => {
    const result1 = await getData('key');
    const result2 = await getData('key');
    
    expect(result2).toBe(result1); // From cache
  });
  
  it('should process webhooks', async () => {
    const webhook = await registerWebhook({
      url: 'http://test.com/hook',
      events: ['test']
    });
    
    await triggerEvent('test', { data: 'test' });
    
    expect(mockFetch).toHaveBeenCalledWith(
      webhook.url,
      expect.objectContaining({
        method: 'POST'
      })
    );
  });
});
```

## Next Steps

- [Review API reference]({{ '/docs/API-Reference/Endpoints/' | url }})
