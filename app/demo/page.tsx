import Link from 'next/link';
import Image from 'next/image';

export default function DemoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient grid-bg relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float" style={{ animationDelay: '-3s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-sm text-zinc-300 mb-8 border border-cyan-500/30 bg-cyan-500/5">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
            See Renaym in Action
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Watch the magic</span>
            <br />
            <span className="gradient-text">happen live</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            See how Renaym transforms messy filenames into perfectly organized media libraries in seconds
          </p>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Full Walkthrough
            </h2>
            <p className="text-xl text-zinc-400">
              Watch a complete demo from start to finish
            </p>
          </div>

          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden glass-card border-2 border-purple-500/30 shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
              {/* Placeholder - Replace with actual video */}
              <div className="text-center">
                <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mb-4">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-zinc-400 text-lg">Video demo coming soon</p>
                <p className="text-zinc-500 text-sm mt-2">Add your video file to /public/demo-video.mp4</p>
              </div>
              {/* Uncomment when you have a video:
              <video 
                controls 
                className="w-full h-full"
                poster="/demo-thumbnail.jpg"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="section-dark py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Feature Highlights
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Explore the powerful features that make Renaym the ultimate media organization tool
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Screenshot 1 - AI Parsing */}
            <ScreenshotCard
              title="AI-Powered Filename Parsing"
              description="Watch as our local LLM intelligently extracts metadata from even the messiest filenames"
              imagePath="/screenshots/ai-parsing.png"
              gradient="from-pink-500 to-rose-500"
            />

            {/* Screenshot 2 - TMDB Matching */}
            <ScreenshotCard
              title="Smart TMDB Matching"
              description="Automatic metadata matching with confidence scores and manual override options"
              imagePath="/screenshots/tmdb-matching.png"
              gradient="from-purple-500 to-violet-500"
            />

            {/* Screenshot 3 - Batch Operations */}
            <ScreenshotCard
              title="Batch Rename Operations"
              description="Process hundreds of files at once with preview and undo capabilities"
              imagePath="/screenshots/batch-rename.png"
              gradient="from-cyan-500 to-blue-500"
            />

            {/* Screenshot 4 - Subtitle Support */}
            <ScreenshotCard
              title="Automatic Subtitle Pairing"
              description="Intelligent subtitle detection and renaming across 5 different formats"
              imagePath="/screenshots/subtitle-support.png"
              gradient="from-emerald-500 to-green-500"
            />
          </div>
        </div>
      </section>

      {/* Before & After Comparison */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Before & After
            </h2>
            <p className="text-xl text-zinc-400">
              See the transformation from chaos to perfection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="p-8 rounded-2xl glass-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Before</h3>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="p-3 bg-zinc-900 rounded text-zinc-400 break-all">
                  The.Mandalorian.S01E01.1080p.WEB-DL.x264-MIXED[rarbg].mkv
                </div>
                <div className="p-3 bg-zinc-900 rounded text-zinc-400 break-all">
                  breaking.bad.s05e16.720p.bluray.x264-demand.mkv
                </div>
                <div className="p-3 bg-zinc-900 rounded text-zinc-400 break-all">
                  inception_2010_1080p_bluray_x264_yify.mp4
                </div>
                <div className="p-3 bg-zinc-900 rounded text-zinc-400 break-all">
                  Game.of.Thrones.S08E06.PROPER.720p.WEB.H264-MEMENTO[ettv].mkv
                </div>
              </div>
            </div>

            {/* After */}
            <div className="p-8 rounded-2xl glass-card border-2 border-green-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">After</h3>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="p-3 bg-zinc-900 rounded text-green-400 break-all">
                  The Mandalorian (2019) - S01E01 - Chapter 1.mkv
                </div>
                <div className="p-3 bg-zinc-900 rounded text-green-400 break-all">
                  Breaking Bad (2008) - S05E16 - Felina.mkv
                </div>
                <div className="p-3 bg-zinc-900 rounded text-green-400 break-all">
                  Inception (2010).mp4
                </div>
                <div className="p-3 bg-zinc-900 rounded text-green-400 break-all">
                  Game of Thrones (2011) - S08E06 - The Iron Throne.mkv
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features with Icons */}
      <section className="section-dark py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Developers Love Renaym
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Built with modern tech and designed for power users
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureHighlight
              icon="⚡"
              title="Lightning Fast"
              description="Local LLM processing means no API delays. Rename hundreds of files in seconds."
            />
            <FeatureHighlight
              icon="🔒"
              title="Privacy First"
              description="Everything runs locally. Your filenames never leave your machine."
            />
            <FeatureHighlight
              icon="🎯"
              title="Smart Matching"
              description="Intelligent TMDB matching with confidence scores and manual override."
            />
            <FeatureHighlight
              icon="↩️"
              title="Undo Support"
              description="Made a mistake? Full undo capability with backup tracking."
            />
            <FeatureHighlight
              icon="🌐"
              title="Cross-Platform"
              description="Works seamlessly on Windows, macOS, and Linux."
            />
            <FeatureHighlight
              icon="🎬"
              title="Subtitle Smart"
              description="Automatically pairs and renames subtitles in 5 different formats."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to try it yourself?
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Download Renaym for free and transform your media library today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/download"
              className="group relative px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold rounded-full hover:opacity-90 transition-all duration-300 text-lg"
            >
              <span className="relative z-10">Download Now — It&apos;s Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            </Link>
            <Link
              href="/docs"
              className="px-10 py-5 glass-card text-white font-bold rounded-full hover:bg-white/10 transition text-lg"
            >
              Read the Docs →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Screenshot Card Component
function ScreenshotCard({ title, description, imagePath, gradient }: {
  title: string;
  description: string;
  imagePath: string;
  gradient: string;
}) {
  return (
    <div className="group rounded-2xl glass-card overflow-hidden hover:bg-white/[0.06] transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-hidden">
        {/* Placeholder - Replace with actual screenshots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`p-6 rounded-full bg-gradient-to-br ${gradient}`}>
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        {/* Uncomment when you have screenshots:
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        */}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

// Feature Highlight Component
function FeatureHighlight({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl glass-card hover:bg-white/[0.06] transition-all duration-300 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
}


