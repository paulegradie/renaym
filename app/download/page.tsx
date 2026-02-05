'use client';

import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/lib/config';

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

type DetectedOS = 'windows' | 'macos' | 'linux' | 'unknown';

// Helper to check if response has error
const hasError = (item: DownloadInfo | { error: string }): item is { error: string } => {
  return 'error' in item && typeof item.error === 'string' && !('download_url' in item);
};

// Detect the user's operating system
const detectOS = (): DetectedOS => {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || '';

  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }
  if (platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os')) {
    return 'macos';
  }
  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'linux';
  }
  return 'unknown';
};

// Map platform keys to their OS category
const getPlatformOS = (key: PlatformDownload['platformKey']): DetectedOS => {
  if (key === 'windows' || key === 'windows-installer') return 'windows';
  if (key === 'macos-intel' || key === 'macos-arm') return 'macos';
  if (key === 'linux') return 'linux';
  return 'unknown';
};

// Get the appropriate icon for a platform
const getIconForPlatform = (key: PlatformDownload['platformKey']): React.ReactNode => {
  if (key === 'windows' || key === 'windows-installer') return <WindowsIcon />;
  if (key === 'macos-intel' || key === 'macos-arm') return <AppleIcon />;
  return <LinuxIcon />;
};

// Get OS display name
const getOSDisplayName = (os: DetectedOS): string => {
  switch (os) {
    case 'windows': return 'Windows';
    case 'macos': return 'macOS';
    case 'linux': return 'Linux';
    default: return 'your system';
  }
};

// All platform definitions
const allPlatforms: Omit<PlatformDownload, 'icon'>[] = [
  { platform: "Windows (Installer)", description: "Windows 10 or later (64-bit) — Recommended", platformKey: "windows-installer", downloadUrl: null, recommended: true },
  { platform: "Windows (Portable)", description: "Windows 10 or later (64-bit) — No installation required", platformKey: "windows", downloadUrl: null, secondary: true },
  { platform: "macOS (Intel)", description: "macOS 11 (Big Sur) or later — Intel Macs", platformKey: "macos-intel", downloadUrl: null },
  { platform: "macOS (Apple Silicon)", description: "macOS 11 (Big Sur) or later — M1/M2/M3/M4 Macs", platformKey: "macos-arm", downloadUrl: null },
  { platform: "Linux", description: "Ubuntu 20.04+ or equivalent (64-bit)", platformKey: "linux", downloadUrl: null },
];

export default function DownloadPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [detectedOS, setDetectedOS] = useState<DetectedOS>('unknown');
  const [platforms, setPlatforms] = useState<PlatformDownload[]>(
    allPlatforms.map(p => ({
      ...p,
      icon: getIconForPlatform(p.platformKey),
    }))
  );

  useEffect(() => {
    // Detect OS on client side
    setDetectedOS(detectOS());

    const fetchFromLambda = async (): Promise<boolean> => {
      try {
        const response = await fetch(API_ENDPOINTS.downloads);
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

  // Split platforms into detected OS and others
  const detectedPlatforms = platforms.filter(p => getPlatformOS(p.platformKey) === detectedOS);
  const otherPlatforms = platforms.filter(p => getPlatformOS(p.platformKey) !== detectedOS);

  // Get subtitle based on detected OS
  const getSubtitle = () => {
    if (detectedOS === 'unknown') {
      return "Choose your platform and get started in seconds";
    }
    return `We detected you're on ${getOSDisplayName(detectedOS)}. Here's the perfect download for you.`;
  };

  return (
    <section className="min-h-screen py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Download Renaym</h1>
          <p className="text-xl text-zinc-400">{getSubtitle()}</p>
          {version && (
            <p className="mt-4 inline-flex items-center px-4 py-2 rounded-full glass-card text-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              <span className="text-zinc-300">Latest Version: <span className="text-white font-semibold">v{version}</span></span>
            </p>
          )}
        </div>

        {/* Security & Trust Notice */}
        <div className="mb-8 p-5 glass-card rounded-xl border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-amber-500/20 rounded-lg flex-shrink-0">
              <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-amber-300 mb-2 text-base">Security Warnings Expected — Here&apos;s Why</h4>
              <p className="text-sm text-zinc-400 mb-3">
                Renaym is independent, free software. We&apos;re working toward official code signing, but for now you may see security warnings. <strong className="text-zinc-300">This is completely safe</strong> — we just want to help you organize your media files!
              </p>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="text-zinc-300">Windows:</strong> SmartScreen warning — Click &quot;More info&quot; → &quot;Run anyway&quot;</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="text-zinc-300">macOS:</strong> Gatekeeper warning — Right-click → &quot;Open&quot;, or allow in System Settings → Privacy &amp; Security</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="text-zinc-300">Privacy:</strong> AI runs 100% locally. No data sent to cloud. No tracking. Open development on GitHub.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 glass-card border-red-500/30 rounded-xl text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Detected OS Downloads - Featured Section */}
        {detectedOS !== 'unknown' && detectedPlatforms.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                ✨ Recommended for you
              </span>
            </div>
            <div className="space-y-3">
              {detectedPlatforms.map((platform) => (
                <div key={platform.platformKey}>
                  <PlatformCard
                    platform={platform.platform}
                    icon={platform.icon}
                    description={platform.description}
                    downloadUrl={platform.downloadUrl}
                    loading={loading}
                    version={version}
                    recommended={!platform.secondary}
                    secondary={platform.secondary}
                    featured
                  />
                  {/* Windows security note */}
                  {(platform.platformKey === 'windows' || platform.platformKey === 'windows-installer') && (
                    <div className="mt-3 ml-8 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                      <p className="text-xs text-amber-300/90 flex items-start gap-2">
                        <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          <strong className="text-amber-300">Windows SmartScreen warning expected.</strong> As a new publisher, Windows will show a security warning.
                          Click &quot;More info&quot; → &quot;Run anyway&quot; to install. This is safe — we&apos;re working on verified code signing.
                        </span>
                      </p>
                    </div>
                  )}
                  {/* macOS security note */}
                  {(platform.platformKey === 'macos-intel' || platform.platformKey === 'macos-arm') && (
                    <div className="mt-3 ml-8 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                      <p className="text-xs text-amber-300/90 flex items-start gap-2">
                        <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          <strong className="text-amber-300">macOS Gatekeeper warning expected.</strong> Right-click the app → &quot;Open&quot;, or allow in System Settings → Privacy &amp; Security. This is safe — we&apos;re working on Apple certification.
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Platforms Section */}
        <div className="space-y-4">
          <details className={detectedOS !== 'unknown' ? "group" : ""} open={detectedOS === 'unknown'}>
            <summary className={`flex items-center justify-between cursor-pointer list-none ${detectedOS !== 'unknown' ? 'mb-4' : 'mb-6'}`}>
              <h2 className="text-lg font-semibold text-zinc-400 flex items-center gap-2">
                {detectedOS !== 'unknown' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Other Platforms
                  </>
                ) : (
                  'Available Platforms'
                )}
              </h2>
              {detectedOS !== 'unknown' && (
                <span className="text-zinc-500 text-sm flex items-center gap-1 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              )}
            </summary>

            {detectedOS !== 'unknown' && (
              <p className="text-sm text-zinc-500 mb-4">
                Not on {getOSDisplayName(detectedOS)}? Grab Renaym for your other devices.
              </p>
            )}

            <div className="space-y-3">
              {(detectedOS === 'unknown' ? platforms : otherPlatforms).map((platform) => (
                <div key={platform.platformKey}>
                  <PlatformCard
                    platform={platform.platform}
                    icon={platform.icon}
                    description={platform.description}
                    downloadUrl={platform.downloadUrl}
                    loading={loading}
                    version={version}
                    recommended={detectedOS === 'unknown' && platform.recommended}
                    secondary={platform.secondary}
                  />
                  {/* Windows security note for fallback */}
                  {detectedOS === 'unknown' && platform.platformKey === 'windows' && (
                    <p className="text-xs text-zinc-500 mt-2 ml-8 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-amber-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Windows may show a security warning — we&apos;re working on verified publishing. Safe to proceed.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </details>
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
              Run the Renaym application
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

          {/* Link to detailed installation guide */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <a
              href="/docs/install"
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-purple-500/20 hover:border-purple-500/40 transition group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <h4 className="font-medium text-white">Need detailed instructions?</h4>
                  <p className="text-sm text-zinc-400">View our platform-specific installation guide</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
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
  featured?: boolean;
}

function PlatformCard({ platform, icon, description, downloadUrl, loading, version, recommended, secondary, featured }: PlatformCardProps) {
  const getCardClasses = () => {
    if (secondary) {
      return "flex items-center justify-between p-4 glass-card rounded-xl hover:bg-white/[0.06] transition group ml-8 border-l-2 border-zinc-700";
    }
    if (featured && recommended) {
      return "flex items-center justify-between p-6 glass-card rounded-xl hover:bg-white/[0.06] transition group ring-2 ring-emerald-500/40 bg-emerald-500/5";
    }
    if (recommended) {
      return "flex items-center justify-between p-5 glass-card rounded-xl hover:bg-white/[0.06] transition group ring-1 ring-purple-500/30";
    }
    return "flex items-center justify-between p-5 glass-card rounded-xl hover:bg-white/[0.06] transition group";
  };

  const getButtonClasses = () => {
    if (secondary) {
      return "px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-full transition text-sm font-medium";
    }
    if (featured && recommended) {
      return "px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full hover:opacity-90 transition font-medium shadow-lg shadow-emerald-500/25";
    }
    return "px-5 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white rounded-full hover:opacity-90 transition text-sm font-medium";
  };

  return (
    <div className={getCardClasses()}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl text-zinc-300 group-hover:text-white transition ${featured && recommended ? 'bg-emerald-500/20' : secondary ? 'bg-zinc-800/50' : 'bg-zinc-800'
          }`}>
          {icon}
        </div>
        <div>
          <h3 className={`font-semibold text-white flex items-center gap-2 ${featured && recommended ? 'text-xl' : secondary ? 'text-base' : 'text-lg'
            }`}>
            {platform}
            {featured && recommended && (
              <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">Best Match</span>
            )}
            {!featured && recommended && (
              <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full">Recommended</span>
            )}
          </h3>
          <p className={`text-zinc-500 ${featured && recommended ? 'text-base mt-1' : 'text-sm'}`}>{description}</p>
        </div>
      </div>
      {loading ? (
        <span className="px-5 py-2.5 bg-zinc-800 text-zinc-500 rounded-full text-sm">Loading...</span>
      ) : downloadUrl ? (
        <a
          href={downloadUrl}
          className={getButtonClasses()}
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

