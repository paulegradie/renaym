import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Rename Your Media Files<br />
            <span className="text-purple-300">Intelligently</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            AI-powered filename parsing meets TMDB metadata. Organize your movie and TV show library effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/download" 
              className="px-8 py-4 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Download Free
            </Link>
            <Link 
              href="/docs" 
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              Get Started
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">Windows • macOS • Linux</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to organize your media library</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              emoji="🤖"
              title="AI-Powered Parsing"
              description="Local LLM intelligently extracts metadata from even the messiest filenames."
            />
            <FeatureCard 
              emoji="🎬"
              title="TMDB Integration"
              description="Accurate metadata matching with intelligent scoring from The Movie Database."
            />
            <FeatureCard 
              emoji="📝"
              title="Subtitle Support"
              description="Automatic pairing and renaming of 5 subtitle formats."
            />
            <FeatureCard 
              emoji="🖥️"
              title="Cross-Platform"
              description="Works on Windows, macOS, and Linux."
            />
            <FeatureCard 
              emoji="🛡️"
              title="Safe Operations"
              description="Collision detection, undo support, and backup tracking."
            />
            <FeatureCard 
              emoji="⚡"
              title="Fast & Offline"
              description="LLM runs locally - no cloud API required."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Organize Your Library?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Download Renaime for free and start renaming your media files today.
          </p>
          <Link 
            href="/download" 
            className="inline-block px-8 py-4 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Download Now
          </Link>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

