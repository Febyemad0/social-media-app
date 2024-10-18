import express from "express";
import cors from "cors";
import mongooese from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import multer from "multer";

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });
const url = process.env.DATABASE_URL;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "images")));
app.use(express.json());
mongooese
  .connect(url)
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
