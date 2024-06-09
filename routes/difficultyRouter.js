import express from "express";
import { getAll } from "../controllers/difficultiesController.js";

const router = express.Router();

router.get("/getAll", getAll);

export default router;
