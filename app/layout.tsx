import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Renaym - AI-Powered Media Renaming",
  description: "Intelligent media file renaming with AI-powered filename parsing and TMDB integration. Organize your movie and TV library effortlessly.",
  keywords: "media renamer, file renamer, movie organizer, TV show organizer, TMDB, AI, filename parser",
  authors: [{ name: "Renaym" }],
  openGraph: {
    title: "Renaym - AI-Powered Media Renaming",
    description: "Intelligent media file renaming with AI-powered filename parsing and TMDB integration.",
    url: "https://renaym.com",
    siteName: "Renaym",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renaym - AI-Powered Media Renaming",
    description: "Intelligent media file renaming with AI-powered filename parsing and TMDB integration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3790SNZ0T0"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3790SNZ0T0');
        `}
      </Script>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

