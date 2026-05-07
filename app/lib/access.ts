export const WEDDING_DAY = new Date('2026-07-04T00:00:00+01:00');

export function getAdminEmails() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getProtocolEmails() {
  return (process.env.NEXT_PUBLIC_PROTOCOL_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;

  return getAdminEmails().includes(email.toLowerCase());
}

export function isProtocolEmail(email?: string | null) {
  if (!email) return false;

  return getProtocolEmails().includes(email.toLowerCase());
}

export function isWeddingDayOrAfter() {
  return new Date() >= WEDDING_DAY;
}
