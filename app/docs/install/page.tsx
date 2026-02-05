'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type OS = 'windows' | 'macos' | 'linux';

const detectOS = (): OS => {
  if (typeof window === 'undefined') return 'windows';
  const ua = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || '';
  if (platform.includes('mac') || ua.includes('macintosh')) return 'macos';
  if (platform.includes('linux') || ua.includes('linux')) return 'linux';
  return 'windows';
};

export default function InstallGuidePage() {
  const [activeOS, setActiveOS] = useState<OS>('windows');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setActiveOS(detectOS());
  }, []);

  const tabs: { id: OS; label: string; icon: React.ReactNode }[] = [
    { id: 'windows', label: 'Windows', icon: <WindowsIcon /> },
    { id: 'macos', label: 'macOS', icon: <AppleIcon /> },
    { id: 'linux', label: 'Linux', icon: <LinuxIcon /> },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-sm mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            <span className="text-zinc-300">Platform-specific guides</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Installation Guide</h1>
          <p className="text-xl text-zinc-400">
            Step-by-step instructions for your operating system
          </p>
        </div>
      </section>

      {/* OS Tabs */}
      <section className="py-4 bg-zinc-900/80 backdrop-blur-xl border-b border-white/5 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl glass-card">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveOS(tab.id)}
                  className={`
                    flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium transition-all duration-300
                    ${activeOS === tab.id
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span className={`transition-transform duration-300 ${activeOS === tab.id ? 'scale-110' : ''}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {isClient && detectOS() === tab.id && activeOS === tab.id && (
                    <span className="ml-1 px-2 py-0.5 text-[10px] bg-white/20 rounded-full">Detected</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-zinc-950 min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="transition-all duration-500 ease-out">
            {activeOS === 'windows' && <WindowsGuide />}
            {activeOS === 'macos' && <MacOSGuide />}
            {activeOS === 'linux' && <LinuxGuide />}
          </div>

          {/* Back to Docs */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Documentation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Icons
function WindowsIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function LinuxIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.504 0c-.155 0-.311.003-.467.008-1.001.068-1.976.245-2.907.543a10.88 10.88 0 0 0-4.65 3.929 10.88 10.88 0 0 0-3.929 4.65c-.298.931-.475 1.906-.543 2.907A10.95 10.95 0 0 0 0 12.504c0 .155.003.311.008.467.068 1.001.245 1.976.543 2.907a10.88 10.88 0 0 0 3.929 4.65 10.88 10.88 0 0 0 4.65 3.929c.931.298 1.906.475 2.907.543.156.005.312.008.467.008s.311-.003.467-.008c1.001-.068 1.976-.245 2.907-.543a10.88 10.88 0 0 0 4.65-3.929 10.88 10.88 0 0 0 3.929-4.65c.298-.931.475-1.906.543-2.907.005-.156.008-.312.008-.467s-.003-.311-.008-.467c-.068-1.001-.245-1.976-.543-2.907a10.88 10.88 0 0 0-3.929-4.65 10.88 10.88 0 0 0-4.65-3.929c-.931-.298-1.906-.475-2.907-.543A10.95 10.95 0 0 0 12.504 0z" />
    </svg>
  );
}

// Shared Components
function StepCard({ number, title, children, variant = 'default' }: {
  number: number;
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success';
}) {
  const variants = {
    default: 'from-pink-500 to-purple-500',
    warning: 'from-amber-500 to-orange-500',
    success: 'from-emerald-500 to-cyan-500',
  };
  return (
    <div className="flex gap-4 p-5 glass-card rounded-xl">
      <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br ${variants[variant]} text-white rounded-xl font-bold`}>
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-white text-lg mb-2">{title}</h4>
        <div className="text-zinc-400 space-y-2">{children}</div>
      </div>
    </div>
  );
}

function AlertBox({ type, title, children }: {
  type: 'warning' | 'info' | 'success';
  title: string;
  children: React.ReactNode;
}) {
  const styles = {
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: '⚠️', titleColor: 'text-amber-300' },
    info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: '💡', titleColor: 'text-cyan-300' },
    success: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: '✅', titleColor: 'text-emerald-300' },
  };
  const s = styles[type];
  return (
    <div className={`p-5 rounded-xl ${s.bg} border ${s.border}`}>
      <h4 className={`font-semibold ${s.titleColor} mb-2 flex items-center gap-2`}>
        <span>{s.icon}</span> {title}
      </h4>
      <div className="text-zinc-400 text-sm space-y-2">{children}</div>
    </div>
  );
}

function WindowsGuide() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
          <WindowsIcon />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Windows Installation</h2>
          <p className="text-zinc-400">Windows 10 or later (64-bit)</p>
        </div>
      </div>

      <AlertBox type="warning" title="Windows SmartScreen Warning">
        <p>As a new publisher, Windows will show a security warning when you run the installer. This is normal and safe to proceed.</p>
      </AlertBox>

      <div className="space-y-4">
        <StepCard number={1} title="Download the Installer">
          <p>Go to the <Link href="/download" className="text-primary hover:underline font-medium">download page</Link> and get the Windows Installer (.exe) — it&apos;s the recommended option.</p>
        </StepCard>

        <StepCard number={2} title="Run the Installer" variant="warning">
          <p>Double-click the downloaded <code className="px-2 py-0.5 bg-zinc-800 rounded text-sm">Renaym-Setup-vX.X.X.exe</code> file.</p>
          <div className="mt-3 p-4 bg-zinc-900/50 rounded-lg border border-amber-500/20">
            <p className="text-amber-300 font-medium mb-2">When SmartScreen appears:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click <strong className="text-white">&quot;More info&quot;</strong></li>
              <li>Click <strong className="text-white">&quot;Run anyway&quot;</strong></li>
            </ol>
          </div>
        </StepCard>

        <StepCard number={3} title="Complete Installation">
          <p>Follow the installer prompts. Renaym will be installed to your Programs folder and added to your Start Menu.</p>
        </StepCard>

        <StepCard number={4} title="First Launch" variant="success">
          <p>Launch Renaym from the Start Menu. The Setup Wizard will guide you through:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Downloading the AI model (~2.3 GB one-time)</li>
            <li>Entering your TMDB API key</li>
          </ul>
        </StepCard>
      </div>

      <AlertBox type="info" title="Portable Version Available">
        <p>Prefer no installation? Download the Portable ZIP, extract anywhere, and run directly. Great for USB drives!</p>
      </AlertBox>
    </div>
  );
}

function MacOSGuide() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-800">
          <AppleIcon />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">macOS Installation</h2>
          <p className="text-zinc-400">macOS 11 (Big Sur) or later</p>
        </div>
      </div>

      <AlertBox type="warning" title="Security Warning Expected">
        <p>Renaym is currently unsigned while we work on Apple Developer certification. macOS will show a security warning — this is normal for independent software and <strong className="text-white">completely safe</strong>. We&apos;re a small project helping people organize their media files, not malware!</p>
      </AlertBox>

      <div className="space-y-4">
        <StepCard number={1} title="Download the DMG">
          <p>Go to the <Link href="/download" className="text-primary hover:underline font-medium">download page</Link> and download:</p>
          <ul className="list-disc list-inside mt-2">
            <li><strong className="text-white">Apple Silicon</strong> — For M1, M2, M3, M4 Macs</li>
            <li><strong className="text-white">Intel</strong> — For older Intel-based Macs</li>
          </ul>
          <p className="mt-2 text-sm text-zinc-500">Not sure? Go to  → About This Mac to check your chip.</p>
        </StepCard>

        <StepCard number={2} title="Open the DMG">
          <p>Double-click the downloaded <code className="px-2 py-0.5 bg-zinc-800 rounded text-sm">Renaym-vX.X.X-macos.dmg</code> file.</p>
          <p className="mt-2">A window will open showing the Renaym app and an Applications folder shortcut.</p>
        </StepCard>

        <StepCard number={3} title="Drag to Applications">
          <p>Drag the <strong className="text-white">Renaym</strong> icon to the <strong className="text-white">Applications</strong> folder.</p>
          <div className="mt-3 p-4 bg-zinc-900/50 rounded-lg text-center">
            <span className="text-4xl">📦</span>
            <span className="text-2xl mx-4">→</span>
            <span className="text-4xl">📁</span>
          </div>
        </StepCard>

        <StepCard number={4} title="Launch Renaym" variant="warning">
          <p>Open <strong className="text-white">Finder → Applications</strong> and double-click Renaym.</p>
          <div className="mt-3 p-4 bg-zinc-900/50 rounded-lg border border-amber-500/20">
            <p className="text-amber-300 font-medium mb-2">When the security warning appears:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click <strong className="text-white">&quot;Cancel&quot;</strong> (don&apos;t click &quot;Move to Trash&quot;)</li>
              <li>Open <strong className="text-white">System Settings → Privacy &amp; Security</strong></li>
              <li>Scroll down to find <strong className="text-white">&quot;Renaym was blocked...&quot;</strong></li>
              <li>Click <strong className="text-white">&quot;Open Anyway&quot;</strong></li>
            </ol>
            <p className="mt-3 text-zinc-500 text-xs">Alternative: Right-click the app and select &quot;Open&quot; from the context menu, then click &quot;Open&quot; in the dialog.</p>
          </div>
        </StepCard>

        <StepCard number={5} title="Complete Setup" variant="success">
          <p>The Setup Wizard will guide you through initial configuration.</p>
        </StepCard>
      </div>

      <AlertBox type="info" title="Eject the DMG">
        <p>After installation, you can eject the DMG by right-clicking it on your desktop and selecting &quot;Eject&quot;.</p>
      </AlertBox>
    </div>
  );
}

function LinuxGuide() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500">
          <LinuxIcon />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Linux Installation</h2>
          <p className="text-zinc-400">Ubuntu 20.04+ or equivalent (64-bit)</p>
        </div>
      </div>

      <div className="space-y-4">
        <StepCard number={1} title="Download the Archive">
          <p>Go to the <Link href="/download" className="text-primary hover:underline font-medium">download page</Link> and download the Linux tar.gz archive.</p>
        </StepCard>

        <StepCard number={2} title="Extract the Archive">
          <div className="mt-2 p-3 bg-zinc-900 rounded-lg font-mono text-sm overflow-x-auto">
            <code className="text-emerald-400">tar -xzf Renaym-Client-vX.X.X-linux-x64.tar.gz</code>
          </div>
        </StepCard>

        <StepCard number={3} title="Make Executable">
          <div className="mt-2 p-3 bg-zinc-900 rounded-lg font-mono text-sm overflow-x-auto">
            <code className="text-emerald-400">chmod +x ./Client</code>
          </div>
        </StepCard>

        <StepCard number={4} title="Run Renaym" variant="success">
          <div className="mt-2 p-3 bg-zinc-900 rounded-lg font-mono text-sm overflow-x-auto">
            <code className="text-emerald-400">./Client</code>
          </div>
          <p className="mt-3">The Setup Wizard will guide you through initial configuration.</p>
        </StepCard>
      </div>

      <AlertBox type="info" title="Optional: Add to PATH">
        <p>Move the extracted folder to <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs">/opt/renaym</code> and add to your PATH for system-wide access.</p>
      </AlertBox>
    </div>
  );
}

