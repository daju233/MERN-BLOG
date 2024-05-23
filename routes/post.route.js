import express from "express";
import { verifyToken } from "../api/utils/verifyUser.js";
import { createPost, getPosts } from "../api/controllers/post.conroller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getposts", getPosts);

export default router;
