const pool = require("./connection");

async function findUserByTelegramId(telegramId) {
  const res = await pool.query("SELECT * FROM users WHERE telegram_id = $1", [
    telegramId,
  ]);
  return res.rows[0];
}

async function createUser(telegramId, username) {
  const res = await pool.query(
    "INSERT INTO users (telegram_id, username) VALUES ($1, $2) RETURNING *",
    [telegramId, username]
  );
  return res.rows[0];
}

module.exports = {
  findUserByTelegramId,
  createUser,
};
