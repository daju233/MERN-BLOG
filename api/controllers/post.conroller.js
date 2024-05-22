import Post from "../../models/post-model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  //   console.log(req.user);
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "你不被允许创建帖子"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "请填充所有字段"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");
  const newPost = new Post({ ...req.body, slug, userId: req.user.userid });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
