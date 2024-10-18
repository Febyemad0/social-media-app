import userModel from "../services/userServices.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.getByEmail(email);
    if (user) {
      res.status(200).json({ message: "email is already exist" });
    } else {
      const hashed_pass = await hash(password, 10);
      const user = await userModel.create(username, email, hashed_pass);
      console.log(user);
      const token = jwt.sign({ userId: user.id }, process.env.SecretKey, {
        expiresIn: "1h",
      });
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
      };
      res.cookie("token", token, cookieOptions);
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const email_is_exist = await userModel.getByEmail(email);
    if (!email_is_exist) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await compare(password, email_is_exist.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign(
      { userId: email_is_exist.id },
      process.env.SecretKey,
      {
        expiresIn: "1h",
      }
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      partitioned: true,
    };
    res.cookie("token", token, cookieOptions);
    res
      .status(200)
      .json({ message: "user logged in", userId: email_is_exist.id });
  } catch (error) {
    res.status(500).json({ error: `Login ${error}` });
  }
};

export const updateUserProfie = async (req, res) => {
  try {
    const userId = req.userId;

    const updatedUser = await userModel.updateProfileImg(userId, req.file.path);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Profile picture uploaded successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserByEmail = async (req, res) => {
  const email = req.body.email;
  const user = await userModel.getByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  res.status(200).json({ data: user });
};

export const getUserById = async (req, res) => {
  const Id = req.params.Id;
  const user = await userModel.getById(Id);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  res.status(200).json({ data: user });
};

export const updateUser = async (req, res) => {
  const Id = req.params.Id;
  const updatedData = req.body;
  const user = await userModel.update(Id, updatedData);
  if (!user) {
    return res.status(404).json({ message: "user doesn't exist" });
  }
  res.status(200).json({ data: user });
};

export const deleteUser = async (req, res) => {
  const Id = req.params.Id;
  const user = await userModel.delete(Id);
  if (!user) {
    return res.status(404).json({ message: "user doesn't exist" });
  }
  res.status(200).json({ message: "user deleted successfully" });
};
