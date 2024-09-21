import express from "express";
import {
  getGamedata,
  getPlayerdata,
} from "../api/controllers/game.controller.js";

const router = express.Router();

router.get("/playerdata", getPlayerdata);
router.get("/gamedata", getGamedata);
export default router;
