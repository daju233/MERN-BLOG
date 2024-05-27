import express from "express";
import {
  test,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  signout,
} from "../api/controllers/user.controller.js";
import { verifyToken } from "../api/utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);
router.get("/:userId", getUser);

export default router;
