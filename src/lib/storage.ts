export const storage = {
	get: (key: string): string | null => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem(key);
	},

	set: (key: string, value: string): void => {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(key, value);
		} catch (e) {
			console.error(`Error storing ${key}:`, e);
		}
	},

	getJSON: <T>(key: string): T | null => {
		const value = storage.get(key);
		if (!value) return null;

		try {
			return JSON.parse(value) as T;
		} catch (e) {
			console.error(`Error parsing ${key}:`, e);
			storage.remove(key);
			return null;
		}
	},

	setJSON: <T>(key: string, value: T): void => {
		try {
			storage.set(key, JSON.stringify(value));
		} catch (e) {
			console.error(`Error storing ${key}:`, e);
		}
	},

	remove: (key: string): void => {
		if (typeof window === "undefined") return;
		localStorage.removeItem(key);
	},
};
