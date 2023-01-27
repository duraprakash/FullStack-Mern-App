import express from "express";
import { login } from "../controllers/auth.js"; // import from controllers folder

const router = express.Router();

router.post("/login", login);

export default router;