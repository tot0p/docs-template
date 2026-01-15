---
layout: doc.njk
title: "API Endpoints"
---

# API Endpoints

Complete reference for all available endpoints.

## Users

### List Users

```http
GET /v1/users
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Items per page (default: 20) |
| `status` | string | Filter by status |

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_KEY" \
  "https://api.example.com/v1/users?page=1&limit=20"
```

**Response:**

```json
{
  "data": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "status": "active",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

---

### Get User

```http
GET /v1/users/:id
```

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_KEY" \
  https://api.example.com/v1/users/user_123
```

**Response:**

```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "status": "active",
  "metadata": {
    "plan": "pro",
    "subscription_id": "sub_456"
  },
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

---

### Create User

```http
POST /v1/users
```

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "securepassword123",
  "metadata": {
    "plan": "free"
  }
}
```

**Response:**

```json
{
  "id": "user_124",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "active",
  "created_at": "2026-01-15T12:00:00Z"
}
```

---

### Update User

```http
PATCH /v1/users/:id
```

**Request Body:**

```json
{
  "name": "Jane Doe",
  "metadata": {
    "plan": "pro"
  }
}
```

**Response:**

```json
{
  "id": "user_124",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "metadata": {
    "plan": "pro"
  },
  "updated_at": "2026-01-15T13:00:00Z"
}
```

---

### Delete User

```http
DELETE /v1/users/:id
```

**Response:**

```json
{
  "id": "user_124",
  "deleted": true
}
```

---

## Projects

### List Projects

```http
GET /v1/projects
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `user_id` | string | Filter by user |
| `status` | string | Filter by status |
| `sort` | string | Sort field |
| `order` | string | Sort order (asc/desc) |

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_KEY" \
  "https://api.example.com/v1/projects?user_id=user_123&status=active"
```

---

### Create Project

```http
POST /v1/projects
```

**Request Body:**

```json
{
  "name": "My Project",
  "description": "Project description",
  "user_id": "user_123",
  "settings": {
    "visibility": "private",
    "features": ["api", "webhooks"]
  }
}
```

---

## Files

### Upload File

```http
POST /v1/files
```

**Request (multipart/form-data):**

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_KEY" \
  -F "file=@/path/to/file.pdf" \
  -F "metadata={\"category\":\"document\"}" \
  https://api.example.com/v1/files
```

**Response:**

```json
{
  "id": "file_789",
  "name": "file.pdf",
  "size": 1048576,
  "url": "https://cdn.example.com/file_789.pdf",
  "created_at": "2026-01-15T14:00:00Z"
}
```

---

### Download File

```http
GET /v1/files/:id/download
```

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_KEY" \
  -o downloaded_file.pdf \
  https://api.example.com/v1/files/file_789/download
```

---

## Search

### Full-Text Search

```http
GET /v1/search
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query (required) |
| `type` | string | Resource type filter |
| `limit` | integer | Results limit |

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_KEY" \
  "https://api.example.com/v1/search?q=documentation&type=project"
```

**Response:**

```json
{
  "query": "documentation",
  "results": [
    {
      "type": "project",
      "id": "proj_123",
      "title": "Documentation Project",
      "score": 0.95,
      "highlights": ["...documentation website..."]
    }
  ],
  "total": 42
}
```

---

## Batch Operations

### Batch Create

```http
POST /v1/batch/users
```

**Request Body:**

```json
{
  "users": [
    {
      "name": "User 1",
      "email": "user1@example.com"
    },
    {
      "name": "User 2",
      "email": "user2@example.com"
    }
  ]
}
```

**Response:**

```json
{
  "created": 2,
  "failed": 0,
  "results": [
    {
      "id": "user_125",
      "status": "success"
    },
    {
      "id": "user_126",
      "status": "success"
    }
  ]
}
```

---

## Error Responses

All endpoints may return these error formats:

```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

## Code Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.example.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}`
  }
});

// Get users
const users = await api.get('/users');

// Create user
const newUser = await api.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});
```

### Python

```python
import requests

API_KEY = 'your_api_key'
BASE_URL = 'https://api.example.com/v1'

headers = {
    'Authorization': f'Bearer {API_KEY}'
}

# Get users
response = requests.get(f'{BASE_URL}/users', headers=headers)
users = response.json()

# Create user
new_user = requests.post(
    f'{BASE_URL}/users',
    headers=headers,
    json={'name': 'John Doe', 'email': 'john@example.com'}
)
```
