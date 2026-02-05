import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();

    if (!plan || !['annual', '2year', 'lifetime'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    // Get the price ID from environment variables based on plan
    let priceId: string | undefined;
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

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price not configured' },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    // Lifetime is a one-time payment, annual and 2year are recurring licenses
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: plan === 'lifetime' ? 'payment' : 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      metadata: {
        plan,
      },
    };

    // For one-time payments, explicitly create a customer record
    // This ensures we have a proper customer ID in the webhook (not a guest)
    // For recurring licenses, Stripe automatically creates a customer
    if (plan === 'lifetime') {
      sessionConfig.customer_creation = 'always';
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

