---
title: Send Your First Email
description: Step-by-step guide to sending your first email with SendFlow
---

Let's send your first email! This takes less than 2 minutes.

## Prerequisites

- SendFlow account ([sign up free](https://app.sendflow.io/signup))
- API key ([get yours here](/getting-started/authentication))

## Simple Email (Plain Text)

```javascript
const SendFlow = require('@sendflow/node');
const client = new SendFlow(process.env.SENDFLOW_API_KEY);

await client.send({
  to: 'recipient@example.com',
  from: 'you@yourdomain.com',
  subject: 'Hello from SendFlow!',
  text: 'This is my first email via SendFlow API.'
});
```

## HTML Email

```javascript
await client.send({
  to: 'recipient@example.com',
  from: 'you@yourdomain.com',
  subject: 'Welcome to our platform',
  html: `
    <h1>Welcome!</h1>
    <p>Thanks for signing up. We're excited to have you.</p>
    <a href="https://yourapp.com/verify">Verify your email</a>
  `
});
```

## With Attachments

```javascript
await client.send({
  to: 'recipient@example.com',
  from: 'you@yourdomain.com',
  subject: 'Your invoice',
  html: '<p>Please find your invoice attached.</p>',
  attachments: [
    {
      filename: 'invoice.pdf',
      path: './invoices/invoice-123.pdf'
    }
  ]
});
```

## Using Templates

First, create a template in the [SendFlow dashboard](https://app.sendflow.io/templates):

```html
<!-- Template: welcome-email -->
<h1>Hi {{name}}!</h1>
<p>Welcome to {{company}}. Click below to get started:</p>
<a href="{{onboardingLink}}">Get Started</a>
```

Then send using the template:

```javascript
await client.send({
  to: 'newuser@example.com',
  from: 'welcome@yourapp.com',
  template: 'welcome-email',
  data: {
    name: 'Alice',
    company: 'YourApp',
    onboardingLink: 'https://yourapp.com/onboarding'
  }
});
```

## Multiple Recipients

```javascript
// Send to multiple people (same email)
await client.send({
  to: ['user1@example.com', 'user2@example.com'],
  from: 'you@yourdomain.com',
  subject: 'Team update',
  html: '<p>Important team announcement...</p>'
});
```

## CC and BCC

```javascript
await client.send({
  to: 'primary@example.com',
  cc: ['manager@example.com'],
  bcc: ['archive@yourcompany.com'],
  from: 'you@yourdomain.com',
  subject: 'Report',
  html: '<p>Monthly report attached.</p>'
});
```

## Custom Headers

```javascript
await client.send({
  to: 'user@example.com',
  from: 'you@yourdomain.com',
  subject: 'Hello',
  html: '<p>Hello!</p>',
  headers: {
    'Reply-To': 'support@yourcompany.com',
    'X-Custom-Header': 'custom-value'
  }
});
```

## Tracking

Enable open and click tracking:

```javascript
await client.send({
  to: 'user@example.com',
  from: 'you@yourdomain.com',
  subject: 'Check this out',
  html: '<p>Click <a href="https://example.com">here</a>!</p>',
  tracking: {
    opens: true,
    clicks: true
  }
});
```

View tracking data in the dashboard or via webhooks.

## Response

Successful send returns:

```json
{
  "id": "em_1a2b3c4d5e",
  "status": "queued",
  "to": ["user@example.com"],
  "from": "you@yourdomain.com",
  "subject": "Hello from SendFlow!",
  "created_at": "2024-01-15T10:30:00Z"
}
```

Save the `id` to track delivery status later.

## Check Status

```javascript
const email = await client.emails.get('em_1a2b3c4d5e');

console.log(email.status);  // 'delivered', 'opened', 'clicked', etc.
```

## Error Handling

```javascript
try {
  await client.send({...});
} catch (error) {
  switch (error.code) {
    case 'invalid_recipient':
      console.log('Bad email address');
      break;
    case 'rate_limit':
      console.log('Sending too fast!');
      break;
    case 'quota_exceeded':
      console.log('Monthly limit reached');
      break;
    default:
      console.log('Error:', error.message);
  }
}
```

## Testing Without Sending

Use test mode to validate without actually sending:

```javascript
const client = new SendFlow(process.env.SENDFLOW_TEST_KEY);

// This won't actually send an email
await client.send({...});
```

Or use test email addresses:

```javascript
await client.send({
  to: 'test@sendflow.io',  // Goes to your inbox for testing
  from: 'you@yourdomain.com',
  subject: 'Test',
  html: '<p>Testing...</p>'
});
```

## Best Practices

### ✅ Do

- Use meaningful `from` addresses (no-reply@yourapp.com)
- Include both HTML and plain text versions
- Implement exponential backoff for retries
- Monitor bounce rates
- Set up webhooks for delivery tracking

### ❌ Don't

- Send from gmail.com/yahoo.com addresses
- Buy email lists (hello spam complaints!)
- Send without unsubscribe links (for marketing)
- Ignore bounce/complaint webhooks
- Send large attachments (> 10MB)

## Common Patterns

### Verification Email

```javascript
function sendVerificationEmail(user) {
  return client.send({
    to: user.email,
    from: 'noreply@yourapp.com',
    subject: 'Verify your email',
    template: 'email-verification',
    data: {
      name: user.name,
      verifyLink: generateVerifyLink(user)
    }
  });
}
```

### Password Reset

```javascript
function sendPasswordReset(user) {
  return client.send({
    to: user.email,
    from: 'security@yourapp.com',
    subject: 'Reset your password',
    template: 'password-reset',
    data: {
      resetLink: generateResetLink(user),
      expiresIn: '1 hour'
    }
  });
}
```

### Notification Email

```javascript
function sendNotification(user, event) {
  return client.send({
    to: user.email,
    from: 'notifications@yourapp.com',
    subject: event.title,
    template: 'notification',
    data: {
      eventType: event.type,
      message: event.message,
      actionLink: event.link
    }
  });
}
```

## Next Steps

- [Set up email templates](/guides/templates)
- [Configure webhooks](/guides/webhooks)
- [Authenticate your domain](/guides/domains)
- [View analytics](/guides/analytics)
- [Explore SDKs](/sdks/nodejs)

**Questions?** Email support@sendflow.io or check our [FAQ](https://sendflow.io/faq).
