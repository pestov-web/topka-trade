import { Router } from "express";
import { telegramAuth } from "../controllers/authController";

const router = Router();

router.get("/auth/telegram", telegramAuth);

export default router;
