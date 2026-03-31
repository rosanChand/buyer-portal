import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "../utils/config";

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
