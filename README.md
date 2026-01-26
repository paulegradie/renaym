# Renaym Website

The official website for [Renaym](https://renaym.com) — an AI-powered media file renaming tool.

## Overview

This repository contains the source code for the Renaym marketing website and e-commerce platform. The site is built with Next.js and deployed as a static site to GitHub Pages, with a serverless backend on AWS for payment processing.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Hosting**: GitHub Pages (static export)
- **Backend**: AWS Lambda + API Gateway

## Architecture

```
GitHub Pages (Static Site)
    ↓ API calls
API Gateway
    ↓
Lambda Functions
    ↓
Stripe API
```

The website uses a hybrid architecture:

- **Frontend**: Static Next.js site exported and hosted on GitHub Pages
- **Backend**: AWS Lambda functions handle Stripe checkout, webhooks, and license retrieval

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env.local` file with your development keys:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── pricing/            # Pricing page
│   ├── download/           # Download page
│   ├── docs/               # Documentation
│   ├── retrieve-license/   # License retrieval
│   └── success/            # Post-purchase page
├── components/             # Reusable UI components
├── lib/                    # Utility functions
├── public/                 # Static assets
└── package.json
```

## Deployment

The site is automatically deployed via GitHub Actions:

1. Push to `main` triggers the deployment workflow
2. Next.js builds and exports to static HTML
3. Static files are deployed to GitHub Pages
4. AWS Lambda backend is deployed separately via Terraform

See the deployment documentation in the main repository for full details.

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture overview
- [DOMAIN_SETUP.md](./DOMAIN_SETUP.md) - Custom domain configuration

## License

Copyright © 2024-2026 Renaym. All rights reserved.

This is proprietary software. See [LICENSE](./LICENSE) for details.
