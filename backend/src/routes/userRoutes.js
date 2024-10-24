import express from "express";
import multer from "multer";
import {
  register,
  login,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfile,
  getFriendsById,
  addFriend,
  removeFriend,
  logout,
} from "../controllers/userController.js";
import registerValidation from "../middlewares/validator.js";
import verifyToken from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const route = express.Router();
/**
 * Controller: getUserByEmail
 * Takes:
 *   - req.body: { email }
 * Output:
 *   - Success: 200 status with { data: user }
 *   - Failure: 404 status with { message: "User Not Found" }
 */
route.get("/", verifyToken, getUserByEmail);

/**
 * Controller: getUserById
 * Takes:
 *   - req.params: { Id }
 * Output:
 *   - Success: 200 status with { data: user }
 *   - Failure: 404 status with { message: "User Not Found" }
 */
route.get("/:Id", verifyToken, getUserById);
/**
 * Controller: register
 * Takes:
 *   - req.body: { username, email, password }
 * Output:
 *   - Success: 201 status with { message: "User registered successfully" }
 *   - Failure:
 *     - 200 status if email exists with { message: "email is already exist" }
 *     - 500 status with { error: err }
 */
route.post("/register", registerValidation, register);

/**
 * Controller: login
 * Takes:
 *   - req.body: { email, password }
 * Output:
 *   - Success: 200 status with { message: "user logged in", userId: email_is_exist.id }
 *   - Failure:
 *     - 401 status if authentication fails with { error: "Authentication failed" }
 *     - 500 status with { error: `Login ${error}` }
 */
route.post("/login", login);
route.post("/logout", logout);
/**
 * Controller: updateUserProfie
 * Takes:
 *   - req.userId (from authentication)
 *   - req.file.path (file upload path)
 * Output:
 *   - Success: 200 status with { message: "Profile picture uploaded successfully", user: updatedUser }
 *   - Failure:
 *     - 404 status if user not found with { message: "User not found" }
 *     - 500 status with { error: err.message }
 */
route.put("/", verifyToken, upload.single("image"), updateUserProfile);
/**
 * Controller: updateUser
 * Takes:
 *   - req.params: { Id }
 *   - req.body: updatedData
 * Output:
 *   - Success: 200 status with { data: user }
 *   - Failure: 404 status with { message: "user doesn't exist" }
 */
route.put("/:Id", verifyToken, updateUser);
/**
 * Controller: deleteUser
 * Takes:
 *   - req.params: { Id }
 * Output:
 *   - Success: 200 status with { message: "user deleted successfully" }
 *   - Failure: 404 status with { message: "user doesn't exist" }
 */
route.delete("/:Id", verifyToken, deleteUser);

route.get("/friend/:Id", verifyToken, getFriendsById);

route.post("/friend", verifyToken, addFriend);

route.delete("/friend", verifyToken, removeFriend);

export default route;
