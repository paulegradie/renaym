# 🚀 Getting Started with Renaime Website

## What You Have

A complete, production-ready Next.js website with:

✅ **Beautiful Design** - Your Jekyll design converted to Next.js  
✅ **Stripe Integration** - Full checkout and payment flow  
✅ **License Management** - Automatic generation and retrieval  
✅ **No Database** - Uses Stripe metadata (zero maintenance)  
✅ **Free Hosting** - Ready for Vercel (free tier)  
✅ **Self-Serve** - Users can buy and retrieve licenses automatically  

## 📁 What's Inside

```
website-nextjs/
├── app/
│   ├── page.tsx                 # Home page (hero + features)
│   ├── pricing/page.tsx         # Pricing with Stripe checkout
│   ├── download/page.tsx        # Download links
│   ├── docs/page.tsx            # Documentation
│   ├── retrieve-license/page.tsx # License retrieval
│   ├── success/page.tsx         # Post-purchase success
│   └── api/
│       ├── stripe/checkout/     # Create checkout session
│       ├── stripe/webhook/      # Handle payments
│       └── retrieve-license/    # Get license by email
├── components/
│   ├── Header.tsx               # Navigation
│   └── Footer.tsx               # Footer
├── lib/
│   └── license.ts               # License key generation
├── README.md                    # Full documentation
├── SETUP.md                     # Quick setup guide
└── ARCHITECTURE.md              # Technical details
```

## ⚡ Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
cd website-nextjs
npm install
```

### 2. Set Up Stripe

1. Create account at https://stripe.com
2. Get test API keys from https://dashboard.stripe.com/test/apikeys
3. Create two products:
   - **Renaime Pro**: $19/year (recurring)
   - **Renaime Lifetime**: $49 (one-time)

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Stripe keys.

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 5. Test Purchase

1. Go to http://localhost:3000/pricing
2. Click "Buy Pro"
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout
5. Check console for license key

**See SETUP.md for detailed instructions!**

## 🌐 Deploy to Production

### Option 1: Vercel (Recommended - Free)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# 2. Go to vercel.com
# 3. Import your repo
# 4. Add environment variables
# 5. Deploy!
```

**That's it!** Vercel handles everything:
- ✅ Auto-deploys on git push
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Serverless functions
- ✅ 100GB bandwidth/month

### Option 2: Other Platforms

The site works on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 💳 Stripe Setup

### Test Mode vs Live Mode

**Test Mode** (for development):
- Use test API keys (sk_test_...)
- Use test cards (4242 4242 4242 4242)
- No real money charged

**Live Mode** (for production):
- Use live API keys (sk_live_...)
- Real cards charged
- Real money transferred

### Webhook Setup

**Local Development:**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**Production:**
1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://your-site.vercel.app/api/stripe/webhook`
3. Select event: `checkout.session.completed`
4. Copy webhook secret to Vercel environment variables

## 📧 Email Setup (Optional)

Currently, license keys are logged to console. To send real emails:

### Recommended: Resend

1. Sign up at https://resend.com (free: 3,000 emails/month)
2. Get API key
3. Install: `npm install resend`
4. Add to `.env.local`: `RESEND_API_KEY=re_...`
5. Update `app/api/stripe/webhook/route.ts` (see comments in file)

### Alternative: SendGrid

Free tier: 100 emails/day

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#6366f1',    // Change this
  secondary: '#8b5cf6',  // And this
}
```

### Change Pricing

Edit `app/pricing/page.tsx`:

```typescript
price="$19"  // Change price display
period="/year"  // Change period
```

Don't forget to update Stripe products too!

### Add Pages

Create new file in `app/`:

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <div>About us...</div>
}
```

Automatically available at `/about`

## 🔧 How It Works

### Purchase Flow

```
User clicks "Buy" 
  → Stripe Checkout 
  → Payment success 
  → Webhook fires 
  → License generated 
  → Stored in Stripe metadata 
  → Email sent (TODO)
```

### License Retrieval

```
User enters email 
  → Query Stripe 
  → Find customer 
  → Return license from metadata
```

### No Database!

All data stored in Stripe customer metadata:
- License key
- Plan type
- Issue date
- Expiry date

**Benefits:**
- ✅ Zero database costs
- ✅ Zero maintenance
- ✅ Stripe handles backups
- ✅ Simple architecture

## 📚 Documentation

- **README.md** - Complete documentation
- **SETUP.md** - Step-by-step setup guide
- **ARCHITECTURE.md** - Technical architecture
- **This file** - Quick overview

## 🆘 Troubleshooting

**Checkout doesn't work?**
- Check Stripe keys in `.env.local`
- Check browser console for errors
- Verify price IDs are correct

**Webhook not firing?**
- Run `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Check webhook secret in `.env.local`
- Check server console for logs

**License not found?**
- Check Stripe dashboard for customer
- Verify customer has metadata
- Check email matches exactly

## ✅ Next Steps

1. [ ] Complete Stripe setup (SETUP.md)
2. [ ] Test purchase flow locally
3. [ ] Add email service (Resend)
4. [ ] Deploy to Vercel
5. [ ] Switch to live Stripe keys
6. [ ] Test real purchase
7. [ ] Launch! 🚀

## 💡 Tips

- Start in test mode, switch to live when ready
- Use Stripe CLI for local webhook testing
- Check Stripe dashboard for all transactions
- Monitor Vercel logs for errors
- Keep environment variables secure

## 🎉 You're Ready!

Everything is set up and ready to go. Just:
1. Configure Stripe
2. Run `npm run dev`
3. Test locally
4. Deploy to Vercel
5. Start selling!

Questions? Check the other docs or open an issue on GitHub.

Good luck! 🚀

