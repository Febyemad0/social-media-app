import Post from "../models/posts.js";
import UserModel from "./userServices.js";

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
    console.log(userId);
    return Post.find({ userId: userId }) // Filter by userId
      .populate("userId", "username profileImage") // Populate with only the desired fields
      .lean();
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
  static async removeLike(userId, postId) {
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
      throw new Error("post does not exist");
    }
    return post.likes.length;
  }

  static async getTimeline(userId) {
    let friends = await UserModel.getFriendsById(userId);
    friends.push({ _id: userId });
    let posts = await Promise.all(
      friends.map(async (firend) => {
        return await PostModel.getPostsByUserId(firend._id);
      })
    );
    posts = posts.flat();
    return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

export default PostModel;
