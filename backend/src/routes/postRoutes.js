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
/**
 * Controller: getPostsByUserId
 * Takes:
 *   - req.userId (from authentication middleware)
 * Output:
 *   - Success: 200 status with { data: posts }
 *   - Failure: 404 status with { message: "posts Not Found" }
 */
route.get("/userPosts", verifyToken, getPostsByUserId);
/**
 * Controller: getPostById
 * Takes:
 *   - req.body: { postId }
 * Output:
 *   - Success: 200 status with { data: post }
 *   - Failure: 404 status with { message: "post Not Found" }
 */
route.get("/", verifyToken, getPostById);
/**
 * Controller: createPost
 * Takes:
 *   - req.body: { title, content, userId, media }
 * Output:
 *   - Success: 200 status with { message: "post created successfully", data: post }
 */
route.post("/", verifyToken, createPost);

/**
 * Controller: updatePost
 * Takes:
 *   - req.params: { Id }
 *   - req.body: updatedData
 * Output:
 *   - Success: 200 status with { data: post }
 *   - Failure: 404 status with { message: "post Not found" }
 */
route.put("/:Id", verifyToken, updatePost);
/**
 * Controller: deletePost
 * Takes:
 *   - req.params: { Id }
 * Output:
 *   - Success: 200 status with { message: "post deleted successfully" }
 *   - Failure: 404 status with { message: "post Not found" }
 */
route.delete("/:Id", verifyToken, deletePost);

/**
 * Controller: getLikes
 * Takes:
 *   - req.body: { postId }
 * Output:
 *   - Success: 200 status with { data: likes }
 */
route.get("/like", verifyToken, getLikes);
/**
 * Controller: addLike
 * Takes:
 *   - req.body: { postId, userId }
 * Output:
 *   - Success: 200 status with { message: "Like Added successfully" }
 */
route.post("/like", verifyToken, addLike);

export default route;
