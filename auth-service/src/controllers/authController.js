const { isValidTelegramData } = require("../services/telegramAuthService");
const { findUserByTelegramId, createUser } = require("../db/userRepository");

async function login(req, res) {
  const botToken = process.env.BOT_TOKEN;
  const data = req.query;

  if (!isValidTelegramData(data, botToken)) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const { id: telegramId, username } = data;
  let user = await findUserByTelegramId(telegramId);

  if (!user) {
    user = await createUser(telegramId, username);
  }

  // Генерация JWT (если нужно)
  res.status(200).json({ user });
}

module.exports = { login };
