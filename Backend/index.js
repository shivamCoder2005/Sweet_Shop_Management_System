import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 3000;

import { User, Owner, Sweet } from "./models/index.js";

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server is listening..");
  });
}

main()
  .then(() => {
    console.log("connection successful");
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

app.post("/owner/signup", async (req, res) => {
  const ownerData = req.body.ownerData;
  if (!ownerData) {
    res.status(400).json({ msg: "Owner Data Can't be null" });
    return;
  }

  const dbUser = await Owner.findOne({ email: ownerData.email });

  if (dbUser) {
    res.status(409).json({ msg: "Email Already exist" });
    return;
  }

  const newOwner = new Owner(ownerData);
  const result = await newOwner.save();

  if (result) {
    res.status(200).json({ msg: "Owner Registered Sucessfully", data: result });
  }
});

app.post("/owner/login", async (req, res) => {
  const ownerData = req.body.ownerData;
  if (!ownerData) {
    res.status(400).json({ msg: "Owner Data Can't be null" });
    return;
  }
  const dbUser = await Owner.findOne({ email: ownerData.email });

  if (!dbUser) {
    res.status(404).json({ msg: "Owner Not Found" });
    return;
  }

  if (dbUser.password !== ownerData.password) {
    res.status(401).json({ msg: "Password Not Match" });
    return;
  }

  res.status(200).json({ msg: "Owner Loggedin Sucessfully", data: dbUser });
});

app.post("/user/signup", async (req, res) => {
  const userData = req.body.userData;
  if (!userData) {
    res.status(400).json({ msg: "User Data Can't be null" });
    return;
  }

  const dbUser = await User.findOne({ email: userData.email });
  console.log(dbUser);

  if (dbUser) {
    res.status(409).json({ msg: "Email Already exist" });
    return;
  }

  const newUser = new User(userData);
  const result = await newUser.save();
  console.log(result);
  if (result) {
    res.status(200).json({ msg: "User Registered Sucessfully", data: result });
  } else res.status(205);
});

app.post("/user/login", async (req, res) => {
  const userData = req.body.userData;

  if (!userData) {
    res.status(400).json({ msg: "User Data Can't be null" });
    return;
  }

  const dbUser = await User.findOne({ email: userData.email });
  console.log(dbUser);

  if (!dbUser) {
    res.status(404).json({ msg: "User Not Found" });
    return;
  }

  if (dbUser.password !== userData.password) {
    res.status(401).json({ msg: "Password Not Match" });
    return;
  }

  res.status(200).json({ msg: "User Loggedin Sucessfully", data: dbUser });
});

export { app };
