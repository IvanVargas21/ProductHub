import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// initializes a connection to NeonDB over HTTPS.
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

// this sql function (neon()) we export is used as a tagged template literal, which allows us to write SQL queries safely (by embedding variables or other queries)

// Returns an async TAGGED-TEMPLATE FUNCTIOM that runs a single SQL query (no session or transactions) with low latency over https. Queries are composable: they can be embedded inside each other.

// connection string
// postgresql://neondb_owner:npg_1oX6jquLArmO@ep-muddy-glitter-a89hdqg3-pooler.eastus2.azure.neon.tech/neondb?sslmode=require