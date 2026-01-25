import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { generateSimpleLicenseKey, calculateExpiryDate } from '@/lib/license';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    await handleCheckoutComplete(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_email || session.customer_details?.email;
  const plan = session.metadata?.plan as 'pro' | 'lifetime';

  if (!customerEmail || !plan) {
    console.error('Missing customer email or plan in session:', session.id);
    return;
  }

  // Generate license key
  const licenseKey = generateSimpleLicenseKey();
  const issuedAt = new Date().toISOString();
  const expiresAt = calculateExpiryDate(plan);

  try {
    // Store license key in Stripe customer metadata
    let customerId = session.customer as string;

    // If no customer exists, create one
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: customerEmail,
        metadata: {
          license_key: licenseKey,
          plan,
          issued_at: issuedAt,
          expires_at: expiresAt || 'lifetime',
        },
      });
      customerId = customer.id;
    } else {
      // Update existing customer
      await stripe.customers.update(customerId, {
        metadata: {
          license_key: licenseKey,
          plan,
          issued_at: issuedAt,
          expires_at: expiresAt || 'lifetime',
        },
      });
    }

    // Send email with license key
    await sendLicenseEmail(customerEmail, licenseKey, plan);

    console.log(`License generated for ${customerEmail}: ${licenseKey}`);
  } catch (error) {
    console.error('Error storing license key:', error);
  }
}

async function sendLicenseEmail(email: string, licenseKey: string, plan: string) {
  // TODO: Integrate with email service (SendGrid, Resend, etc.)
  // For now, just log it
  console.log(`
    ===== LICENSE EMAIL =====
    To: ${email}
    Subject: Your Renaym ${plan} License Key
    
    Thank you for purchasing Renaym ${plan}!
    
    Your license key: ${licenseKey}
    
    To activate:
    1. Open Renaym
    2. Go to Settings
    3. Enter your license key
    4. Click Activate
    
    You can retrieve your license key anytime at:
    ${process.env.NEXT_PUBLIC_URL}/retrieve-license
    
    Thank you for your support!
    - The Renaym Team
    ========================
  `);

  // In production, use an email service:
  // await sendEmail({
  //   to: email,
  //   subject: `Your Renaym ${plan} License Key`,
  //   html: `...`
  // });
}

