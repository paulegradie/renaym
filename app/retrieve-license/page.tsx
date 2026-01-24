'use client';

import { useState } from 'react';

interface LicenseInfo {
  licenseKey: string;
  plan: string;
  issuedAt: string;
  expiresAt: string | null;
}

export default function RetrieveLicensePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [license, setLicense] = useState<LicenseInfo | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setLicense(null);

    try {
      const response = await fetch('/api/retrieve-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to retrieve license');
      }

      const data = await response.json();
      setLicense(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (license) {
      navigator.clipboard.writeText(license.licenseKey);
      alert('License key copied to clipboard!');
    }
  };

  return (
    <section className="min-h-screen py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Retrieve Your License</h1>
          <p className="text-xl text-zinc-400">
            Enter your email to retrieve your renaym license key
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Retrieve License'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 glass-card border-red-500/30 rounded-xl">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {license && (
            <div className="mt-6 p-6 glass-card border-emerald-500/30 rounded-xl">
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                Your License Key
              </h3>

              <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700 mb-4">
                <code className="text-sm font-mono break-all text-cyan-400">{license.licenseKey}</code>
              </div>

              <button
                onClick={copyToClipboard}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:opacity-90 transition mb-4"
              >
                📋 Copy to Clipboard
              </button>

              <div className="space-y-2 text-sm text-zinc-400">
                <p><strong className="text-zinc-300">Plan:</strong> {license.plan}</p>
                <p><strong className="text-zinc-300">Issued:</strong> {new Date(license.issuedAt).toLocaleDateString()}</p>
                {license.expiresAt && (
                  <p><strong className="text-zinc-300">Expires:</strong> {new Date(license.expiresAt).toLocaleDateString()}</p>
                )}
                {!license.expiresAt && (
                  <p><strong className="text-zinc-300">Expires:</strong> Never (Lifetime)</p>
                )}
              </div>

              <div className="mt-4 p-4 bg-zinc-800/50 rounded-xl">
                <p className="text-sm text-zinc-400">
                  <strong className="text-zinc-300">To activate:</strong> Open renaym → Settings → Enter license key → Activate
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-zinc-500">
          <p>
            Can't find your license?{' '}
            <a href="mailto:support@renaym.com" className="text-primary hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

