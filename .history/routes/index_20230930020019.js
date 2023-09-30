import express from "express";
import { ping } from "../controllers/index.js";
const router = express.Router();

router.post("/search", ping);
export default router;
