import express from "express";
import { userRouter } from "./src/routes/userRoute";
import "dotenv/config";
import "./config/db";
import helmet from "helmet";
import cors from "cors";

const app = express();
const corsOption = {
  origin: ["localhost:3000", "https://example-fe-origin-address.com"],
  credentials: true,
  preflightContinue: true,
};

app.use(cors(corsOption));

app.use(helmet());
app.use(express.json());
app.use("/user", userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
