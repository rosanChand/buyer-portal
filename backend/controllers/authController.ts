import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "../models/database";
import { config } from "../utils/config";
import { AuthRequest } from "../middleware/auth";
import logger from "../utils/logger";

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

function generateAccessToken(user: {
  id: string;
  email: string;
  role: string;
}): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY },
  );
}

function generateRefreshToken(user: { id: string }): string {
  return jwt.sign({ id: user.id }, config.JWT_REFRESH_SECRET, {
    expiresIn: `${REFRESH_TOKEN_EXPIRY_DAYS}d`,
  });
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function sanitiseUser(user: any) {
  const { passwordHash, ...safe } = user;
  return safe;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // check duplicate email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: "Email already registered." });
      return;
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // create user
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    // generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // store hashed refresh token
    await prisma.userToken.create({
      data: {
        userId: user.id,
        refreshTokenHash: hashToken(refreshToken),
        expiresAt: new Date(
          Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
        ),
      },
    });

    logger.info(`User registered: ${user.email}`);

    res.status(201).json({
      user: sanitiseUser(user),
      accessToken,
      refreshToken,
    });
  } catch (err) {
    logger.error("Register error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    // generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // store hashed refresh token
    await prisma.userToken.create({
      data: {
        userId: user.id,
        refreshTokenHash: hashToken(refreshToken),
        expiresAt: new Date(
          Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
        ),
      },
    });

    logger.info(`User logged in: ${user.email}`);

    res.json({
      user: sanitiseUser(user),
      accessToken,
      refreshToken,
    });
  } catch (err) {
    logger.error("Login error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required." });
      return;
    }

    // verify JWT signature
    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
    } catch {
      res.status(401).json({ error: "Invalid refresh token." });
      return;
    }

    // find matching token in DB
    const tokenHash = hashToken(refreshToken);
    const storedToken = await prisma.userToken.findFirst({
      where: {
        userId: decoded.id,
        refreshTokenHash: tokenHash,
        isRevoked: false,
      },
      include: { user: true },
    });

    if (!storedToken) {
      res.status(401).json({ error: "Refresh token not found or revoked." });
      return;
    }

    // check expiry
    if (storedToken.expiresAt < new Date()) {
      res.status(401).json({ error: "Refresh token expired." });
      return;
    }

    // generate new access token
    const accessToken = generateAccessToken(storedToken.user);

    res.json({ accessToken });
  } catch (err) {
    logger.error("Refresh error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required." });
      return;
    }

    const tokenHash = hashToken(refreshToken);

    // revoke the token
    await prisma.userToken.updateMany({
      where: { refreshTokenHash: tokenHash },
      data: { isRevoked: true },
    });

    res.json({ message: "Logged out successfully." });
  } catch (err) {
    logger.error("Logout error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.json({ user });
  } catch (err) {
    logger.error("GetMe error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
