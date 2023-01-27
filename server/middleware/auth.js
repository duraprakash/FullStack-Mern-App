import jwt from "jsonwebtoken";

/** Token verification function
 * 
 * parameters are req=> requested part, res=> response, next=> continue
 * 
 */
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization"); // get authorization header from the front-end
        
        if (!token) {
            return res.status(403).send("Access Denied"); // if no token then show this message
        }

        if (token.startWith("Bearer ")) {  // token must start with Bearer
            token = token.slice(7, token.length).trimLeft(); // grab the token values after Bearer_
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); // token is generated using JWT_SECRET values so, given token is verifying if they match
        req.user = verified; // user is verified
        next(); // token is valid then proceed upcoming function

    } catch (error) {
        res.status(500).json({ error: error.message }); // show error message in json format
    }

};