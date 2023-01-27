import User from "../models/User.js";

/** READ */
/** get user information */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; // get the request id
        const user = await User.findById(id); // get user information by id
        res.status(200).json(user); // show the response in json format
    } catch (error) {
        res.status(404).json({ message: error.message }); // show the error response in json format
    }
};

/** get the user friends */
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params; // get the request id
        const user = await User.findById(id); // get user information by id

        const friends = await Promise.all( // promise is used for multiple api calls
            user.friends.map((id) => User.findById(id)) // get the user friends list
        );

        // select only the column fields that are needed to be shown
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePatch }) => {
                return { _id, firstName, lastName, occupation, location, picturePatch }; // return the result in object
            }
        );
        res.status(200).json(formattedFriends); // show the response in json format
    } catch (error) {
        res.status(404).json({ message: error.message }); // show the error response in json format
    }
};



/** UPDATE */
/** add or remove friends */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params; // get the request id and friendId
        const user = await User.findById(id); // get user information by id
        const friend = await User.findById(friendId); // get friend information by friendId

        // if friendId is included in main user friend id then
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId); // if friendId is already part of user friend list then remove
            friend.friends = friend.friends.filter((id) => id !== id); // remove from the friend list
        } else { 
            user.friends.push(friendId); // add them to the friend list
            friend.friends.push(id);
        }

        await user.save(); // save the upated changes
        await friend.save(); // save the upated changes

        /** AGAIN FORMAT THE FRIENDS LIST */
        const friends = await Promise.all( // promise is used for multiple api calls
            user.friends.map((id) => User.findById(id)) // get the user friends list
        );

        // select only the column fields that are needed to be shown
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePatch }) => {
                return { _id, firstName, lastName, occupation, location, picturePatch }; // return the result in object
            }
        );
        res.status(200).json(formattedFriends); // show the response in json format
    } catch (error) {
        res.status(404).json({ message: error.message }); // show the error response in json format
    }
};