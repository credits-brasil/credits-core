import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../generated/prisma/client";

// Strip sslmode from the URL so it doesn't conflict with the explicit ssl config below.
const connectionString = (process.env.DATABASE_URL ?? "").replace(
  /([?&])sslmode=[^&]+&?/,
  "$1",
);

// Managed Postgres (DigitalOcean) uses a cert not in Node's trust store.
const adapter = new PrismaPg({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export const prisma = new PrismaClient({ adapter });
