"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = require("./src/routes/userRoute");
require("dotenv/config");
require("./config/db");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOption = {
    origin: ["localhost:3000", "https://example-fe-origin-address.com"],
    credentials: true,
    preflightContinue: true,
};
app.use((0, cors_1.default)(corsOption));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use("/user", userRoute_1.userRouter);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});
