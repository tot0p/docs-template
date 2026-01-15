---
layout: doc.njk
title: "Configuration Guide"
---

# Configuration Guide

Learn how to configure your application for optimal performance.

## Configuration Files

### Main Configuration File

Create a `config.json` in your project root:

```json
{
  "app": {
    "name": "My Application",
    "version": "1.0.0",
    "port": 3000
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "mydb"
  },
  "features": {
    "authentication": true,
    "caching": true,
    "logging": true
  }
}
```

### Environment Variables

Create a `.env` file:

```bash
NODE_ENV=development
PORT=3000
API_KEY=your_api_key_here
DATABASE_URL=postgresql://localhost/mydb
SECRET_KEY=your_secret_key

# Optional settings
DEBUG=true
LOG_LEVEL=info
```

## Configuration Options

### Application Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `app.name` | string | - | Application name |
| `app.port` | number | `3000` | Server port |
| `app.host` | string | `localhost` | Server host |
| `app.timeout` | number | `30000` | Request timeout (ms) |

### Feature Flags

Enable or disable features:

```json
{
  "features": {
    "authentication": true,
    "authorization": true,
    "caching": true,
    "compression": true,
    "cors": true,
    "rateLimit": false
  }
}
```

### Database Configuration

```json
{
  "database": {
    "type": "postgresql",
    "host": "localhost",
    "port": 5432,
    "username": "admin",
    "password": "password",
    "database": "mydb",
    "ssl": false,
    "pool": {
      "min": 2,
      "max": 10
    }
  }
}
```

## Environment-Specific Configuration

### Development

```json
{
  "environment": "development",
  "debug": true,
  "logLevel": "debug",
  "hotReload": true
}
```

### Production

```json
{
  "environment": "production",
  "debug": false,
  "logLevel": "error",
  "compression": true,
  "caching": true
}
```

## Validation

Validate your configuration:

```bash
# Check configuration
npm run config:check

# Validate environment
npm run config:validate
```

## Best Practices

::: TIP
- Never commit sensitive data (API keys, passwords) to version control
- Use environment variables for secrets
- Keep separate configs for different environments
- Document all configuration options
:::

::: WARNING
Always use strong, unique values for `SECRET_KEY` in production
:::

## Next Steps

- [Learn basic usage](../Basic-Usage/)
- [Explore advanced features](../Advanced-Features/)
