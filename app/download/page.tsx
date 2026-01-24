'use client';

import { useState, useEffect } from 'react';

const RELEASES_BASE = "https://github.com/paulegradie/Renaime.App/releases";
const GITHUB_API_URL = "https://api.github.com/repos/paulegradie/Renaime.App/releases/latest";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface ReleaseData {
  tag_name: string;
  assets: ReleaseAsset[];
}

interface PlatformDownload {
  platform: string;
  icon: string;
  description: string;
  runtime: string;
  downloadUrl: string | null;
}

// Extract version from tag (e.g., "v1.0.45" -> "1.0.45")
const extractVersion = (tagName: string): string => {
  return tagName.replace(/^v/, '');
};

// Find asset URL by runtime pattern
const findAssetUrl = (assets: ReleaseAsset[], pattern: string): string | null => {
  const asset = assets.find(a => a.name.includes(pattern));
  return asset?.browser_download_url || null;
};

// Default platform definitions
const DEFAULT_PLATFORMS: PlatformDownload[] = [
  {
    platform: "Windows",
    icon: "🪟",
    description: "Windows 10 or later (64-bit)",
    runtime: "win-x64",
    downloadUrl: null,
  },
  {
    platform: "macOS (Intel)",
    icon: "🍎",
    description: "macOS 11 (Big Sur) or later - Intel Macs",
    runtime: "osx-x64",
    downloadUrl: null,
  },
  {
    platform: "macOS (Apple Silicon)",
    icon: "🍎",
    description: "macOS 11 (Big Sur) or later - M1/M2/M3 Macs",
    runtime: "osx-arm64",
    downloadUrl: null,
  },
  {
    platform: "Linux",
    icon: "🐧",
    description: "Ubuntu 20.04+ or equivalent (64-bit)",
    runtime: "linux-x64",
    downloadUrl: null,
  },
];

export default function DownloadPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<PlatformDownload[]>(DEFAULT_PLATFORMS);

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch release information');
        }
        const data: ReleaseData = await response.json();

        const ver = extractVersion(data.tag_name);
        setVersion(ver);

        // Map platforms to their download URLs from the release assets
        setPlatforms([
          {
            ...DEFAULT_PLATFORMS[0],
            downloadUrl: data.assets.find(a => a.name.includes('Client') && a.name.includes('win-x64'))?.browser_download_url || null,
          },
          {
            ...DEFAULT_PLATFORMS[1],
            downloadUrl: data.assets.find(a => a.name.includes('Client') && a.name.includes('osx-x64') && !a.name.includes('arm64'))?.browser_download_url || null,
          },
          {
            ...DEFAULT_PLATFORMS[2],
            downloadUrl: data.assets.find(a => a.name.includes('Client') && a.name.includes('osx-arm64'))?.browser_download_url || null,
          },
          {
            ...DEFAULT_PLATFORMS[3],
            downloadUrl: data.assets.find(a => a.name.includes('Client') && a.name.includes('linux-x64'))?.browser_download_url || null,
          },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRelease();
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Download Renaime</h1>
          <p className="text-xl text-gray-600">Choose your platform and get started</p>
          {version && (
            <p className="mt-2 text-lg text-primary font-semibold">Latest Version: v{version}</p>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}. <a href={`${RELEASES_BASE}/latest`} className="underline" target="_blank" rel="noopener noreferrer">View releases on GitHub</a>
          </div>
        )}

        {/* Platform cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Platforms</h2>

          {platforms.map((platform) => (
            <PlatformCard
              key={platform.runtime}
              platform={platform.platform}
              icon={platform.icon}
              description={platform.description}
              downloadUrl={platform.downloadUrl}
              loading={loading}
              version={version}
            />
          ))}
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
  downloadUrl: string | null;
  loading: boolean;
  version: string | null;
}

function PlatformCard({ platform, icon, description, downloadUrl, loading, version }: PlatformCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary/50 transition">
      <div className="flex items-center space-x-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{platform}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      {loading ? (
        <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm">Loading...</span>
      ) : downloadUrl ? (
        <a
          href={downloadUrl}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-medium"
        >
          Download {version ? `v${version}` : ''}
        </a>
      ) : (
        <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm">Not available</span>
      )}
    </div>
  );
}

