import express from "express";
import { verifyToken } from "../api/utils/verifyUser.js";
import {
  createPost,
  getPosts,
  deletePost,
} from "../api/controllers/post.conroller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getposts", getPosts);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);

export default router;
