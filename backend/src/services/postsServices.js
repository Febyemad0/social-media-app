import Post from "../models/posts.js";

/**
 * Class representing operations related to the Post model.
 */
class PostModel {
  // Creates a new post and saves it to the database
  static async create(title, content, userId, media = []) {
    let post = new Post({
      title: title,
      content: content,
      userId: userId,
      media: media,
    });
    return post.save();
  }

  // Retrieves all posts created by a specific user
  static async getPostsByUserId(userId) {
    return Post.find({ userId: userId }).lean();
  }

  // Retrieves a post document by its ID
  static async getPostById(id) {
    return Post.findById(id).lean();
  }

  /* Updates a post document with new data where updatedData is an object like:
    {
      title: "New Title",
      content: "Updated Content"
    } */
  static async update(id, updatedData) {
    let post = await Post.findById(id);
    if (!post) {
      throw new Error("Post does not exist");
    }
    Object.keys(updatedData).forEach((key) => {
      post[key] = updatedData[key];
    });
    return post.save();
  }

  // Deletes a post by its ID
  static async delete(id) {
    let deleted = await Post.deleteOne({ _id: id });
    return deleted.deletedCount;
  }

  // like a post
  static async addLike(postId, userId) {
    let post = await Post.findById(postId);
    if (!post) {
      throw new Error("post does not exist");
    }
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      return post.save();
    }
  }
  // remove like
  static async removeFriend(userId, postId) {
    let post = await Post.findById(postId);
    if (!post) {
      throw new Error("post does not exist");
    }
    if (post.likes.includes(userId)) {
      post.likes.splice(post.likes.indexOf(userId), 1);
      return post.save();
    }
  }
  // get likes of a post
  static async getLikes(postId) {
    let post = await Post.findById(postId).lean();
    if (!post) {
      throw new Error("Comment does not exist");
    }
    return post.likes.length;
  }
}

export default PostModel;
