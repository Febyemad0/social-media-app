import express from "express";
import  {createComment , getCommentsByPostId ,updateComment ,deleteComment , addLike ,getLikes} from "../controllers/commentController.js"


const route = express.Router();
route.get("/:postId",getCommentsByPostId);
route.post("/",createComment);
route.put("/:Id",updateComment);
route.delete("/:Id",deleteComment);
route.get("/like", getLikes);
route.post("/like", addLike);

export default route;