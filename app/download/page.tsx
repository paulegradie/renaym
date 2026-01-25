'use client';

import { useState, useEffect } from 'react';

// Lambda API endpoint for S3 downloads
const DOWNLOADS_API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/downloads`
  : "https://your-api-gateway.amazonaws.com/api/downloads";

interface DownloadInfo {
  filename: string;
  version: string;
  download_url: string;
  error?: string;
}

interface LambdaResponse {
  version?: string;
  client: {
    windows: DownloadInfo | { error: string };
    'windows-installer': DownloadInfo | { error: string };
    linux: DownloadInfo | { error: string };
    'macos-intel': DownloadInfo | { error: string };
    'macos-arm': DownloadInfo | { error: string };
  };
}

interface PlatformDownload {
  platform: string;
  icon: React.ReactNode;
  description: string;
  platformKey: 'windows' | 'windows-installer' | 'linux' | 'macos-intel' | 'macos-arm';
  downloadUrl: string | null;
  recommended?: boolean;
  secondary?: boolean;
}

// Helper to check if response has error
const hasError = (item: DownloadInfo | { error: string }): item is { error: string } => {
  return 'error' in item && typeof item.error === 'string' && !('download_url' in item);
};

export default function DownloadPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<PlatformDownload[]>([
    { platform: "Windows (Installer)", icon: <WindowsIcon />, description: "Windows 10 or later (64-bit) — Recommended", platformKey: "windows-installer", downloadUrl: null, recommended: true },
    { platform: "Windows (Portable)", icon: <WindowsIcon />, description: "Windows 10 or later (64-bit) — No installation required", platformKey: "windows", downloadUrl: null, secondary: true },
    { platform: "macOS (Intel)", icon: <AppleIcon />, description: "macOS 11 (Big Sur) or later - Intel Macs", platformKey: "macos-intel", downloadUrl: null },
    { platform: "macOS (Apple Silicon)", icon: <AppleIcon />, description: "macOS 11 (Big Sur) or later - M1/M2/M3 Macs", platformKey: "macos-arm", downloadUrl: null },
    { platform: "Linux", icon: <LinuxIcon />, description: "Ubuntu 20.04+ or equivalent (64-bit)", platformKey: "linux", downloadUrl: null },
  ]);

  useEffect(() => {
    const fetchFromLambda = async (): Promise<boolean> => {
      try {
        const response = await fetch(DOWNLOADS_API_URL);
        if (!response.ok) {
          return false;
        }
        const data: LambdaResponse = await response.json();

        if (data.version) {
          setVersion(data.version);
        }

        setPlatforms(prev => [
          { ...prev[0], downloadUrl: hasError(data.client['windows-installer']) ? null : data.client['windows-installer'].download_url },
          { ...prev[1], downloadUrl: hasError(data.client.windows) ? null : data.client.windows.download_url },
          { ...prev[2], downloadUrl: hasError(data.client['macos-intel']) ? null : data.client['macos-intel'].download_url },
          { ...prev[3], downloadUrl: hasError(data.client['macos-arm']) ? null : data.client['macos-arm'].download_url },
          { ...prev[4], downloadUrl: hasError(data.client.linux) ? null : data.client.linux.download_url },
        ]);
        return true;
      } catch {
        return false;
      }
    };

    const fetchDownloads = async () => {
      const success = await fetchFromLambda();
      if (!success) {
        setError('Failed to fetch download information. Please try again later.');
      }
      setLoading(false);
    };

    fetchDownloads();
  }, []);

  return (
    <section className="min-h-screen py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Download renaym</h1>
          <p className="text-xl text-zinc-400">Choose your platform and get started in seconds</p>
          {version && (
            <p className="mt-4 inline-flex items-center px-4 py-2 rounded-full glass-card text-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              <span className="text-zinc-300">Latest Version: <span className="text-white font-semibold">v{version}</span></span>
            </p>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 glass-card border-red-500/30 rounded-xl text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Platform cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-400 mb-4">Available Platforms</h2>

          {platforms.map((platform) => (
            <PlatformCard
              key={platform.platformKey}
              platform={platform.platform}
              icon={platform.icon}
              description={platform.description}
              downloadUrl={platform.downloadUrl}
              loading={loading}
              version={version}
              recommended={platform.recommended}
              secondary={platform.secondary}
            />
          ))}
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 glass-card rounded-xl border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-amber-500/20 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-amber-300 mb-1">A note about security warnings</h4>
              <p className="text-zinc-400 text-sm">
                Renaym is a new product and we haven&apos;t yet set up publisher verification with Microsoft and Apple.
                You may see warnings from your browser or operating system when downloading or installing.
                This is normal for new software — you can safely proceed with the download.
              </p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-8 p-6 glass-card rounded-2xl">
          <h3 className="font-semibold text-white mb-4 flex items-center">
            <span className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg mr-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            Getting Started
          </h3>
          <ol className="space-y-3 text-zinc-400">
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 text-sm flex items-center justify-center mr-3 mt-0.5">1</span>
              Download and extract the archive for your platform
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 text-sm flex items-center justify-center mr-3 mt-0.5">2</span>
              Run the renaym application
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 text-sm flex items-center justify-center mr-3 mt-0.5">3</span>
              Complete the setup wizard (downloads AI model, configures TMDB API key)
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 text-sm flex items-center justify-center mr-3 mt-0.5">4</span>
              Activate your license key (received via email after purchase)
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

interface PlatformCardProps {
  platform: string;
  icon: React.ReactNode;
  description: string;
  downloadUrl: string | null;
  loading: boolean;
  version: string | null;
  recommended?: boolean;
  secondary?: boolean;
}

function PlatformCard({ platform, icon, description, downloadUrl, loading, version, recommended, secondary }: PlatformCardProps) {
  const cardClasses = secondary
    ? "flex items-center justify-between p-4 glass-card rounded-xl hover:bg-white/[0.06] transition group ml-8 border-l-2 border-zinc-700"
    : recommended
      ? "flex items-center justify-between p-5 glass-card rounded-xl hover:bg-white/[0.06] transition group ring-1 ring-purple-500/30"
      : "flex items-center justify-between p-5 glass-card rounded-xl hover:bg-white/[0.06] transition group";

  const buttonClasses = secondary
    ? "px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-full transition text-sm font-medium"
    : "px-5 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white rounded-full hover:opacity-90 transition text-sm font-medium";

  return (
    <div className={cardClasses}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl text-zinc-300 group-hover:text-white transition ${secondary ? 'bg-zinc-800/50' : 'bg-zinc-800'}`}>
          {icon}
        </div>
        <div>
          <h3 className={`font-semibold text-white flex items-center gap-2 ${secondary ? 'text-base' : 'text-lg'}`}>
            {platform}
            {recommended && (
              <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full">Recommended</span>
            )}
          </h3>
          <p className="text-zinc-500 text-sm">{description}</p>
        </div>
      </div>
      {loading ? (
        <span className="px-5 py-2.5 bg-zinc-800 text-zinc-500 rounded-full text-sm">Loading...</span>
      ) : downloadUrl ? (
        <a
          href={downloadUrl}
          className={buttonClasses}
        >
          Download {version ? `v${version}` : ''}
        </a>
      ) : (
        <span className="px-5 py-2.5 bg-zinc-800 text-zinc-500 rounded-full text-sm">Coming soon</span>
      )}
    </div>
  );
}

// Platform icons
function WindowsIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function LinuxIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.504 0c-.155 0-.311.003-.467.008a11.18 11.18 0 0 0-2.907.543A10.88 10.88 0 0 0 4.48 4.48a10.88 10.88 0 0 0-3.929 4.65 11.18 11.18 0 0 0-.543 2.907A10.95 10.95 0 0 0 0 12.504c0 .155.003.311.008.467.068 1.001.245 1.976.543 2.907a10.88 10.88 0 0 0 3.929 4.65 10.88 10.88 0 0 0 4.65 3.929c.931.298 1.906.475 2.907.543.156.005.312.008.467.008s.311-.003.467-.008a11.18 11.18 0 0 0 2.907-.543 10.88 10.88 0 0 0 4.65-3.929 10.88 10.88 0 0 0 3.929-4.65c.298-.931.475-1.906.543-2.907.005-.156.008-.312.008-.467s-.003-.311-.008-.467a11.18 11.18 0 0 0-.543-2.907 10.88 10.88 0 0 0-3.929-4.65 10.88 10.88 0 0 0-4.65-3.929 11.18 11.18 0 0 0-2.907-.543A10.95 10.95 0 0 0 12.504 0z" />
    </svg>
  );
}

