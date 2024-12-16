import { Request, Response } from "express";
import { pool } from "../config/database";
import { verifyTelegramData } from "../utils/verifyTelegram";

export const telegramAuth = async (req: Request, res: Response) => {
  const botToken = process.env.BOT_TOKEN as string;

  if (!verifyTelegramData(req.query as Record<string, string>, botToken)) {
    return res.status(400).send("Invalid Telegram data");
  }

  const { id, username, first_name, last_name, auth_date } = req.query;

  try {
    const result = await pool.query(
      "INSERT INTO users (telegram_id, username, first_name, last_name, auth_date) VALUES ($1, $2, $3, $4, to_timestamp($5)) ON CONFLICT (telegram_id) DO UPDATE SET auth_date = to_timestamp($5) RETURNING *",
      [id, username, first_name, last_name, auth_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal Server Error");
  }
};
