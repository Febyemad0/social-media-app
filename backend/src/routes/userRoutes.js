
import express from "express";
import {createUser, getUserByEmail , getUserById , updateUser , deleteUser} from "../controllers/userController.js"

const route = express.Router()

route.get("/",getUserByEmail);
route.get("/:Id",getUserById);
route.post("/",createUser);
route.put("/:Id",updateUser);
route.delete("/:Id",deleteUser);

export default route;
