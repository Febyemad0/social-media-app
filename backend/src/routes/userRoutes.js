import express from "express";
import userModel from "../services/userServices"

const route = express.Router()

route.get("/",userModel.getByEmail);
route.get("/:Id",userModel.getById);
route.post("/",userModel.create);
route.update("/",userModel.update);
route.delete("/",userModel.delete);

export default route;
