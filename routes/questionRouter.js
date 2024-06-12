import express from "express";
import { create } from "../controllers/questionController.js";
import upload from "../middlewares/uploadImage.js";


const router = express.Router();

router.post("/create", upload.single('file'), create);

export default router;


