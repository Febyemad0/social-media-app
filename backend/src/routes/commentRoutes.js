import express from "express";
import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  addLike,
  getLikes,
} from "../controllers/commentController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const route = express.Router();
route.get("/:postId", verifyToken, getCommentsByPostId);
route.post("/", verifyToken, createComment);
route.put("/:Id", verifyToken, updateComment);
route.delete("/:Id", verifyToken, deleteComment);
route.get("/like", verifyToken, getLikes);
route.post("/like", verifyToken, addLike);

export default route;
