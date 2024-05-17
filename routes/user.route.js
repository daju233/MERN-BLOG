import express from "express";
import { test, updateUser } from "../api/controllers/user.controller.js";
import { verifyToken } from "../api/utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
