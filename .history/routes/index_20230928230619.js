import express from "express";
import { ping } from "../controllers/index.js";
const router = express.Router();
export default router;

router.get("/", ping);
