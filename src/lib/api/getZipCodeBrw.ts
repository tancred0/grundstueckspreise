"use server";

import { Client } from "pg";

export async function getZipCodeBrw(plz: string): Promise<number | null> {
  const client = new Client({
    host: process.env.ENDPOINT,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const query = `
        SELECT weighted_brw
        FROM plz_brw
        WHERE plz = $1;
    `;

    const result = await client.query(query, [plz]);

    if (result.rows.length === 0) {
      return null;
    }
    return Math.round(result.rows[0].weighted_brw * 100) / 100;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    await client.end();
  }
}