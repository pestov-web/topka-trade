import { Request, Response, NextFunction } from "express";
import { verifyTelegramData } from "../utils/verifyTelegram";

export const verifyTelegramMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const botToken = process.env.BOT_TOKEN as string;

  if (!verifyTelegramData(req.query as Record<string, string>, botToken)) {
    return res.status(400).send("Invalid Telegram data");
  }

  next();
};
