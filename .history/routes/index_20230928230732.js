import express from "express";
import { ping } from "../controllers/index.js";
const router = express.Router();

router.get("/", ping);
export default router;
