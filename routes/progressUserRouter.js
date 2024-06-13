import express from "express";
import { setProgress } from "../controllers/progressUserController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/setProgress", auth, setProgress);

export default router;
