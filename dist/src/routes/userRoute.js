"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const auth_1 = require("../middleware/auth");
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
exports.userRouter = express_1.default.Router();
const { getUserData, registerUser, loginUser, deleteUser } = userControllers_1.userController;
exports.userRouter.get("/me", auth_1.auth, getUserData);
exports.userRouter.post("/register", registerUser);
exports.userRouter.post("/login", loginUser);
exports.userRouter.delete("/delete", auth_1.auth, deleteUser);
