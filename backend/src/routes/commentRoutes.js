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
/**
 * Controller: getCommentsByPostId
 * Takes:
 *   - req.params: { postId }
 * Output:
 *   - Success: 200 status with { data: comment }
 *   - Failure: Empty comment: { message: "comment is empty" }
 */
route.get("/:postId", verifyToken, getCommentsByPostId);

/**
 * Controller: createComment
 * Takes:
 *   - req.body: { postId, content, userId }
 * Output:
 *   - Success: 200 status with { message: "comment created successfully", data: comment }
 */
route.post("/", verifyToken, createComment);
/**
 * Controller: updateComment
 * Takes:
 *   - req.params: { Id }
 *   - req.body: updatedData
 * Output:
 *   - Success: 200 status with { data: comment }
 *   - Failure: Not found: { message: "comment Not found" }
 */
route.put("/:Id", verifyToken, updateComment);
/**
 * Controller: deleteComment
 * Takes:
 *   - req.params: { Id }
 * Output:
 *   - Success: 200 status with { message: "comment deleted successfully" }
 *   - Failure: Not found: { message: "comment Not found" }
 */
route.delete("/:Id", verifyToken, deleteComment);
/**
 * Controller: getLikes
 * Takes:
 *   - req.body: { commentId }
 * Output:
 *   - Success: 200 status with { data: likes }
 */
route.get("/like", verifyToken, getLikes);
/**
 * Controller: addLike
 * Takes:
 *   - req.body: { commentId, userId }
 * Output:
 *   - Success: 200 status with { message: "Like Added successfully" }
 */
route.post("/like", verifyToken, addLike);

export default route;
