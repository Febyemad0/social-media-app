import User from "../models/user.js";

/**
 * Class representing operations related to the User model.
 */
class UserModel {
  // Creates a new user and saves it to the database
  static async create(username, email, password, profileImage = "") {
    if (await UserModel.getByUserName(username)) {
      throw new Error("username already exist");
    }
    let user = new User({
      username: username,
      email: email,
      password: password,
      profileImage: profileImage,
    });
    return user.save();
  }

  // get a user document by email
  static async getByUserName(username) {
    return User.findOne({ username: username });
  }
  // get a user document by email
  static async getByEmail(email) {
    return User.findOne({ email: email });
  }

  // get a user document by id
  static async getById(id) {
    return User.findById(id, "username email profileImage");
  }
  // update profile image
  static async updateProfileImg(id, path) {
    return User.findByIdAndUpdate(id, { profileImage: path }, { new: true });
  }
  /* Updates a user document with new data where updated data is an object like:
    {
    username: "NAME",
    password: "PASSWORD"
  } */
  static async update(id, updatedData) {
    let user = await User.findById(id);
    if (!user) {
      throw new Error("user does not exist");
    }
    Object.keys(updatedData).forEach((key) => {
      user[key] = updatedData[key];
    });
    return user.save();
  }

  //  delete user by id
  static async delete(id) {
    let deleted = await User.deleteOne({ _id: id });
    return deleted.deletedCount;
  }

  // get a user friends by id
  static async getFriendsById(id) {
    const { friends } = await User.findById(id, "friends");
    return Promise.all(friends.map(async (id) => await UserModel.getById(id)));
  }
  // add friend
  static async addFriend(userId, friendId) {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error("user does not exist");
    }
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      return user.save();
    }
  }
  // remove friend
  static async removeFriend(userId, friendId) {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error("user does not exist");
    }
    if (user.friends.includes(friendId)) {
      user.friends.splice(user.friends.indexOf(friendId), 1);
      return user.save();
    }
  }
}
export default UserModel;
