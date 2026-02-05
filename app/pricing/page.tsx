'use client';

import { useState } from 'react';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/lib/config';

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: 'annual' | '2year' | 'lifetime') => {
    setLoading(plan);

    try {
      const response = await fetch(API_ENDPOINTS.stripeCheckout, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="min-h-screen py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-zinc-400">Choose the plan that works for you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Free Tier */}
          <PricingCard
            name="Free"
            description="Perfect for trying out Renaym"
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

          {/* Annual Tier */}
          <PricingCard
            name="1-Year License"
            description="For serious media collectors"
            price="$12"
            period="/year"
            features={[
              'Unlimited files',
              'AI-powered parsing (LLM)',
              'Custom naming templates',
              'Priority support',
            ]}
            buttonText="Get License"
            onButtonClick={() => handleCheckout('annual')}
            loading={loading === 'annual'}
          />

          {/* 2-Year Tier */}
          <PricingCard
            name="2-Year License"
            description="Best value for committed users"
            price="$20"
            period="/2 years"
            popular
            badge="Save 17%"
            features={[
              'Everything in 1-Year',
              'Save $4 vs annual billing',
              'Lock in your price',
            ]}
            buttonText="Get License"
            onButtonClick={() => handleCheckout('2year')}
            loading={loading === '2year'}
          />

          {/* Lifetime Tier */}
          <PricingCard
            name="Lifetime License"
            description="One-time purchase, forever yours"
            price="$35"
            period="/once"
            features={[
              'Everything in 1-Year',
              'Lifetime updates',
              'Pays for itself in ~3 years',
              'Support development',
            ]}
            buttonText="Get Lifetime License"
            onButtonClick={() => handleCheckout('lifetime')}
            loading={loading === 'lifetime'}
          />
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-card">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
            <p className="text-zinc-300">
              All licenses include <strong className="text-white">full features</strong> from day one. Try the free version first!
            </p>
          </div>
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
  badge?: string;
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
  badge,
  loading,
  disabled,
}: PricingCardProps) {
  return (
    <div className={`relative rounded-2xl p-8 ${popular ? 'glass-card border-purple-500/50' : 'glass-card'}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {badge || 'Most Popular'}
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-zinc-400 mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-zinc-500">{period}</span>
      </div>
      <ul className="space-y-3 mb-8 text-zinc-400">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-emerald-400 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      {buttonHref ? (
        <Link
          href={buttonHref}
          className="block w-full py-3 px-4 text-center rounded-full border border-zinc-700 text-zinc-300 font-semibold hover:bg-white/5 hover:border-zinc-600 transition"
        >
          {buttonText}
        </Link>
      ) : (
        <button
          onClick={onButtonClick}
          disabled={disabled || loading}
          className={`block w-full py-3 px-4 text-center rounded-full font-semibold transition ${popular
            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:opacity-90'
            : 'border border-zinc-700 text-zinc-300 hover:bg-white/5'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Loading...' : buttonText}
        </button>
      )}
    </div>
  );
}

