import express from "express";
import { verifyToken } from "../api/utils/verifyUser.js";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../api/controllers/post.conroller.js";
import { updateUser } from "../api/controllers/user.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getposts", getPosts);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);
router.put("/updatepost/:postId/:userId", verifyToken, updatePost);

export default router;
