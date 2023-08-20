"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findById(req.body.user.id);
        res.send(user);
    }
    catch (error) {
        res.status(500).send({ error: "no user found" });
    }
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield userModel_1.User.findOne({ email: req.body.email })) {
            res.status(409).send({
                message: "email already exist",
            });
        }
        else {
            const user = new userModel_1.User(req.body);
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 8);
            user.password = hashedPassword;
            yield user.save();
            const token = user.createToken();
            res.status(201).send({ token, user });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).send("wrong email or password");
        }
        else {
            const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (isPasswordValid) {
                const token = user.createToken();
                res.send({ token });
            }
            else {
                res.send("wrong email or password");
            }
        }
    }
    catch (error) {
        res.send(error.message);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findByIdAndDelete(req.body.id);
        res.status(200).send({ message: "user deleted" });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.userController = {
    getUserData,
    registerUser,
    loginUser,
    deleteUser,
};
