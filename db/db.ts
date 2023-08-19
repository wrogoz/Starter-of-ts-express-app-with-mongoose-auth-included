import mongoose from "mongoose";

mongoose.connect(`${process.env.URI}`).then(() => {
  console.log("db connected");
});
