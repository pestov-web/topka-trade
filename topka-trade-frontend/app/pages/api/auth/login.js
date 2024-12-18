import axios from "axios";

export default async function handler(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error); // Log the error
    res.status(401).json({ error: "Invalid token" });
  }
}
