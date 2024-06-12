import express from "express";
import { create, getAll } from "../controllers/questionController.js";
import upload from "../middlewares/uploadImage.js";

const router = express.Router();

router.post("/create", upload.single("file"), create);
router.get("/getAll/:level_id", getAll);

export default router;
