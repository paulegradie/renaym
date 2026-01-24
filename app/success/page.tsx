import Link from 'next/link';

export default function SuccessPage() {
  return (
    <section className="min-h-screen py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
          <p className="text-xl text-zinc-400">
            Thank you for purchasing renaym
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">What's Next?</h2>

          <div className="space-y-5 text-left">
            <div className="flex items-start space-x-4 p-4 bg-zinc-800/50 rounded-xl">
              <span className="text-2xl">📧</span>
              <div>
                <h3 className="font-semibold text-white">Check Your Email</h3>
                <p className="text-zinc-400 text-sm">
                  Your license key has been sent to your email address. It may take a few minutes to arrive.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-zinc-800/50 rounded-xl">
              <span className="text-2xl">💾</span>
              <div>
                <h3 className="font-semibold text-white">Download renaym</h3>
                <p className="text-zinc-400 text-sm">
                  If you haven't already, download the application for your platform.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-zinc-800/50 rounded-xl">
              <span className="text-2xl">🔑</span>
              <div>
                <h3 className="font-semibold text-white">Activate Your License</h3>
                <p className="text-zinc-400 text-sm">
                  Open renaym, go to Settings, and enter your license key to unlock all features.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/download"
            className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:opacity-90 transition"
          >
            Download renaym
          </Link>
          <Link
            href="/retrieve-license"
            className="px-8 py-3 glass-card text-white font-semibold rounded-full hover:bg-white/10 transition"
          >
            Retrieve License Key
          </Link>
        </div>

        <div className="mt-8 p-4 glass-card rounded-xl">
          <p className="text-sm text-zinc-400">
            <strong className="text-zinc-300">Lost your email?</strong> You can retrieve your license key anytime using your email address.
          </p>
        </div>
      </div>
    </section>
  );
}

