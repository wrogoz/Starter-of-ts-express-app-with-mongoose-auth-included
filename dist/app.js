"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const app = (0, express_1.default)();
require("./db/db");
const helmet = require("helmet");
const user = require("./routes/userRoute");
const cors = require("cors");
const corsOption = {
    origin: ["localhost:3000", "https://example-fe-origin-address.com"],
    credentials: true,
    preflightContinue: true,
};
app.use(cors(corsOption));
app.use(helmet());
app.use(express_1.default.json());
app.use("/user", user);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});
