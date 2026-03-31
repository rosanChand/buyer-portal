import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Access denied. Invalid token format." });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expired.", code: "TOKEN_EXPIRED" });
      return;
    }
    res.status(401).json({ error: "Invalid token." });
  }
};

export default auth;
