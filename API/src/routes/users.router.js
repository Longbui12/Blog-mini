import express from "express";
import {
  updateUserAvatar,
  getUserAvatar,
} from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/:id/avatar", updateUserAvatar);
router.get("/:id/avatar", getUserAvatar);

export default router;
