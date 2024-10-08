import express from "express";

import {
  signup,
  signin,
  google,
  jwttest,
} from "../api/controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", jwttest, signin);
router.post("/google", google);

export default router;
