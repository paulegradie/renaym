import crypto from 'crypto';

export interface LicenseData {
  email: string;
  plan: 'pro' | 'lifetime';
  issuedAt: string;
  expiresAt?: string; // undefined for lifetime
}

/**
 * Generate a signed license key using RSA
 * Format: base64(JSON payload).base64(signature)
 */
export function generateLicenseKey(data: LicenseData, privateKey: string): string {
  const payload = {
    email: data.email,
    plan: data.plan,
    issuedAt: data.issuedAt,
    expiresAt: data.expiresAt,
  };

  const payloadJson = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadJson).toString('base64url');

  // Sign the payload
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(payloadBase64);
  sign.end();

  const signature = sign.sign(privateKey, 'base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Generate a simple random license key (for testing without RSA keys)
 * Format: RENAIME-XXXXX-XXXXX-XXXXX-XXXXX
 */
export function generateSimpleLicenseKey(): string {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    const segment = crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 5);
    segments.push(segment);
  }
  return `RENAIME-${segments.join('-')}`;
}

/**
 * Validate license key format (basic check)
 */
export function isValidLicenseKeyFormat(key: string): boolean {
  // Check for signed format (base64url.base64url)
  if (key.includes('.')) {
    const parts = key.split('.');
    return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
  }
  
  // Check for simple format (RENAIME-XXXXX-XXXXX-XXXXX-XXXXX)
  return /^RENAIME-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/.test(key);
}

/**
 * Calculate expiry date for pro plan (1 year from now)
 */
export function calculateExpiryDate(plan: 'pro' | 'lifetime'): string | undefined {
  if (plan === 'lifetime') {
    return undefined;
  }
  
  const now = new Date();
  const expiry = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  return expiry.toISOString();
}

