import Link from 'next/link';

export default function DocsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-zinc-400">
            Everything you need to get started with Renaym
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 bg-zinc-900/50 backdrop-blur-sm border-b border-white/5 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <NavPill href="#getting-started" label="Getting Started" />
            <NavPill href="#installation" label="Installation" />
            <NavPill href="#usage" label="Usage" />
            <NavPill href="#features" label="Features" />
            <NavPill href="#configuration" label="Configuration" />
            <NavPill href="#troubleshooting" label="Troubleshooting" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Getting Started */}
          <DocSection id="getting-started" icon="🚀" title="Getting Started">
            <p className="text-zinc-400 text-lg mb-6">
              Renaym is a single-file desktop app that intelligently renames your movie and TV show files
              using AI-powered parsing and TMDB metadata. Download, run, and you&apos;re ready to go.
            </p>
            <div className="glass-card p-6 rounded-xl">
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <span className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
                Before You Start
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3 mt-0.5">✓</span>
                  <span className="text-zinc-300"><strong className="text-white">Get a free TMDB API Key</strong> — Sign up at{' '}
                    <a href="https://www.themoviedb.org/signup" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      themoviedb.org
                    </a>
                    {' '}(takes 2 minutes)
                    <span className="block text-sm text-zinc-500 mt-1">
                      ⚠️ Use the <strong>API Key</strong> (v3 auth), not the &quot;API Read Access Token&quot;
                    </span>
                  </span>
                </li>
              </ul>
              <p className="text-zinc-500 text-sm mt-4">
                💡 The Setup Wizard will prompt you for this key on first launch.
              </p>
            </div>
          </DocSection>

          {/* Installation */}
          <DocSection id="installation" icon="📦" title="Installation">
            <div className="space-y-4">
              <StepCard number={1} title="Download">
                Download Renaym for your platform from the{' '}
                <Link href="/download" className="text-primary hover:underline font-medium">
                  download page
                </Link>
                {' '}— choose the Installer (recommended) or Portable version
              </StepCard>
              <StepCard number={2} title="Install or Extract">
                Run the installer, or extract the portable zip to any folder
              </StepCard>
              <StepCard number={3} title="Run">
                Launch Renaym — the Setup Wizard will guide you through first-time configuration
              </StepCard>
            </div>

            <div className="mt-6 glass-card p-6 rounded-xl">
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <span className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                Setup Wizard (First Run)
              </h4>
              <p className="text-zinc-400 mb-4">
                On first launch, the Setup Wizard will walk you through:
              </p>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 text-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span className="text-zinc-300"><strong className="text-white">Download AI Model</strong> — One-time download (~2.3 GB) for intelligent filename parsing</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 text-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span className="text-zinc-300"><strong className="text-white">Enter TMDB API Key</strong> — Required for movie/TV metadata lookups</span>
                </li>
              </ol>
              <p className="text-zinc-500 text-sm mt-4">
                That&apos;s it! Once setup is complete, you&apos;re ready to start renaming files.
              </p>
            </div>
          </DocSection>

          {/* Basic Usage */}
          <DocSection id="usage" icon="🎯" title="Basic Usage">
            <div className="grid gap-4 md:grid-cols-2">
              <UsageCard
                step="1"
                icon="📁"
                title="Select Folder"
                description="Click 'Select Folder' or drag & drop files into the application"
              />
              <UsageCard
                step="2"
                icon="🔍"
                title="Scan & Match"
                description="Click 'Scan & Match' to automatically match files with TMDB"
              />
              <UsageCard
                step="3"
                icon="👁️"
                title="Review"
                description="Check the proposed renames and adjust if needed"
              />
              <UsageCard
                step="4"
                icon="✏️"
                title="Execute"
                description="Click 'Execute Rename' to rename your files"
              />
            </div>
            <div className="mt-4 p-4 glass-card rounded-xl border-amber-500/20">
              <p className="text-amber-300 flex items-center">
                <span className="mr-2">↩️</span>
                <span><strong className="text-amber-200">Pro tip:</strong> Use &quot;Undo Last&quot; if you need to revert any changes</span>
              </p>
            </div>
          </DocSection>

          {/* Features */}
          <DocSection id="features" icon="⭐" title="Features">
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon="🤖"
                title="AI-Powered Parsing"
                description="Local LLM intelligently extracts metadata from even the messiest filenames"
              />
              <FeatureCard
                icon="🎬"
                title="TMDB Integration"
                description="Accurate metadata matching with intelligent scoring from The Movie Database"
              />
              <FeatureCard
                icon="📝"
                title="Subtitle Support"
                description="Automatically pairs and renames .srt, .sub, .ass, .ssa, .vtt files"
              />
              <FeatureCard
                icon="🛡️"
                title="Safe Operations"
                description="Collision detection prevents overwrites, with full undo support"
              />
              <FeatureCard
                icon="🎨"
                title="Custom Templates"
                description="Customize naming patterns to match your preferred organization style"
              />
              <FeatureCard
                icon="💾"
                title="Smart Caching"
                description="Caches TMDB responses for faster subsequent operations"
              />
            </div>
          </DocSection>

          {/* Configuration */}
          <DocSection id="configuration" icon="⚙️" title="Configuration">
            <p className="text-zinc-400 mb-6">
              Settings are managed through the Settings panel in the application. You can configure:
            </p>
            <div className="glass-card rounded-xl p-6 text-sm overflow-x-auto">
              <div className="text-zinc-500 mb-3">// Available settings</div>
              <div className="space-y-2 font-mono">
                <div><span className="text-purple-400">TMDB API Key</span> <span className="text-zinc-500">— Required for metadata lookup</span></div>
                <div><span className="text-purple-400">LLM Model Path</span> <span className="text-zinc-500">— Optional, for AI parsing</span></div>
                <div><span className="text-purple-400">Movie Template</span> <span className="text-zinc-500">— e.g., &quot;&#123;Title&#125; (&#123;Year&#125;)&quot;</span></div>
                <div><span className="text-purple-400">TV Template</span> <span className="text-zinc-500">— e.g., &quot;&#123;Title&#125; S&#123;Season&#125;E&#123;Episode&#125;&quot;</span></div>
                <div><span className="text-purple-400">Cache Settings</span> <span className="text-zinc-500">— Configure caching behavior</span></div>
              </div>
            </div>
          </DocSection>

          {/* Troubleshooting */}
          <DocSection id="troubleshooting" icon="🔧" title="Troubleshooting">
            <div className="space-y-4">
              <TroubleshootCard
                question="No matches found?"
                answer="Try adjusting the filename to be clearer, or search manually in TMDB. Sometimes files with unusual naming conventions need manual intervention."
              />
              <TroubleshootCard
                question="AI parsing not working?"
                answer="Make sure you completed the AI model download during setup. If skipped, the app will use regex-based parsing instead. You can re-run the setup from Settings."
              />
              <TroubleshootCard
                question="TMDB lookups failing?"
                answer="Verify your TMDB API key is correct in Settings. Make sure you're using the API Key (v3 auth), not the 'API Read Access Token'."
              />
              <TroubleshootCard
                question="App won't start?"
                answer="Try extracting to a different folder. On Windows, avoid protected folders like Program Files unless using the installer."
              />
            </div>
          </DocSection>

          {/* Support CTA */}
          <div className="relative overflow-hidden rounded-2xl p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20" />
            <div className="absolute inset-0 glass-card" />
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-3">Need Help?</h3>
              <p className="text-zinc-400 mb-6">
                For issues and feature requests, visit our GitHub repository
              </p>
              <a
                href="https://github.com/paulegradie/renaym/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-zinc-900 font-semibold rounded-full hover:bg-zinc-100 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                Open GitHub Issues
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

// Navigation Pill Component
function NavPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="px-4 py-2 text-sm font-medium text-zinc-400 bg-zinc-800/50 rounded-full hover:bg-primary hover:text-white transition"
    >
      {label}
    </a>
  );
}

// Documentation Section Component
function DocSection({ id, icon, title, children }: {
  id: string;
  icon: string;
  title: string;
  children: React.ReactNode
}) {
  return (
    <div id={id} className="scroll-mt-32">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{icon}</span>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// Step Card Component
function StepCard({ number, title, children }: {
  number: number;
  title: string;
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start p-4 glass-card rounded-xl">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-full font-bold text-sm mr-4">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-zinc-400 text-sm">{children}</p>
      </div>
    </div>
  );
}

// Usage Card Component
function UsageCard({ step, icon, title, description }: {
  step: string;
  icon: string;
  title: string;
  description: string
}) {
  return (
    <div className="p-4 glass-card rounded-xl hover:bg-white/[0.06] transition">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <span className="text-xs font-medium text-primary bg-primary/20 px-2 py-0.5 rounded">Step {step}</span>
      </div>
      <h4 className="font-semibold text-white mb-1">{title}</h4>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }: {
  icon: string;
  title: string;
  description: string
}) {
  return (
    <div className="p-4 glass-card rounded-xl">
      <span className="text-2xl">{icon}</span>
      <h4 className="font-semibold text-white mt-2 mb-1">{title}</h4>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
}

// Troubleshoot Card Component
function TroubleshootCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-4 glass-card rounded-xl">
      <h4 className="font-semibold text-white mb-2 flex items-center">
        <span className="text-amber-400 mr-2">❓</span>
        {question}
      </h4>
      <p className="text-zinc-400 text-sm pl-6">{answer}</p>
    </div>
  );
}

