import { auth } from "../middleware/auth";
import express from "express";
import { userController } from "../controllers/userControllers";
export const userRouter = express.Router();

const { getUserData, registerUser, loginUser, deleteUser } = userController;

userRouter.get("/me", auth, getUserData);

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.delete("/delete", auth, deleteUser);
