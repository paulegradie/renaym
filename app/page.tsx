import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient grid-bg relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Beta Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-sm text-zinc-300 mb-8 border border-cyan-500/30 bg-cyan-500/5">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
            Beta — Now available for testing
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-white">Rename smarter.</span>
            <br />
            <span className="gradient-text">Not harder.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            <span>AI-powered filename parsing meets TMDB metadata.</span>
            <span className="text-zinc-300"> Organize your entire media library in minutes.</span>

          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/download"
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:opacity-90 transition-all duration-300 text-lg"
            >
              <span className="relative z-10">Download Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 glass-card text-white font-semibold rounded-full hover:bg-white/10 transition text-lg"
            >
              View Docs →
            </Link>
          </div>

          <p className="mt-8 text-sm text-zinc-500 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" /></svg>
              Windows
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /></svg>
              macOS
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.504 0c-.155 0-.311.003-.467.008a11.18 11.18 0 0 0-2.907.543A10.88 10.88 0 0 0 4.48 4.48a10.88 10.88 0 0 0-3.929 4.65 11.18 11.18 0 0 0-.543 2.907A10.95 10.95 0 0 0 0 12.504c0 .155.003.311.008.467.068 1.001.245 1.976.543 2.907a10.88 10.88 0 0 0 3.929 4.65 10.88 10.88 0 0 0 4.65 3.929c.931.298 1.906.475 2.907.543.156.005.312.008.467.008s.311-.003.467-.008a11.18 11.18 0 0 0 2.907-.543 10.88 10.88 0 0 0 4.65-3.929 10.88 10.88 0 0 0 3.929-4.65c.298-.931.475-1.906.543-2.907.005-.156.008-.312.008-.467s-.003-.311-.008-.467a11.18 11.18 0 0 0-.543-2.907 10.88 10.88 0 0 0-3.929-4.65 10.88 10.88 0 0 0-4.65-3.929 11.18 11.18 0 0 0-2.907-.543A10.95 10.95 0 0 0 12.504 0z" /></svg>
              Linux
            </span>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-dark py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Powerful features to transform your chaotic downloads into a perfectly organized library
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<AIIcon />}
              title="AI-Powered Parsing"
              description="Local LLM intelligently extracts metadata from even the messiest filenames."
              gradient="from-pink-500 to-rose-500"
            />
            <FeatureCard
              icon={<TMDBIcon />}
              title="TMDB Integration"
              description="Accurate metadata matching with intelligent scoring from The Movie Database."
              gradient="from-purple-500 to-violet-500"
            />
            <FeatureCard
              icon={<SubtitleIcon />}
              title="Subtitle Support"
              description="Automatic pairing and renaming of 5 subtitle formats."
              gradient="from-cyan-500 to-blue-500"
            />
            <FeatureCard
              icon={<CrossPlatformIcon />}
              title="Cross-Platform"
              description="Works beautifully on Windows, macOS, and Linux."
              gradient="from-emerald-500 to-green-500"
            />
            <FeatureCard
              icon={<SafeIcon />}
              title="Safe Operations"
              description="Collision detection, undo support, and backup tracking."
              gradient="from-amber-500 to-orange-500"
            />
            <FeatureCard
              icon={<OfflineIcon />}
              title="Fast & Offline"
              description="LLM runs locally - no cloud API, no data shared."
              gradient="from-indigo-500 to-purple-500"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Three steps to perfection
            </h2>
            <p className="text-xl text-zinc-400">
              From chaos to order in under a minute
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard number="01" title="Drop your files" description="Drag and drop your messy media files or select a folder" />
            <StepCard number="02" title="Let AI work" description="Our local LLM parses filenames and matches with TMDB" />
            <StepCard number="03" title="One click rename" description="Review and execute — your library is now perfect" />
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-24 section-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-sm text-emerald-300 mb-6 border border-emerald-500/30 bg-emerald-500/5">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
              </svg>
              Safe & Trustworthy
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built with your security in mind
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              We&apos;re a startup committed to transparency and earning your trust
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TrustCard
              icon={<ShieldCheckIcon />}
              title="Code Signed & Notarized"
              description="macOS apps are fully code-signed and notarized by Apple. Windows signing in progress."
              status="verified"
            />
            <TrustCard
              icon={<LockIcon />}
              title="Privacy First"
              description="AI runs 100% locally on your device. No data sent to cloud servers. No tracking."
              status="verified"
            />
            <TrustCard
              icon={<OpenSourceIcon />}
              title="Open Development"
              description="Built in the open. View our releases and verify checksums on GitHub."
              status="verified"
            />
            <TrustCard
              icon={<NoVirusIcon />}
              title="Malware Free"
              description="Clean, honest software. No viruses, no spyware, no hidden surprises."
              status="verified"
            />
            <TrustCard
              icon={<UpdateIcon />}
              title="Regular Updates"
              description="Active development with frequent updates and bug fixes."
              status="active"
            />
            <TrustCard
              icon={<SupportIcon />}
              title="Real Support"
              description="Direct support from the development team. We&apos;re here to help."
              status="active"
            />
          </div>

          {/* Security Notice */}
          <div className="mt-12 p-6 rounded-2xl glass-card border border-amber-500/20 bg-amber-500/5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-300 mb-2">
                  About Security Warnings on Windows
                </h3>
                <p className="text-zinc-400 mb-3">
                  As a new startup, Windows may show security warnings when you download our software. This is normal for new publishers and doesn&apos;t mean the software is unsafe.
                </p>
                <div className="space-y-2 text-sm text-zinc-400">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>macOS users:</strong> Our app is fully code-signed and notarized by Apple — no warnings!</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Windows users:</strong> We&apos;re working on verified code signing. Click &quot;More info&quot; → &quot;Run anyway&quot; to install safely.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Why this happens:</strong> New software needs time to build reputation with Microsoft SmartScreen. More downloads = fewer warnings over time.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your library?
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Download Renaym for free and experience the future of media organization.
          </p>
          <Link
            href="/download"
            className="group relative inline-flex items-center px-10 py-5 bg-white text-zinc-900 font-bold rounded-full hover:bg-zinc-100 transition text-lg"
          >
            Download Now — It&apos;s Free
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, description, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group p-6 rounded-2xl glass-card hover:bg-white/[0.06] transition-all duration-300">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="relative p-8 rounded-2xl glass-card text-center group hover:bg-white/[0.06] transition-all duration-300">
      <div className="text-6xl font-bold gradient-text opacity-30 mb-4">{number}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}

// Icon components
function AIIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function TMDBIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  );
}

function SubtitleIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  );
}

function CrossPlatformIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function SafeIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function OfflineIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function TrustCard({ icon, title, description, status }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'verified' | 'active';
}) {
  return (
    <div className="group p-6 rounded-2xl glass-card hover:bg-white/[0.06] transition-all duration-300 border border-white/5">
      <div className="flex items-start gap-4">
        <div className={`inline-flex p-3 rounded-xl ${status === 'verified' ? 'bg-gradient-to-br from-emerald-500 to-cyan-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'} flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Trust & Security Icons
function ShieldCheckIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function OpenSourceIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function NoVirusIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function UpdateIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

