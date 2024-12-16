import express from "express";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use("/api", authRoutes);

export default app;
