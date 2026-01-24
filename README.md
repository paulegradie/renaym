# renaym Website

Next.js website for renaym with Stripe integration for license sales.

## Features

- ✅ Beautiful, responsive design (converted from Jekyll)
- ✅ Stripe checkout integration
- ✅ Automatic license key generation
- ✅ License retrieval by email
- ✅ No database required (uses Stripe metadata)
- ✅ Ready for Vercel deployment (free tier)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Stripe keys:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_LIFETIME=price_...
NEXT_PUBLIC_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stripe Setup

### 1. Create Products in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/products)
2. Create two products:
   - **renaym Pro** - $19/year (recurring)
   - **renaym Lifetime** - $49 (one-time)
3. Copy the Price IDs to your `.env.local`

### 2. Set Up Webhook

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/stripe/webhook`
4. Events to listen for:
   - `checkout.session.completed`
5. Copy the webhook secret to `.env.local`

### 3. Test Locally with Stripe CLI

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Use the webhook secret from the CLI output in .env.local
```

## How It Works

### Purchase Flow

1. User clicks "Buy Pro" on pricing page
2. Redirected to Stripe Checkout
3. After payment, Stripe webhook fires
4. Webhook handler:
   - Generates license key
   - Stores in Stripe customer metadata
   - Sends email to customer (TODO: integrate email service)
5. User receives license key via email

### License Retrieval

1. User visits `/retrieve-license`
2. Enters email address
3. System queries Stripe for customer
4. Returns license key from metadata

### No Database!

All data is stored in Stripe:

- Customer email
- License key
- Plan type
- Issue/expiry dates

This means:

- ✅ Zero database costs
- ✅ Zero database maintenance
- ✅ Stripe handles backups
- ✅ Simple architecture

## Deployment

### Deploy to Vercel (Recommended - Free)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

Vercel will:

- Auto-deploy on git push
- Provide free SSL
- Handle serverless functions
- Give you a production URL

### Environment Variables in Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ID_PRO
STRIPE_PRICE_ID_LIFETIME
NEXT_PUBLIC_URL (your Vercel URL)
```

### Update Stripe Webhook

After deployment, update your Stripe webhook URL to:

```
https://your-vercel-domain.vercel.app/api/stripe/webhook
```

## Email Integration (TODO)

Currently, license keys are logged to console. To send real emails:

1. Choose an email service:
   - [Resend](https://resend.com) - 3,000 emails/month free
   - [SendGrid](https://sendgrid.com) - 100 emails/day free
   - [Mailgun](https://www.mailgun.com) - 5,000 emails/month free

2. Install SDK:

```bash
npm install resend
# or
npm install @sendgrid/mail
```

3. Update `app/api/stripe/webhook/route.ts`:

```typescript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "renaym <noreply@yourdomain.com>",
  to: email,
  subject: `Your renaym ${plan} License Key`,
  html: `<p>Your license key: <strong>${licenseKey}</strong></p>`,
});
```

## Project Structure

```
website-nextjs/
├── app/
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts    # Create checkout session
│   │   │   └── webhook/route.ts     # Handle payment success
│   │   └── retrieve-license/route.ts # Retrieve license by email
│   ├── pricing/page.tsx              # Pricing page with buy buttons
│   ├── retrieve-license/page.tsx     # License retrieval form
│   ├── success/page.tsx              # Post-purchase success page
│   ├── download/page.tsx             # Download page
│   ├── docs/page.tsx                 # Documentation
│   ├── page.tsx                      # Home page
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
├── components/
│   ├── Header.tsx                    # Navigation header
│   └── Footer.tsx                    # Footer
├── lib/
│   └── license.ts                    # License key generation
└── package.json
```

## License Key Format

Simple format (current):

```
RENAYM-XXXXX-XXXXX-XXXXX-XXXXX
```

Signed format (optional, requires RSA keys):

```
base64(payload).base64(signature)
```

## Support

For issues, see the main [renaym repository](https://github.com/paulegradie/renaym).
