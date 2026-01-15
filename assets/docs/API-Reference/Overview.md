---
layout: doc.njk
title: "API Reference"
---

# API Reference

Complete reference for all API endpoints and methods.

## Base URL

```
https://api.example.com/v1
```

## Authentication

All API requests require authentication using Bearer tokens:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/v1/endpoint
```

## Sections

- **[Authentication]({{ '/docs/API-Reference/Authentication/' | url }})** - Authentication endpoints
- **[Endpoints]({{ '/docs/API-Reference/Endpoints/' | url }})** - Complete endpoint reference
- **[Webhooks]({{ '/docs/API-Reference/Webhooks/' | url }})** - Webhook configuration

## Rate Limits

| Plan | Requests per minute |
|------|---------------------|
| Free | 60 |
| Pro | 1000 |
| Enterprise | Unlimited |

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |
