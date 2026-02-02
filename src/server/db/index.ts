import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";

// Create the connection
const connectionString = env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, {
	prepare: false,
	ssl: { rejectUnauthorized: false },
});

export const db = drizzle(client);
