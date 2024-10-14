import express from "express";
import  postModel from "../services/postsServices.js"


const route = express.Router();
route.get("/:userId",postModel.getPostsByUserId);
route.get("/:postId",postModel.getPostById);
route.post("/",postModel.create);
route.update("/",postModel.update);
route.delete("/",postModel.delete);
route.get("/like",postModel.getLikes);
route.post("/like",postModel.addLike);

export default route;