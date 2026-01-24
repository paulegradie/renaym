// GitHub releases URL - update this to your actual repo
const RELEASES_BASE = "https://github.com/paulegradie/Renaime.App/releases";
const LATEST_RELEASE = `${RELEASES_BASE}/latest`;

export default function DownloadPage() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Download Renaime</h1>
          <p className="text-xl text-gray-600">Choose your platform and get started</p>
        </div>

        {/* Main download button - goes to releases page */}
        <div className="text-center mb-12">
          <a
            href={LATEST_RELEASE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition shadow-lg"
          >
            <span className="mr-2">⬇️</span>
            Download Latest Release
          </a>
          <p className="mt-3 text-gray-500 text-sm">
            Downloads available for Windows, macOS, and Linux
          </p>
        </div>

        {/* Platform cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Platforms</h2>

          <PlatformCard
            platform="Windows"
            icon="🪟"
            description="Windows 10 or later (64-bit)"
            filename="Renaime-Client-vX.X.X-win-x64.zip"
          />

          <PlatformCard
            platform="macOS (Intel)"
            icon="🍎"
            description="macOS 11 (Big Sur) or later - Intel Macs"
            filename="Renaime-Client-vX.X.X-osx-x64.tar.gz"
          />

          <PlatformCard
            platform="macOS (Apple Silicon)"
            icon="🍎"
            description="macOS 11 (Big Sur) or later - M1/M2/M3 Macs"
            filename="Renaime-Client-vX.X.X-osx-arm64.tar.gz"
          />

          <PlatformCard
            platform="Linux"
            icon="🐧"
            description="Ubuntu 20.04+ or equivalent (64-bit)"
            filename="Renaime-Client-vX.X.X-linux-x64.tar.gz"
          />
        </div>

        {/* Requirements */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">📋 Getting Started</h3>
          <ol className="space-y-2 text-gray-700 list-decimal list-inside">
            <li>Download and extract the archive for your platform</li>
            <li>Get a free TMDB API key from <a href="https://www.themoviedb.org/settings/api" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">themoviedb.org</a></li>
            <li>Run the Server, then run the Client</li>
            <li>Enter your TMDB API key in Settings</li>
            <li>Activate your license key (received via email after purchase)</li>
          </ol>
        </div>

        {/* All releases link */}
        <div className="mt-8 text-center">
          <a
            href={RELEASES_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View all releases and changelog on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

interface PlatformCardProps {
  platform: string;
  icon: string;
  description: string;
  filename: string;
}

function PlatformCard({ platform, icon, description, filename }: PlatformCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{platform}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
        {filename}
      </code>
    </div>
  );
}

