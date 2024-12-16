import crypto from "crypto";

export const verifyTelegramData = (
  query: Record<string, string>,
  botToken: string
): boolean => {
  const { hash, ...data } = query;
  const sortedData = Object.entries(data)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secret = crypto.createHash("sha256").update(botToken).digest();
  const calculatedHash = crypto
    .createHmac("sha256", secret)
    .update(sortedData)
    .digest("hex");

  return calculatedHash === hash;
};
