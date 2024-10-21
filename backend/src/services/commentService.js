import Comment from "../models/comments.js";

/**
 * Class representing operations related to the Comment model.
 */
class CommentModel {
  // Creates a new comment and saves it to the database
  static async create(postId, content, userId) {
    let comment = new Comment({
      content: content,
      userId: userId,
      postId: postId,
    });
    return comment.save();
  }

  // Retrieves all comments for a specific post
  static async getCommentsByPostId(postId) {
    return Comment.find({ postId: postId }).lean();
  }

  /* Updates a comment document with new data where updatedData is an object like:
    {
      content: "Updated Content"
    } */
  static async update(id, updatedData) {
    let comment = await Comment.findById(id);
    if (!comment) {
      throw new Error("Comment does not exist");
    }
    Object.keys(updatedData).forEach((key) => {
      comment[key] = updatedData[key];
    });
    return comment.save();
  }

  // Deletes a comment by its ID
  static async delete(id) {
    let deleted = await Comment.deleteOne({ _id: id });
    return deleted.deletedCount;
  }

  // like a comment

  static async addLike(commentId, userId) {
    let comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment does not exist");
    }
    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
      return comment.save();
    }
  }

  // remove like
  static async removeFriend(userId, postId) {
    let comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment does not exist");
    }
    if (comment.likes.includes(userId)) {
      comment.likes.splice(comment.likes.indexOf(userId), 1);
      return comment.save();
    }
  }

  // get likes of a comment
  static async getLikes(commentId) {
    let comment = await Comment.findById(commentId).lean();
    if (!comment) {
      throw new Error("Comment does not exist");
    }
    return comment.likes.length;
  }
}

export default CommentModel;
