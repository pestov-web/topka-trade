const { isValidTelegramData } = require("../services/telegramAuthService");
const { findUserByTelegramId, createUser } = require("../db/userRepository");

async function login(req, res) {
  console.log("Received login request");
  const botToken = process.env.BOT_TOKEN;
  const data = req.query;

  if (!isValidTelegramData(data, botToken)) {
    console.log("Invalid data");
    return res.status(400).json({ error: "Invalid data" });
  }

  const { id: telegramId, username } = data;
  console.log("Telegram ID:", telegramId);
  let user = await findUserByTelegramId(telegramId);

  if (!user) {
    console.log("User not found, creating new user");
    user = await createUser(telegramId, username);
  }

  // Генерация JWT (если нужно)
  res.status(200).json({ user });
}

module.exports = { login };
