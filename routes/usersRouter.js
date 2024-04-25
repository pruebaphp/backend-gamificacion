import express from "express";
import {
  create,
  getAll,
  login,
  profile,
} from "../controllers/usersController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", create);
router.get("/getAll", getAll);
router.post("/login", login);
router.post("/profile", auth, profile);

export default router;
