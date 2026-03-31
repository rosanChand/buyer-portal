import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret",
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret",
  DATABASE_URL: process.env.DATABASE_URL || "",
};
