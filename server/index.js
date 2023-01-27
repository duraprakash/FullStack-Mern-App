import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"; // import auth.js from route folder [routing part]
import userRoutes from "./routes/users.js"; // [routing part]
import postRoutes from "./routes/posts.js"; // [routing part]
import { register } from "./controllers/auth.js"; // import auth.js from controller folder [CRUD & validation part]
import { createPost } from "./controllers/posts.js"; // [CRUD & validation part]
import { verifyToken } from "./middleware/auth.js"; // import auth.js from middleware folder [token part]

/** Dummy Data starts here */
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
/** Dummy data ends here */

/** CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/** FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/** ROUTE WITH FILES */
app.post("/auth/register", upload.single("picture"), register); // this one is not placed inside routes because upload must be globally accessable any time
app.post("/posts", verifyToken, upload.single("picture"), createPost); // create post with verified token

/** ROUTES */
app.use("/auth", authRoutes); // routes for all routes /auth will be prefix for all
app.use("/users", userRoutes); // route for user profile
app.use("/posts", postRoutes) // route for posts

/** MONGOOSE SETUP */
const PORT = process.env.PORT || 6001; // TODO: Note 1 ==> PORT & MONGO_URL values are kept in .env file
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /** ADD DATA ONE TIME */
    /** seeding dummy data starts here */
    // User.insertMany(users);
    // Post.insertMany(posts);
    /** seeding dummy data ends here */
  })
  .catch((error) => console.log(`${error} did not connect`));