import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 3000;

import { userRouter, ownerRouter, sweetRouter } from "./routes/index.js";

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log("Server is listening on port:", port);
  });
}

main()
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop");
}

const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/owner", ownerRouter);
app.use("/sweets", sweetRouter);

export { app };
