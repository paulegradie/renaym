import Link from 'next/link';

export default function DocsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-gray-300">
            Everything you need to get started with Renaime
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
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
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Getting Started */}
          <DocSection id="getting-started" icon="🚀" title="Getting Started">
            <p className="text-gray-600 text-lg mb-6">
              Renaime is an intelligent media file renamer that uses AI-powered parsing and TMDB metadata
              to help you organize your movie and TV show library.
            </p>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-gray-900 mb-3">📋 Prerequisites</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>TMDB API Key</strong> — Get one free at{' '}
                    <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      themoviedb.org
                    </a>
                    <span className="block text-sm text-gray-500 mt-1">
                      ⚠️ Use the <strong>API Key</strong> (v3 auth), not the &quot;API Read Access Token&quot;
                    </span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>.NET 8 Runtime</strong> — Included in standalone downloads</span>
                </li>
              </ul>
            </div>
          </DocSection>

          {/* Installation */}
          <DocSection id="installation" icon="📦" title="Installation">
            <div className="space-y-4">
              <StepCard number={1} title="Download">
                Download Renaime for your platform from the{' '}
                <Link href="/download" className="text-primary hover:underline font-medium">
                  download page
                </Link>
              </StepCard>
              <StepCard number={2} title="Extract">
                Extract the downloaded archive to your preferred location
              </StepCard>
              <StepCard number={3} title="Run">
                Launch the Server application first, then the Client
              </StepCard>
              <StepCard number={4} title="Configure">
                Enter your TMDB API key in Settings when prompted
              </StepCard>
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
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 flex items-center">
                <span className="mr-2">↩️</span>
                <span><strong>Pro tip:</strong> Use &quot;Undo Last&quot; if you need to revert any changes</span>
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
            <p className="text-gray-600 mb-6">
              Settings are managed through the Settings panel in the application. You can configure:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
              <div className="text-gray-400 mb-2">// Available settings</div>
              <div className="space-y-1 font-mono">
                <div><span className="text-purple-400">TMDB API Key</span> <span className="text-gray-500">— Required for metadata lookup</span></div>
                <div><span className="text-purple-400">LLM Model Path</span> <span className="text-gray-500">— Optional, for AI parsing</span></div>
                <div><span className="text-purple-400">Movie Template</span> <span className="text-gray-500">— e.g., &quot;&#123;Title&#125; (&#123;Year&#125;)&quot;</span></div>
                <div><span className="text-purple-400">TV Template</span> <span className="text-gray-500">— e.g., &quot;&#123;Title&#125; S&#123;Season&#125;E&#123;Episode&#125;&quot;</span></div>
                <div><span className="text-purple-400">Cache Settings</span> <span className="text-gray-500">— Configure caching behavior</span></div>
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
                question="LLM not working?"
                answer="Download the Phi-3-Mini model and configure the path in settings. The app will automatically fall back to regex parsing if LLM is unavailable."
              />
              <TroubleshootCard
                question="Server won't start?"
                answer="Ensure no other application is using the required port. Check that .NET 8 Runtime is installed if using the framework-dependent version."
              />
            </div>
          </DocSection>

          {/* Support CTA */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Need Help?</h3>
            <p className="text-indigo-100 mb-6">
              For issues and feature requests, visit our GitHub repository
            </p>
            <a
              href="https://github.com/paulegradie/Renaime.App/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              <span className="mr-2">🐙</span>
              Open GitHub Issues
            </a>
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
      className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition"
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
    <div id={id} className="scroll-mt-24">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{icon}</span>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
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
    <div className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-bold text-sm mr-4">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm">{children}</p>
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
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">Step {step}</span>
      </div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
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
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <span className="text-2xl">{icon}</span>
      <h4 className="font-semibold text-gray-900 mt-2 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

// Troubleshoot Card Component
function TroubleshootCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
        <span className="text-amber-500 mr-2">❓</span>
        {question}
      </h4>
      <p className="text-gray-600 text-sm pl-6">{answer}</p>
    </div>
  );
}

