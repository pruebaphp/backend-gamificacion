import express from "express";
import { create, get } from "../controllers/levelsController.js";

const router = express.Router();

router.post("/create", create);
router.get("/get/:subsection_id", get);

export default router;
