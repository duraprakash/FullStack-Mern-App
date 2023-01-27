import bcrypt from "bcrypt"; // encrypt password
import jwt from "jsonwebtoken"; // generate token
import User from "../models/User.js"; // import User model


/** REGISTER USER */
/** async send data back and fort between api server (back-end) and the client 
 * whereas req will be the request body we get in the front-end
 * res will be the response we get from the api server (back-end)
*/
export const register = async (req, res) => {
    // try catch block to handle errors
    try {
        // request parameters to be sent from the front-end
        const {
            firstName, // column name
            lastName, // column name
            email,
            password,
            picturePatch,
            friends,
            location,
            occupation,
        } = req.body;

        // encryption using bcrypt 
        const salt = await bcrypt.genSalt();
        // encrypt password with the help of bcrypt salt
        const passwordHash = await bcrypt.hash(password, salt);

        // 
        const newUser = new User({
            firstName, // column name
            lastName, // column name
            email,
            password: passwordHash,
            picturePatch,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), // providing some dummy value
            impressions: Math.floor(Math.random() * 10000), // providing some dummy value
        });
        const savedUser = await newUser.save(); // save in the database
        res.status(201).json(savedUser); // show the response in json format
    } catch (error) {
        res.status(500).json({ error: error.message }); // show the server/backend errors in json format with 500 status code
    }
};


/** LOGIN FUNCTION
 * Here the basic authentication is implemented/setup
 * in production level==> use third party authentication or have team to secure authentication
 * 
 * For authorization auth.js is created inside middleware folder
 * to avoid non-login user actions
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // required email and password while loggin 
        const user = await User.findOne({ email: email }); // find user details by email
        if (!user) return res.status(400).json({ msg: "User doesn't exist. " }); // show message when user is not found
        
        const isMatch = await bcrypt.compare(password, user.password); // compare provided password with saved password in database
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " }); // if password not matched show message
        
        // TODO: Note 2==> JWT_SECRET value is in .env
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // JWT_SECRET has string value in .env file which is hidden
        delete user.password; // delete the password before sending the response to the front-end
        res.status(200).json({ token, user }); // show the response in json format
    } catch (error) {
        res.status(500).json({ error: error.message }); // show the server/backend errors in json format with 500 status code
    }
};