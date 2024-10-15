import express from "express";
import {createPost ,getPostsByUserId ,getPostById ,updatePost ,deletePost , addLike ,getLikes} from "../controllers/postController.js"


const route = express.Router();
route.get("/",getPostsByUserId);
route.get("/",getPostById);
route.post("/", createPost);
route.put("/:Id",updatePost);
route.delete("/:Id",deletePost);
route.get("/like",getLikes);
route.post("/like",addLike);

export default route;