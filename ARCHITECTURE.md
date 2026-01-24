# renaym Website Architecture

## 🎯 Design Philosophy

**Simple, Self-Serve, No Database**

This website is designed to be:

- ✅ **Zero maintenance** - No database to manage
- ✅ **Free to run** - Vercel free tier + Stripe fees only
- ✅ **Self-serve** - Users can buy and retrieve licenses without support
- ✅ **Scalable** - Serverless architecture scales automatically

## 🏗️ Architecture Overview

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─────────────────────────────────────┐
       │                                     │
       ▼                                     ▼
┌─────────────┐                      ┌─────────────┐
│  Next.js    │                      │   Stripe    │
│  (Vercel)   │◄────Webhook──────────│  Checkout   │
└──────┬──────┘                      └─────────────┘
       │
       │ Query customer
       │ by email
       ▼
┌─────────────┐
│   Stripe    │
│  Customers  │ ← License keys stored in metadata
└─────────────┘
```

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Hosting**: Vercel (free tier)
- **Database**: None! (Stripe metadata)
- **Email**: TODO (Resend/SendGrid)

## 🔄 User Flows

### Purchase Flow

```
1. User clicks "Buy Pro" on /pricing
   ↓
2. POST /api/stripe/checkout
   - Creates Stripe checkout session
   - Returns checkout URL
   ↓
3. User redirected to Stripe Checkout
   - Enters payment info
   - Completes purchase
   ↓
4. Stripe webhook → POST /api/stripe/webhook
   - Generates license key
   - Stores in Stripe customer metadata
   - Sends email (TODO)
   ↓
5. User redirected to /success
   - Shows confirmation
   - Instructions to check email
```

### License Retrieval Flow

```
1. User visits /retrieve-license
   ↓
2. Enters email address
   ↓
3. POST /api/retrieve-license
   - Queries Stripe for customer by email
   - Returns license key from metadata
   ↓
4. License key displayed
   - Copy to clipboard button
   - Activation instructions
```

## 💾 Data Storage

**Everything is stored in Stripe!**

### Stripe Customer Metadata

```json
{
  "email": "user@example.com",
  "metadata": {
    "license_key": "RENAYM-XXXXX-XXXXX-XXXXX-XXXXX",
    "plan": "pro",
    "issued_at": "2024-01-15T10:30:00Z",
    "expires_at": "2025-01-15T10:30:00Z"
  }
}
```

### Why No Database?

1. **Simplicity** - One less service to manage
2. **Cost** - Stripe is already paid for
3. **Reliability** - Stripe handles backups
4. **Compliance** - Stripe is PCI compliant
5. **Scale** - No database bottleneck

### Limitations

- Can't do complex queries
- Dependent on Stripe
- Rate limits on API calls

**For this use case, these are acceptable tradeoffs!**

## 🔐 Security

### API Routes

All API routes are serverless functions:

- `/api/stripe/checkout` - Creates checkout session
- `/api/stripe/webhook` - Handles payment events (verified with webhook secret)
- `/api/retrieve-license` - Retrieves license by email

### Webhook Verification

```typescript
const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
```

This ensures webhooks are actually from Stripe.

### Environment Variables

Sensitive data is stored in environment variables:

- `STRIPE_SECRET_KEY` - Server-side only
- `STRIPE_WEBHOOK_SECRET` - Server-side only
- `STRIPE_PRICE_ID_*` - Server-side only

Public variables:

- `NEXT_PUBLIC_URL` - Used in client-side code

## 📧 Email Integration (Future)

Currently, license keys are logged to console. To add email:

### Option 1: Resend (Recommended)

```typescript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "renaym <noreply@yourdomain.com>",
  to: email,
  subject: "Your License Key",
  html: emailTemplate,
});
```

**Cost**: Free for 3,000 emails/month

### Option 2: SendGrid

```typescript
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: email,
  from: "noreply@yourdomain.com",
  subject: "Your License Key",
  html: emailTemplate,
});
```

**Cost**: Free for 100 emails/day

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

**Free tier includes:**

- Unlimited deployments
- Automatic HTTPS
- Global CDN
- Serverless functions
- 100GB bandwidth/month

### Environment Variables in Production

```
STRIPE_SECRET_KEY=sk_live_...  # Use LIVE keys!
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_LIFETIME=price_...
NEXT_PUBLIC_URL=https://renaym.com
RESEND_API_KEY=re_...  # Optional
```

## 📊 Monitoring

### Built-in (Free)

- **Vercel Analytics** - Page views, performance
- **Vercel Logs** - Function logs, errors
- **Stripe Dashboard** - Payments, customers

### Optional

- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **PostHog** - Product analytics

## 🔄 Future Enhancements

### Phase 1 (Current)

- ✅ Stripe checkout
- ✅ License generation
- ✅ License retrieval
- ✅ No database

### Phase 2 (Next)

- [ ] Email integration (Resend)
- [ ] Custom email templates
- [ ] License validation API (for desktop app)

### Phase 3 (Future)

- [ ] User dashboard (login with email magic link)
- [ ] Subscription management
- [ ] Usage analytics
- [ ] Affiliate program

### When to Add a Database?

Add a database if you need:

- User accounts with passwords
- Complex queries/analytics
- Multiple products/bundles
- Team licenses
- Usage tracking

**Until then, keep it simple!**

## 💡 Key Decisions

### Why Next.js?

- Modern, well-supported
- Great developer experience
- Vercel integration
- API routes built-in

### Why Stripe Metadata?

- No database needed
- Stripe already stores customer data
- Simple to implement
- Reliable

### Why Vercel?

- Free tier is generous
- Auto-deploys from GitHub
- Great performance
- Zero config

### Why Simple License Keys?

- Easy to implement
- No RSA key management
- Good enough for MVP
- Can upgrade later

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
