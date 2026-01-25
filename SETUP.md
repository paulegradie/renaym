# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Stripe (Test Mode)

1. **Create Stripe Account** (if you don't have one)
   - Go to https://stripe.com
   - Sign up for free

2. **Get API Keys**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy "Secret key" (starts with `sk_test_`)
   - Copy "Publishable key" (starts with `pk_test_`)

3. **Create Products**
   - Go to https://dashboard.stripe.com/test/products
   - Click "Add product"

   **Product 1: Renaym Pro**
   - Name: Renaym Pro
   - Price: $5
   - Billing: Recurring, monthly
   - Copy the Price ID (starts with `price_`)

   **Product 2: Renaym Lifetime**
   - Name: Renaym Lifetime
   - Price: $35
   - Billing: One-time
   - Copy the Price ID (starts with `price_`)

### Step 3: Configure Environment

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your keys:

```env
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE  # We'll get this in Step 4
STRIPE_PRICE_ID_PRO=price_YOUR_PRO_PRICE_ID
STRIPE_PRICE_ID_LIFETIME=price_YOUR_LIFETIME_PRICE_ID
NEXT_PUBLIC_URL=http://localhost:3000
```

### Step 4: Set Up Webhook (Local Testing)

**Option A: Use Stripe CLI (Recommended)**

```bash
# Install Stripe CLI
# Windows: scoop install stripe
# Mac: brew install stripe/stripe-cli/stripe
# Or download from: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook secret (starts with whsec_) to .env.local
```

**Option B: Skip for now**

- You can test the site without webhooks
- License keys won't be generated, but checkout will work

### Step 5: Run the Site

```bash
npm run dev
```

Open http://localhost:3000

### Step 6: Test Purchase Flow

1. Go to http://localhost:3000/pricing
2. Click "Buy Pro" (or "Buy Lifetime")
3. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
4. Complete checkout
5. Check console for license key (since email isn't set up yet)

## 🧪 Testing

### Test Cards

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

### Test License Retrieval

1. After a test purchase, go to http://localhost:3000/retrieve-license
2. Enter the email you used in checkout
3. Your license key will appear

## 📧 Add Email (Optional)

To send real emails with license keys:

1. **Sign up for Resend** (free tier: 3,000 emails/month)
   - https://resend.com

2. **Install Resend**

   ```bash
   npm install resend
   ```

3. **Add to `.env.local`**

   ```env
   RESEND_API_KEY=re_...
   ```

4. **Update webhook handler**

   Edit `app/api/stripe/webhook/route.ts`:

   ```typescript
   import { Resend } from "resend";

   const resend = new Resend(process.env.RESEND_API_KEY);

   async function sendLicenseEmail(email: string, licenseKey: string, plan: string) {
     await resend.emails.send({
       from: "Renaym <noreply@yourdomain.com>",
       to: email,
       subject: `Your Renaym ${plan} License Key`,
       html: `
         <h1>Thank you for purchasing Renaym!</h1>
         <p>Your license key: <strong>${licenseKey}</strong></p>
         <p>To activate, open Renaym and enter this key in Settings.</p>
       `,
     });
   }
   ```

## 🚀 Deploy to Vercel

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repo
   - Add environment variables (same as .env.local)
   - Deploy!

3. **Update Stripe Webhook**
   - Go to https://dashboard.stripe.com/test/webhooks
   - Add endpoint: `https://your-site.vercel.app/api/stripe/webhook`
   - Select event: `checkout.session.completed`
   - Copy webhook secret to Vercel environment variables

## ✅ You're Done!

Your site is now live and accepting payments! 🎉

## 🆘 Troubleshooting

**Checkout button doesn't work?**

- Check browser console for errors
- Verify Stripe keys in `.env.local`
- Make sure dev server is running

**Webhook not firing?**

- Make sure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Check webhook secret in `.env.local`

**License not showing up?**

- Check server console for webhook logs
- Verify customer was created in Stripe dashboard
- Check customer metadata in Stripe

## 📚 Next Steps

- [ ] Switch to live mode (use live Stripe keys)
- [ ] Set up custom domain
- [ ] Add email service (Resend/SendGrid)
- [ ] Customize email templates
- [ ] Add analytics (Vercel Analytics is free)
- [ ] Set up monitoring (Vercel automatically monitors)
