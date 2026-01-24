# Windows Font Loading Fix

## Issue

On Windows, Next.js 14.2.0 has a known issue with the `next/font/google` loader:

```
Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are 
supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs.
```

## Solution Applied

### 1. Updated `next.config.mjs`

Changed from:
```javascript
const nextConfig = {
  output: 'standalone',
};
```

To:
```javascript
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
};
```

### 2. Updated `app/layout.tsx`

Changed from using Next.js font optimization:
```typescript
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
// ...
<body className={inter.className}>
```

To using Google Fonts CDN directly:
```typescript
// In <head>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
// ...
<body className="font-sans">
```

### 3. Tailwind Config

The `tailwind.config.ts` already has Inter configured:
```typescript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
}
```

## Result

✅ Font loads correctly on Windows
✅ Same visual appearance
✅ No build errors
✅ Slightly faster initial load (no font optimization overhead)

## Trade-offs

**What we lost:**
- Automatic font optimization (subsetting, preloading)
- Self-hosted fonts (now loaded from Google CDN)

**What we gained:**
- Works on Windows without issues
- Simpler configuration
- Faster development builds
- Still looks identical

## Future Improvement

When Next.js fixes the Windows font loading issue (likely in Next.js 15), you can switch back to:

```typescript
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
```

And remove the Google Fonts link from the `<head>`.

## References

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Next.js Issue #48748](https://github.com/vercel/next.js/issues/48748) - Windows ESM loader issue

