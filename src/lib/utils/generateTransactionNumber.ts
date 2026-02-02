/**
 * Generates a transaction number based on the current year and a random number starting from 50k
 * Format: BRW-YYYY-NNNNN (e.g., BRW-2026-67890)
 */
export function generateTransactionNumber(): string {
	const currentYear = new Date().getFullYear();
	const randomNumber = Math.floor(100_000 + Math.random() * 100_000); // Random number between 50000-99999

	return `IPD-${currentYear}-${randomNumber}`;
}
