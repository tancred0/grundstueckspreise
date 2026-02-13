"use server";

import { Client, type ClientConfig } from "pg";

// Types
export type BrwResponse = {
  layername: string;
  brw: number;
  gutachterausschuss: string;
  stichtag: string;
  gemarkung: string;
  gfz: string;
  grz: string;
  gez: string;
};

type BrwVariant = 'default' | 'wald' | 'acker';

// Constants
const DB_CONFIG: ClientConfig = {
  host: process.env.ENDPOINT,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
};

const VARIANT_LAYER_IDS: Record<BrwVariant, number[]> = {
  default: [0, 1],
  wald: [5],
  acker: [4]
} as const;

// Database utilities
async function createDbClient(): Promise<Client> {
  const client = new Client(DB_CONFIG);
  await client.connect();
  return client;
}

// Query builder
function buildBrwQuery(layerIds: number[]): string {
  return `
    SELECT 
        layername, 
        brw::float, 
        gabe as gutachterausschuss, 
        stag as stichtag,
        gema as gemarkung, 
        LEFT(wgfz, 5) as gfz,
        grz as grz,
        gez as gez
    FROM brw_clean_live
    WHERE st_contains(
        geom::geometry,
        st_point($1, $2)::geography::geometry
    ) AND (
        layerid = ANY($3)
    )
    ORDER BY 
        scraping_run DESC,
        brw::float DESC
  `;
}

// Single unified BRW fetching function
export async function getBrwValue(
  latitude: number,
  longitude: number,
  variant: BrwVariant = 'default'
): Promise<BrwResponse[]> {
  const client = await createDbClient();
  
  try {
    const layerIds = VARIANT_LAYER_IDS[variant];
    const query = buildBrwQuery(layerIds);
    const result = await client.query(query, [longitude, latitude, layerIds]);
    return JSON.parse(JSON.stringify(result.rows));
  } catch (err) {
    console.error('Database error:', err);
    throw new Error(`Failed to fetch BRW value for variant: ${variant}`);
  } finally {
    await client.end();
  }
}