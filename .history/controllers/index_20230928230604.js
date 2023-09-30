import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const ping = async (req, res, next) => {
  return res.status(200).json("ping pong");
};
