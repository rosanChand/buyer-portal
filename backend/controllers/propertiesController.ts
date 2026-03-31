import { Response } from "express";
import prisma from "../models/database";
import { AuthRequest } from "../middleware/auth";
import logger from "../utils/logger";

export const getAllProperties = async (
  _req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ properties });
  } catch (err) {
    logger.error("GetAllProperties error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
