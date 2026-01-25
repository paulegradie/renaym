import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-zinc-950 border-t border-white/5 py-16 mt-auto overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-purple-500/10 via-pink-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg blur-md opacity-60" />
                <div className="relative bg-zinc-900 rounded-lg p-1.5">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold gradient-text">Renaym</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm">
              AI-powered media renaming. Intelligent filename parsing meets TMDB metadata for the perfect library.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/download" className="text-zinc-500 hover:text-white transition">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-zinc-500 hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-zinc-500 hover:text-white transition">
                  Docs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/paulegradie/Renaym/issues/new/choose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition inline-flex items-center gap-1.5"
                >
                  <span>Feedback</span>
                  <svg className="w-3.5 h-3.5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-12 pt-8 text-sm text-center text-zinc-600">
          <p>&copy; {currentYear} Renaym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

