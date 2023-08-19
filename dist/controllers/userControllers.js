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
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.body.user.id);
        res.send(user);
    }
    catch (error) {
        res.status(500).send({ error: "no user found" });
    }
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield User.findOne({ email: req.body.email })) {
            res.status(409).send({
                message: "email already exist",
            });
        }
        else {
            const user = new User(req.body);
            const hashedPassword = yield bcrypt.hash(user.password, 8);
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
        const user = yield User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).send("wrong email or password");
        }
        else {
            const isPasswordValid = yield bcrypt.compare(req.body.password, user.password);
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
        const user = yield User.findByIdAndDelete(req.body.id);
        res.status(200).send({ message: "user deleted" });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = {
    getUserData,
    registerUser,
    loginUser,
    deleteUser,
};
