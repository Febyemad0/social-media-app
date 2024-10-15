import express from "express";
import cors from "cors";
import mongooese from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js"
import postRouter from "./routes/postRoutes.js"
import commentRouter from "./routes/commentRoutes.js"

dotenv.config();

const url = process.env.DATABASE_URL;
const app = express();

app.use(cors());
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

  app.use('/user', userRouter);
  app.use('/post', postRouter)
  app.use('/comment', commentRouter)

