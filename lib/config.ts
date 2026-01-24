/**
 * API Configuration
 * 
 * In production, API calls go to AWS Lambda via API Gateway
 * In development, they go to Next.js API routes
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const API_ENDPOINTS = {
  stripeCheckout: `${API_BASE_URL}/api/stripe/checkout`,
  stripeWebhook: `${API_BASE_URL}/api/stripe/webhook`,
  retrieveLicense: `${API_BASE_URL}/api/retrieve-license`,
};

