import mongoose from "mongoose";

// schema for user table
const PostSchema = new mongoose.Schema(
    {
        // column name
        userId: {
            type: String, // string data type
            required: true, // null value not supported
        },
        // column name
        firstName: {
            type: String, // string data types
            required: true, // null value not supported
            min: 2, // min length 2
            max: 50, // max length 50
        },
        // column name
        lastName: {
            type: String, // string data types
            required: true, // null value not supported
            min: 2, // min length 2
            max: 50, // max length 50
        },
        // column name
        location: String, // string data types 
        description: String, // string data types
        picturePath: String, // string data types
        userPicturePath: String, // string data types
        // column name
        likes: {
            type: Map, // data type map ==> object
            of: Boolean, // boolean 0/1 or true/false
        },
        comments: {
            type: Array, // array data types
            default: [], // nullable
        },
    },
    { timestamps: true } // current timestamps by default
); 


const Post = mongoose.model("Post", PostSchema); // create Post table in mongodb as defined in PostSchema
export default Post; // execute

