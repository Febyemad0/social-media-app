import express from "express";
import cors from "cors";
import mongooese from "mongoose";
import dotenv from "dotenv";

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
