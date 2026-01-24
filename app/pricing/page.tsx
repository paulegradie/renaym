'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: 'pro' | 'lifetime') => {
    setLoading(plan);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that works for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <PricingCard
            name="Free"
            description="Perfect for trying out Renaime"
            price="$0"
            period="/forever"
            features={[
              'Up to 50 files per session',
              'TMDB metadata matching',
              'Basic filename parsing',
              'Subtitle support',
            ]}
            buttonText="Download Free"
            buttonHref="/download"
          />

          {/* Pro Tier */}
          <PricingCard
            name="Pro"
            description="For serious media collectors"
            price="$19"
            period="/year"
            popular
            features={[
              'Unlimited files',
              'AI-powered parsing (LLM)',
              'Custom naming templates',
              'Priority support',
              'All Free features',
            ]}
            buttonText="Coming Soon"
            onButtonClick={() => handleCheckout('pro')}
            loading={loading === 'pro'}
            disabled={true}
          />

          {/* Lifetime Tier */}
          <PricingCard
            name="Lifetime"
            description="One-time purchase, forever yours"
            price="$49"
            period="/once"
            features={[
              'Everything in Pro',
              'Lifetime updates',
              'Early access to features',
              'Support development',
            ]}
            buttonText="Coming Soon"
            onButtonClick={() => handleCheckout('lifetime')}
            loading={loading === 'lifetime'}
            disabled={true}
          />
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            🎉 <strong>Launch Special:</strong> All features are currently free while in beta!
          </p>
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  popular?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

function PricingCard({
  name,
  description,
  price,
  period,
  features,
  buttonText,
  buttonHref,
  onButtonClick,
  popular,
  loading,
  disabled,
}: PricingCardProps) {
  const borderClass = popular ? 'border-2 border-indigo-500' : 'border border-gray-200';

  return (
    <div className={`rounded-2xl ${borderClass} p-8 bg-white relative`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-600">{period}</span>
      </div>
      <ul className="space-y-3 mb-8 text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      {buttonHref ? (
        <Link
          href={buttonHref}
          className="block w-full py-3 px-4 text-center rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
        >
          {buttonText}
        </Link>
      ) : (
        <button
          onClick={onButtonClick}
          disabled={disabled || loading}
          className={`block w-full py-3 px-4 text-center rounded-lg font-semibold transition ${popular
            ? 'bg-indigo-500 text-white hover:bg-indigo-600'
            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Loading...' : buttonText}
        </button>
      )}
    </div>
  );
}

