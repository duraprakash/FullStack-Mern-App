import mongoose from "mongoose";

// schema for user table
const UserSchema = new mongoose.Schema(
    {
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
        email: {
            type: String, // string data types
            required: true, // null value not supported
            max: 50, // min length 50
            unique: true, // duplicate value not supported
        },
        // column name
        password: {
            type: String, // string data types
            required: true, // null value not support
            min: 8, // min length 8
        },
        // column name
        picturePath: {
            type: String, // string data types
            default: "", // nullable 
        },
        // column name
        friends: {
            type: Array, // array data types
            default: [], // nullable
        },
        // column name
        location: String, // data types  
        occupation: String, //data types
        viewedProfile: Number, // number data types
        impressions: Number, // number data types
    },
    { timestamps: true } // current timestamps by default
); 


const User = mongoose.model("User", UserSchema); // create User table in mongodb as defined in UserSchema
export default User; // execute

