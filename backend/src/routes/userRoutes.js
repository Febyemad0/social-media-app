import express from "express";
import {
  register,
  login,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfie,
} from "../controllers/userController.js";
import registerValidation from "../middlewares/validator.js";
import verifyToken from "../middlewares/authMiddleware.js";
import { upload } from "../app.js";

const route = express.Router();

route.get("/", verifyToken, getUserByEmail);
route.get("/:Id", verifyToken, getUserById);
route.post("/", registerValidation, register);
route.post("/", login);
route.put("/", verifyToken, upload.single("image"), updateUserProfie);
route.put("/:Id", verifyToken, updateUser);
route.delete("/:Id", verifyToken, deleteUser);

export default route;
