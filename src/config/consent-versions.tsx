import Link from "next/link";

export const CONSENT_CONFIG = {
  consent_version: 'v2.0',
  // Plain text version (without HTML/links) for hashing - matches agbText content
  consent_text: 'Mit dem Klick auf den untenstehenden Button bestätigen Sie, dass Sie die AGB und die Datenschutzerklärung gelesen haben und diesen zustimmen (Widerruf jederzeit möglich).',
  consent_method: 'button_click' as const,
  agb_version: 'v2.0',
  dse_version: 'v3.0',
} as const;

// SHA256 hash computation for browser (Web Crypto API)
export async function computeConsentHash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Form types for tracking
export type ConsentFormType = 'brw_funnel' | 'bewertung_funnel';

// Consent text component for display in forms
export function AgbText({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs text-gray-600 mb-0 ${className}`}>
      Mit dem Klick auf den untenstehenden Button bestätigen Sie, dass Sie die{" "}
      <Link href="/agb" className="text-xs" target="_blank">AGB</Link> und die{" "}
      <Link href="/datenschutz" className="text-xs" target="_blank">Datenschutzerklärung</Link> gelesen haben und diesen zustimmen (Widerruf jederzeit möglich).
    </p>
  );
}
