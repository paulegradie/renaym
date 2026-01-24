import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎬</span>
              <span className="text-xl font-bold gradient-text">Renaime</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary transition">
              Home
            </Link>
            <Link href="/docs" className="text-gray-600 hover:text-primary transition">
              Docs
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-primary transition">
              Pricing
            </Link>
            <Link href="/download" className="text-gray-600 hover:text-primary transition">
              Download
            </Link>
            <a 
              href="https://github.com/TheGradieCatalog/Renaime" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

