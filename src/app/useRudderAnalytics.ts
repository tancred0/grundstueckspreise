"use client";

// Stub for removed Rudder analytics
// Returns an object with no-op methods to satisfy TypeScript

interface RudderAnalyticsStub {
	getAnonymousId: () => string | undefined;
	getSessionId: () => number | undefined;
	track: (event: string, properties?: Record<string, unknown>, options?: Record<string, unknown>) => void;
	identify: (userId: string, traits?: Record<string, unknown>) => void;
	page: (category?: string, name?: string, properties?: Record<string, unknown>) => void;
}

export default function useRudderStackAnalytics(): RudderAnalyticsStub | null {
	// Return null - consumers check for null before calling methods
	// When not null, the interface satisfies optional chaining usage
	return null;
}
