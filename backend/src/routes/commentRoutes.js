import express from "express";
import  CommentModel from "../services/commentService.js"


const route = express.Router();
route.get("/",CommentModel.getCommentsByPostId);
route.post("/",CommentModel.create);
route.update("/",CommentModel.update);
route.delete("/",CommentModel.delete);
route.get("/like",CommentModel.getLikes);
route.post("/like",CommentModel.addLike);
export default route;