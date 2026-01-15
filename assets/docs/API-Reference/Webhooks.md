---
layout: doc.njk
title: "Webhooks"
---

# Webhooks

Configure webhooks to receive real-time notifications about events.

## Overview

Webhooks allow your application to receive HTTP notifications when specific events occur.

## Creating Webhooks

### Via API

```http
POST /v1/webhooks
```

**Request Body:**

```json
{
  "url": "https://yourapp.com/webhook",
  "events": [
    "user.created",
    "user.updated",
    "project.created"
  ],
  "secret": "whsec_abc123...",
  "active": true
}
```

**Response:**

```json
{
  "id": "hook_123",
  "url": "https://yourapp.com/webhook",
  "events": ["user.created", "user.updated", "project.created"],
  "secret": "whsec_abc123...",
  "active": true,
  "created_at": "2026-01-15T12:00:00Z"
}
```

## Available Events

| Event | Description |
|-------|-------------|
| `user.created` | New user registered |
| `user.updated` | User profile updated |
| `user.deleted` | User account deleted |
| `project.created` | New project created |
| `project.updated` | Project modified |
| `project.deleted` | Project deleted |
| `file.uploaded` | File uploaded |
| `payment.succeeded` | Payment processed successfully |
| `payment.failed` | Payment failed |

## Webhook Payload

### Standard Format

```json
{
  "id": "evt_abc123",
  "type": "user.created",
  "created_at": "2026-01-15T12:30:00Z",
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "active"
  }
}
```

## Verifying Webhooks

### Signature Verification

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(hmac)
  );
}

// Express middleware
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhook(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook
  processWebhook(req.body);
  res.status(200).send('OK');
});
```

## Handling Webhooks

### Node.js Example

```javascript
app.post('/webhook', async (req, res) => {
  const event = req.body;
  
  // Respond quickly
  res.status(200).send('OK');
  
  // Process asynchronously
  try {
    switch (event.type) {
      case 'user.created':
        await handleUserCreated(event.data);
        break;
      case 'user.updated':
        await handleUserUpdated(event.data);
        break;
      case 'project.created':
        await handleProjectCreated(event.data);
        break;
      default:
        console.log('Unhandled event:', event.type);
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
  }
});
```

### Python Example

```python
from flask import Flask, request
import hmac
import hashlib

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    # Verify signature
    signature = request.headers.get('X-Webhook-Signature')
    payload = request.get_data()
    
    expected = hmac.new(
        WEBHOOK_SECRET.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    if not hmac.compare_digest(signature, expected):
        return 'Invalid signature', 401
    
    # Process event
    event = request.json
    handle_event(event)
    
    return 'OK', 200
```

## Retry Logic

Our system automatically retries failed webhook deliveries:

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 30 seconds |
| 3 | 5 minutes |
| 4 | 30 minutes |
| 5 | 2 hours |

After 5 failed attempts, the webhook is marked as failed and stops retrying.

## Best Practices

### Do's ✅

- Respond with 200 status quickly
- Process webhooks asynchronously
- Verify webhook signatures
- Use HTTPS endpoints
- Implement idempotency
- Log all webhook events

### Don'ts ❌

- Don't process webhooks synchronously
- Don't expose webhook endpoints without authentication
- Don't ignore retry deliveries
- Don't rely on webhook ordering

## Testing Webhooks

### Using CLI

```bash
# Send test webhook
curl -X POST https://api.example.com/v1/webhooks/hook_123/test
```

### Manual Testing

```bash
# Simulate webhook locally
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: test_signature" \
  -d '{
    "id": "evt_test",
    "type": "user.created",
    "data": {
      "id": "user_test",
      "name": "Test User"
    }
  }'
```

## Monitoring

### View Webhook Logs

```http
GET /v1/webhooks/:id/deliveries
```

**Response:**

```json
{
  "deliveries": [
    {
      "id": "del_123",
      "event_id": "evt_abc",
      "status": "success",
      "status_code": 200,
      "attempts": 1,
      "delivered_at": "2026-01-15T12:30:00Z"
    },
    {
      "id": "del_124",
      "event_id": "evt_def",
      "status": "failed",
      "status_code": 500,
      "attempts": 3,
      "error": "Connection timeout"
    }
  ]
}
```

## Troubleshooting

### Webhooks Not Received

1. Check webhook URL is accessible
2. Verify HTTPS certificate is valid
3. Ensure endpoint responds with 200
4. Check webhook is active
5. Review delivery logs

### Signature Verification Fails

1. Verify secret key matches
2. Check payload encoding
3. Ensure raw body is used
4. Compare hash algorithms

## Next Steps

- [View API endpoints]({{ '/docs/API-Reference/Endpoints/' | url }})
- [Check authentication guide]({{ '/docs/API-Reference/Authentication/' | url }})
