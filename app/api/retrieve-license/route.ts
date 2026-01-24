import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Search for customer by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return NextResponse.json(
        { error: 'No license found for this email address' },
        { status: 404 }
      );
    }

    const customer = customers.data[0];
    const metadata = customer.metadata;

    if (!metadata.license_key) {
      return NextResponse.json(
        { error: 'No license found for this email address' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      licenseKey: metadata.license_key,
      plan: metadata.plan,
      issuedAt: metadata.issued_at,
      expiresAt: metadata.expires_at === 'lifetime' ? null : metadata.expires_at,
    });
  } catch (error) {
    console.error('License retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve license' },
      { status: 500 }
    );
  }
}

