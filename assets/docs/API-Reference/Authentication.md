---
layout: doc.njk
title: "Authentication"
---

# Authentication

Learn how to authenticate with the API.

## API Keys

### Generating API Keys

1. Log in to your dashboard
2. Navigate to Settings → API Keys
3. Click "Create New API Key"
4. Copy and securely store your key

::: WARNING
API keys grant full access to your account. Keep them secure and never commit them to version control.
:::

## Authentication Methods

### Bearer Token

Include your API key in the Authorization header:

```bash
curl -H "Authorization: Bearer sk_live_abc123..." \
  https://api.example.com/v1/users
```

### Request Example

```javascript
fetch('https://api.example.com/v1/users', {
  headers: {
    'Authorization': 'Bearer sk_live_abc123...',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## OAuth 2.0

### Authorization Flow

```bash
# Step 1: Redirect user to authorization URL
https://api.example.com/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://yourapp.com/callback&
  response_type=code&
  scope=read write

# Step 2: Exchange code for token
POST /oauth/token
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_SECRET",
  "code": "AUTHORIZATION_CODE",
  "grant_type": "authorization_code"
}
```

### Token Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def502003e8f2b..."
}
```

## Security Best Practices

- Rotate API keys regularly
- Use environment variables for keys
- Implement token expiration
- Monitor API usage for anomalies
- Use HTTPS for all requests
