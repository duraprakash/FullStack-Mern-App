import Post from "../models/Post.js";
import User from "../models/User.js";

/** CREATE */
/** get post information */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body; // get the request body
        const user = await User.findById(userId); // get user information by id
        const newPost = new Post ({
            userId,
            firstName: user.firstName,
            lastname: user.lastName,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save(); // save the post

        const post = await Post.find(); // get all the post
        res.status(201).json(post); // show the response in json format
    } catch (error) {
        res.status(409).json({ message: error.message }); // show the error response in json format
    }
};


/** READ */
/** get feed post information */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find(); // get all feed post information
        res.status(200).json(post); // show the response in json format
    } catch (error) {
        res.status(404).json({ message: error.message }); // show the error response in json format
    }
};

/** get user feed post information */
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params; // get the request id
    const post = await Post.find({ userId });// get feed post information by userId
    res.status(200).json(post); // show the response in json format
  } catch (err) {
    res.status(404).json({ message: err.message }); // show the error response in json format
  }
};

/** UPDATE */
/** add or remove like post  */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params; // get the request id and friendId
        const { userId } = req.body; // get the request body

        const post = await Post.findById(id); // get post information by id
        const isLiked = post.likes.get(userId); // check if ths userId has like the post yes/no

        // kept in object
        if (isLiked) {
          post.likes.delete(userId); // delete liked
        } else {
          post.likes.set(userId, true); // set liked
        }

        const updatedPost = await Post.findByIdAndUpdate( // promise is used for multiple api calls
            id,
            { likes: post.likes }, // list of likes
            { new: true } // object
        );

        res.status(200).json(updatedPost); // show the response in json format
    } catch (error) {
        res.status(404).json({ message: error.message }); // show the error response in json format
    }
};