---
title: Quick Start
description: Send your first email with SendFlow in under 5 minutes
---

Get started with SendFlow in 3 simple steps. No credit card required.

## Step 1: Create Account & Get API Key

1. **Sign up** at [app.sendflow.io/signup](https://app.sendflow.io/signup)
2. **Verify your email** (check your inbox)
3. **Copy your API key** from the dashboard

Your API key looks like this: `sf_live_abc123xyz456...`

:::caution
Keep your API key secret! Never commit it to git or expose it in client-side code.
:::

## Step 2: Send Your First Email

Choose your preferred method:

### Using cURL

```bash
curl https://api.sendflow.io/v1/send \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "from": "you@yourdomain.com",
    "subject": "My first SendFlow email!",
    "html": "<h1>Hello from SendFlow!</h1><p>This was easy!</p>"
  }'
```

### Using Node.js

```bash
npm install @sendflow/node
```

```javascript
const SendFlow = require('@sendflow/node');
const client = new SendFlow('YOUR_API_KEY');

async function sendEmail() {
  const result = await client.send({
    to: 'recipient@example.com',
    from: 'you@yourdomain.com',
    subject: 'My first SendFlow email!',
    html: '<h1>Hello from SendFlow!</h1><p>This was easy!</p>'
  });

  console.log('Email sent!', result.id);
}

sendEmail();
```

### Using Python

```bash
pip install sendflow
```

```python
import sendflow

sendflow.api_key = 'YOUR_API_KEY'

response = sendflow.send(
    to='recipient@example.com',
    from_email='you@yourdomain.com',
    subject='My first SendFlow email!',
    html='<h1>Hello from SendFlow!</h1><p>This was easy!</p>'
)

print(f"Email sent! ID: {response['id']}")
```

## Step 3: Verify Delivery

Check your email! You should receive the test email within seconds.

**In the SendFlow dashboard:**
- View email status (delivered, opened, clicked)
- See delivery metrics
- Monitor bounce/spam rates

## What's Next?

### Set up your sending domain

For production emails, you need to authenticate your domain:

```bash
# Add these DNS records to your domain
TXT  @  v=spf1 include:sendflow.io ~all
TXT  sf._domainkey  v=DKIM1; k=rsa; p=MIGfMA0GCS...
TXT  _dmarc  v=DMARC1; p=quarantine;
```

[Complete domain setup guide →](/guides/domains)

### Create email templates

Stop writing HTML by hand. Use our template builder:

```javascript
await client.send({
  to: 'user@example.com',
  template: 'welcome-email',  // Use your template
  data: {
    userName: 'Alice',
    confirmLink: 'https://...'
  }
});
```

[Template guide →](/guides/templates)

### Set up webhooks

Get notified when emails are delivered, opened, or bounced:

```javascript
// Your webhook endpoint receives
{
  "event": "delivered",
  "email_id": "em_123",
  "to": "user@example.com",
  "timestamp": 1234567890
}
```

[Webhook setup →](/guides/webhooks)

## Common Use Cases

### Password reset emails

```javascript
await client.send({
  to: user.email,
  from: 'noreply@yourapp.com',
  subject: 'Reset your password',
  template: 'password-reset',
  data: {
    resetLink: generateResetLink(user),
    expiresIn: '1 hour'
  }
});
```

### Order confirmations

```javascript
await client.send({
  to: customer.email,
  from: 'orders@shop.com',
  subject: `Order #${order.id} confirmed`,
  template: 'order-confirmation',
  data: {
    orderNumber: order.id,
    items: order.items,
    total: order.total
  }
});
```

### Welcome emails

```javascript
await client.send({
  to: newUser.email,
  from: 'welcome@yourapp.com',
  subject: 'Welcome to YourApp!',
  template: 'welcome',
  data: {
    name: newUser.name,
    verifyLink: generateVerifyLink(newUser)
  }
});
```

## API Response

Successful send returns:

```json
{
  "id": "em_1234567890abc",
  "status": "queued",
  "to": "recipient@example.com",
  "from": "you@yourdomain.com",
  "subject": "My first SendFlow email!",
  "created_at": "2024-01-15T10:30:00Z"
}
```

Track this email using the `id`.

## Rate Limits

| Plan | Rate Limit |
|------|------------|
| Free | 10 emails/second |
| Starter | 50 emails/second |
| Growth | 200 emails/second |
| Scale | Custom |

## Error Handling

```javascript
try {
  await client.send({...});
} catch (error) {
  if (error.code === 'invalid_recipient') {
    console.log('Bad email address');
  } else if (error.code === 'rate_limit') {
    console.log('Slow down!');
  } else {
    console.log('Error:', error.message);
  }
}
```

[Full error codes →](/reference/errors)

## Free Tier Limits

✅ 10,000 emails/month
✅ All features unlocked
✅ 90-day analytics retention
✅ Email support

**No credit card required to start**

[View pricing →](https://sendflow.io/pricing)

## Support

Need help?

- 📧 Email: support@sendflow.io
- 💬 Discord: [discord.gg/sendflow](https://discord.gg/sendflow)
- 📚 Docs: You're here!
- 🐛 Report bugs: [github.com/sendflow/issues](https://github.com/sendflow/issues)

## Next Steps

1. [Authenticate your domain](/guides/domains) (required for production)
2. [Create email templates](/guides/templates)
3. [Set up webhooks](/guides/webhooks)
4. [View analytics](/guides/analytics)
5. [Explore SDKs](/sdks/nodejs)

**Ready to scale?** [Upgrade your plan →](https://app.sendflow.io/billing)
