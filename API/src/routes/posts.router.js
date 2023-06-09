import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,

  // getall,
} from "../controllers/post.controller.js";

const router = express.Router();

//router.get("/", getall);

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

// router.get("/test", addPost);

export default router;
