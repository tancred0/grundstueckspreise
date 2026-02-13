export function generateTransactionNumber(): string {
  const year = new Date().getFullYear();
  const randomNumber = (Math.floor(Math.random() * (10_000)) + 10_000).toString();
  return `GPD-${year}-${randomNumber}`.toUpperCase();
}
