import { Response } from "express";
import prisma from "../models/database";
import { AuthRequest } from "../middleware/auth";
import logger from "../utils/logger";

export const getFavourites = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const favourites = await prisma.favourite.findMany({
      where: { userId: req.user!.id },
      include: { property: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ favourites });
  } catch (err) {
    logger.error("GetFavourites error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const addFavourite = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { propertyId } = req.body;
    const userId = req.user!.id;

    // check property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      res.status(404).json({ error: "Property not found." });
      return;
    }

    const existing = await prisma.favourite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });
    if (existing) {
      res.status(409).json({ error: "Property already in favourites." });
      return;
    }

    const favourite = await prisma.favourite.create({
      data: { userId, propertyId },
      include: { property: true },
    });

    res.status(201).json({ message: "Added to favourites.", favourite });
  } catch (err) {
    logger.error("AddFavourite error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const removeFavourite = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const propertyId = req.params.propertyId as string;
    const userId = req.user!.id;

    // find favourite belonging to this user
    const favourite = await prisma.favourite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });

    if (!favourite) {
      res.status(404).json({ error: "Favourite not found." });
      return;
    }

    await prisma.favourite.delete({ where: { id: favourite.id } });

    res.json({ message: "Removed from favourites." });
  } catch (err) {
    logger.error("RemoveFavourite error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
