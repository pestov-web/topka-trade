import { pool } from "../config/database";

export const upsertUser = async (
  telegramId: string,
  username: string,
  firstName: string,
  lastName: string,
  authDate: string
) => {
  const result = await pool.query(
    "INSERT INTO users (telegram_id, username, first_name, last_name, auth_date) VALUES ($1, $2, $3, $4, to_timestamp($5)) ON CONFLICT (telegram_id) DO UPDATE SET auth_date = to_timestamp($5) RETURNING *",
    [telegramId, username, firstName, lastName, authDate]
  );
  return result.rows[0];
};
