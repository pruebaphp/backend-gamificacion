import express from "express";
import {
  create,
  getAll,
  getAllPlay,
} from "../controllers/sectionsController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", create);
router.get("/getAll", getAll);
router.get("/getAllPlay", auth, getAllPlay);

export default router;
