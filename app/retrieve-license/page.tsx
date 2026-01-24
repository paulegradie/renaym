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
    <section className="py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Retrieve Your License</h1>
          <p className="text-xl text-gray-600">
            Enter your email to retrieve your Renaime license key
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Retrieve License'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {license && (
            <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Your License Key</h3>

              <div className="bg-white p-4 rounded border border-gray-300 mb-4">
                <code className="text-sm font-mono break-all">{license.licenseKey}</code>
              </div>

              <button
                onClick={copyToClipboard}
                className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition mb-4"
              >
                📋 Copy to Clipboard
              </button>

              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Plan:</strong> {license.plan}</p>
                <p><strong>Issued:</strong> {new Date(license.issuedAt).toLocaleDateString()}</p>
                {license.expiresAt && (
                  <p><strong>Expires:</strong> {new Date(license.expiresAt).toLocaleDateString()}</p>
                )}
                {!license.expiresAt && (
                  <p><strong>Expires:</strong> Never (Lifetime)</p>
                )}
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded">
                <p className="text-sm text-gray-700">
                  <strong>To activate:</strong> Open Renaime → Settings → Enter license key → Activate
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Can't find your license?{' '}
            <a href="mailto:support@renaime.com" className="text-primary hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

