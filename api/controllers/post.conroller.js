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
  const slug = req.body.title.split(" ").join("-").toLowerCase();
  const newPost = new Post({ ...req.body, slug, userId: req.user.userid });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { userId: req.query.category }),
      ...(req.query.slug && { userId: req.query.slug }),
      ...(req.query.postId && { userId: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $option: "i" } },
          { content: { $regex: req.query.searchTerm, $option: "i" } },
        ],
      }),
    })
      .sort({ updateAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};
