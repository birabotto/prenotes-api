import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Token id required" });
    return;
  }

  const [, token] = authHeader.split(" ");
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    (req as any).userId = decoded.sub as string;
    next();
  } catch {
    res.status(401).json({ error: "Token invalid" });
  }
}
