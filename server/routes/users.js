import express from "express";
import {
    getUser, // funciton name in controller
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js"; // import users.js from controller [CRUD function]
import { verifyToken } from "../middleware/auth.js"; // import auth.js from middleware [token]

const router = express.Router();

/** ROUTE for CRUD operation */
/** READ */
router.get("/:id", verifyToken, getUser); // get user details by id
router.get("/:id/friends", verifyToken, getUserFriends); // get user friend list

/** UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); // add or remove friends

export default router; // export 