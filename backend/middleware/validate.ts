import { Request, Response, NextFunction } from "express";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Name, email, and password are required." });
    return;
  }

  if (name.trim().length < 2) {
    res.status(400).json({ error: "Name must be at least 2 characters." });
    return;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Please provide a valid email address." });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters." });
    return;
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  next();
};

export const validateFavourite = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { propertyId } = req.body;

  if (!propertyId) {
    res.status(400).json({ error: "Property ID is required." });
    return;
  }

  if (typeof propertyId !== "string") {
    res.status(400).json({ error: "Property ID must be a string." });
    return;
  }

  next();
};
