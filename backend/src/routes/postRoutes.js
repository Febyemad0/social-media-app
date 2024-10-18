import express from "express";
import {
  createPost,
  getPostsByUserId,
  getPostById,
  updatePost,
  deletePost,
  addLike,
  getLikes,
} from "../controllers/postController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const route = express.Router();
route.get("/", verifyToken, getPostsByUserId);
route.get("/", verifyToken, getPostById);
route.post("/", verifyToken, createPost);
route.put("/:Id", verifyToken, updatePost);
route.delete("/:Id", verifyToken, deletePost);
route.get("/like", verifyToken, getLikes);
route.post("/like", verifyToken, addLike);

export default route;
