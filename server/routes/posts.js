import express from "express";
import {
    getFeedPosts, // funciton name in controller    
    getUserPosts,
    likePost
} from "../controllers/posts.js"; // import posts.js from controller [CRUD function]
import { verifyToken } from "../middleware/auth.js"; // import auth.js from middleware [token]

const router = express.Router();

/** ROUTE for CRUD operation */
/** READ */
router.get("/", verifyToken, getFeedPosts); // get all feed posts ==> algorithm or ai can be implemented to get the relevent post
router.get("/:userId/posts", verifyToken, getUserPosts); // get particular user's post

/** UPDATE */
router.patch("/:id/like", verifyToken, likePost); // add or remove likes

export default router; // export 