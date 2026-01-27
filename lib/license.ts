import crypto from 'crypto';

export type PlanType = 'annual' | '2year' | 'lifetime';

export interface LicenseData {
  email: string;
  plan: PlanType;
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
 * Format: RENAYM-XXXXX-XXXXX-XXXXX-XXXXX
 */
export function generateSimpleLicenseKey(): string {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    const segment = crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 5);
    segments.push(segment);
  }
  return `RENAYM-${segments.join('-')}`;
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

  // Check for simple format (RENAYM-XXXXX-XXXXX-XXXXX-XXXXX)
  return /^RENAYM-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/.test(key);
}

/**
 * Calculate expiry date based on plan type
 * - annual: 1 year from now
 * - 2year: 2 years from now
 * - lifetime: no expiry (undefined)
 */
export function calculateExpiryDate(plan: PlanType): string | undefined {
  if (plan === 'lifetime') {
    return undefined;
  }

  const now = new Date();
  const yearsToAdd = plan === '2year' ? 2 : 1;
  const expiry = new Date(now.getFullYear() + yearsToAdd, now.getMonth(), now.getDate());
  return expiry.toISOString();
}
