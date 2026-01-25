'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-zinc-900 rounded-lg p-1.5">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold gradient-text tracking-tight">Renaym</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/docs">Docs</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/download">Download</NavLink>
            <a
              href="https://github.com/paulegradie/Renaym"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/paulegradie/Renaym/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-zinc-400 hover:text-pink-400 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Feedback</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </a>
            <Link
              href="/download"
              className="ml-4 px-5 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col space-y-2">
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="/docs" onClick={() => setMobileMenuOpen(false)}>Docs</MobileNavLink>
              <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</MobileNavLink>
              <MobileNavLink href="/download" onClick={() => setMobileMenuOpen(false)}>Download</MobileNavLink>
              <a
                href="https://github.com/paulegradie/Renaym"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition"
              >
                GitHub
              </a>
              <a
                href="https://github.com/paulegradie/Renaym/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-zinc-400 hover:text-pink-400 hover:bg-white/5 rounded-lg transition inline-flex items-center gap-2"
              >
                <span>Feedback</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition"
    >
      {children}
    </Link>
  );
}

