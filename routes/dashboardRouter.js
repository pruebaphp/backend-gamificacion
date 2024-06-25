import express from "express";
import auth from "../middlewares/auth.js";
import { dashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", auth, dashboard);

export default router;
