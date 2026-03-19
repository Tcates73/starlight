---
title: Authentication
description: How to authenticate with the SendFlow API
---

SendFlow uses API keys to authenticate requests. Your API key carries many privileges, so keep it secure!

## Getting Your API Key

1. Log in to [app.sendflow.io](https://app.sendflow.io)
2. Go to **Settings → API Keys**
3. Click **Create API Key**
4. Copy and save it immediately (you won't see it again!)

## API Key Format

```
sf_test_abc123...  (for testing)
sf_live_xyz789...  (for production)
```

## Using Your API Key

### HTTP Header (Recommended)

```bash
curl https://api.sendflow.io/v1/send \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### SDKs

```javascript
// Node.js
const SendFlow = require('@sendflow/node');
const client = new SendFlow('YOUR_API_KEY');
```

```python
# Python
import sendflow
sendflow.api_key = 'YOUR_API_KEY'
```

```php
// PHP
$client = new SendFlow\Client('YOUR_API_KEY');
```

## Test vs Live Keys

| Type | Prefix | Use For |
|------|--------|---------|
| **Test** | `sf_test_` | Development, testing |
| **Live** | `sf_live_` | Production emails |

:::tip
Test keys don't actually send emails! They simulate the API but emails go nowhere.
:::

## Environment Variables

**Never hardcode keys in your source code!**

```bash
# .env
SENDFLOW_API_KEY=sf_live_your_key_here
```

```javascript
// Node.js
const client = new SendFlow(process.env.SENDFLOW_API_KEY);
```

```python
# Python
import os
sendflow.api_key = os.environ['SENDFLOW_API_KEY']
```

## Key Management Best Practices

### ✅ Do

- Store keys in environment variables
- Use test keys for development
- Rotate keys periodically
- Delete unused keys
- Use separate keys for each environment

### ❌ Don't

- Commit keys to git
- Share keys via email/Slack
- Use production keys in development
- Expose keys in client-side code
- Use the same key across multiple apps

## Rotating Keys

If a key is compromised:

1. Create a new API key
2. Update your app with the new key
3. Deploy changes
4. Delete the old key

**Zero downtime:** Create new key before deleting old one.

## Rate Limits

Authenticated requests are rate-limited based on your plan:

| Plan | Requests/second |
|------|-----------------|
| Free | 10 |
| Starter | 50 |
| Growth | 200 |
| Scale | Custom |

Rate limit headers:

```
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640000000
```

## Errors

### 401 Unauthorized

```json
{
  "error": {
    "code": "unauthorized",
    "message": "Invalid API key"
  }
}
```

**Causes:**
- Wrong API key
- Deleted key
- Key not in Authorization header

### 429 Too Many Requests

```json
{
  "error": {
    "code": "rate_limit",
    "message": "Rate limit exceeded. Retry after 60 seconds."
  }
}
```

**Solution:** Wait and retry. Upgrade for higher limits.

## Security

### HTTPS Only

All API requests must use HTTPS. HTTP requests are rejected.

### Key Permissions

Coming soon: Scope API keys to specific permissions
- `email:send` - Send emails only
- `email:read` - Read email status
- `template:write` - Manage templates

### IP Whitelisting

Enterprise plans can restrict API keys to specific IPs.

[Contact sales](mailto:sales@sendflow.io) for IP whitelisting.

## Next Steps

- [Send your first email](/getting-started/first-email)
- [View API reference](/reference/send)
- [Explore webhooks](/guides/webhooks)
