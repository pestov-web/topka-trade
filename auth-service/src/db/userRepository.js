const pool = require("./connection");

async function findUserByTelegramId(telegramId) {
  try {
    const res = await pool.query("SELECT * FROM users WHERE telegram_id = $1", [
      telegramId,
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Error in findUserByTelegramId:", error.message);
    console.error("Stack trace:", error.stack);
    throw new Error("Failed to fetch user by Telegram ID");
  }
}

async function createUser(telegramId, username) {
  try {
    const res = await pool.query(
      "INSERT INTO users (telegram_id, username) VALUES ($1, $2) RETURNING *",
      [telegramId, username]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error in createUser:", error.message);
    console.error("Stack trace:", error.stack);
    throw new Error("Failed to create user");
  }
}

module.exports = {
  findUserByTelegramId,
  createUser,
};
