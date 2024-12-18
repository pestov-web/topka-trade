const crypto = require("crypto");

function isValidTelegramData(query, botToken) {
  const { hash, ...data } = query;
  const secret = crypto.createHash("sha256").update(botToken).digest();
  const checkString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");
  const checkHash = crypto
    .createHmac("sha256", secret)
    .update(checkString)
    .digest("hex");
  return checkHash === hash;
}

module.exports = { isValidTelegramData };
