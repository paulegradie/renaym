# Renaym Pricing Implementation Spec

## Overview
Update the pricing page and backend to support the new subscription tiers.

## New Pricing Structure

| Plan | Price | Billing Period | Stripe Price ID Variable |
|------|-------|----------------|--------------------------|
| **Free** | $0 | N/A | N/A |
| **Annual** | $12 | Per year | `STRIPE_PRICE_ID_ANNUAL` |
| **2-Year** | $20 | Every 2 years | `STRIPE_PRICE_ID_2YEAR` |
| **Lifetime** | $35 | One-time | `STRIPE_PRICE_ID_LIFETIME` |

## Frontend Changes

### File: `Renaym/app/pricing/page.tsx`

Update the pricing cards to display:

1. **Free Tier** (no changes)
   - Price: $0/forever
   - Keep existing features

2. **Annual Tier** (replaces current "Pro")
   - Name: "Annual"
   - Price: "$12"
   - Period: "/year"
   - Description: "For serious media collectors"
   - Button: "Subscribe" → calls `handleCheckout('annual')`
   - Features:
     - Unlimited files
     - AI-powered parsing (LLM)
     - Custom naming templates
     - Priority support

3. **2-Year Tier** (NEW - add between Annual and Lifetime)
   - Name: "2-Year"
   - Price: "$20"
   - Period: "/2 years"
   - Description: "Best value for committed users"
   - Badge: "Save 17%"
   - Button: "Subscribe" → calls `handleCheckout('2year')`
   - Features:
     - Everything in Annual
     - Save $4 vs annual billing
   - Mark as `popular={true}` (move from Pro)

4. **Lifetime Tier**
   - Price: "$35" (unchanged)
   - Period: "/once"
   - Add feature: "Pays for itself in under 3 years"

### Update `handleCheckout` function
Change the plan type from `'pro' | 'lifetime'` to `'annual' | '2year' | 'lifetime'`

## Backend Changes

### File: `Renaym.App/lambda/functions/stripe-checkout/index.js`

Update the plan validation and price ID mapping:

```javascript
// Line ~25: Update valid plans
if (!plan || !['annual', '2year', 'lifetime'].includes(plan)) {
  return { statusCode: 400, ... };
}

// Line ~37: Update price ID mapping
let priceId;
switch (plan) {
  case 'annual':
    priceId = process.env.STRIPE_PRICE_ID_ANNUAL;
    break;
  case '2year':
    priceId = process.env.STRIPE_PRICE_ID_2YEAR;
    break;
  case 'lifetime':
    priceId = process.env.STRIPE_PRICE_ID_LIFETIME;
    break;
}

// Line ~54: Update checkout mode
const session = await stripe.checkout.sessions.create({
  mode: plan === 'lifetime' ? 'payment' : 'subscription',
  ...
});
```

### File: `Renaym.App/infrastructure/terraform/variables.tf`

Add new variable:
```hcl
variable "stripe_price_id_annual" {
  description = "Stripe Price ID for annual subscription"
  type        = string
}

variable "stripe_price_id_2year" {
  description = "Stripe Price ID for 2-year subscription"
  type        = string
}
```

Remove old variable `stripe_price_id_pro`.

### File: `Renaym.App/infrastructure/terraform/terraform.tfvars`

Update with new Stripe Price IDs (to be provided after creating products in Stripe):
```hcl
stripe_price_id_annual   = "price_XXXXX"  # $12/year recurring
stripe_price_id_2year    = "price_XXXXX"  # $20/2 years recurring
stripe_price_id_lifetime = "price_XXXXX"  # $35 one-time (existing)
```

### File: `Renaym.App/infrastructure/terraform/main.tf`

Update Lambda environment variables to use new price ID variable names.

## Stripe Product Setup (Manual)

Create in Stripe Dashboard:

1. **Product: "Renaym Annual"**
   - Price: $12.00 USD
   - Billing: Recurring, yearly

2. **Product: "Renaym 2-Year"**
   - Price: $20.00 USD
   - Billing: Recurring, every 2 years

3. **Product: "Renaym Lifetime"** (if not exists)
   - Price: $35.00 USD
   - Billing: One-time

Copy the `price_XXXXX` IDs into `terraform.tfvars`.

## Deployment

1. Update frontend code
2. Update Lambda code
3. Update Terraform variables
4. Run `cd Renaym.App/lambda && .\deploy.ps1`
5. Rebuild and deploy frontend

## Grid Layout Note

The pricing page currently uses a 3-column grid (`grid md:grid-cols-3`). With 4 tiers, update to:
- `grid md:grid-cols-2 lg:grid-cols-4` for 4 equal columns, OR
- Keep 3 columns and stack Free tier separately above

