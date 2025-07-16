import { User, Owner, Sweet } from "../models/index.js";

export const signupOwner = async (req, res) => {
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
    return;
  }
  res.status(500).json({ msg: "Error while creating new owner" });
};

export const loginOwner = async (req, res) => {
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
};

export const addNewSweet = async (req, res) => {
  const sweetData = req.body.sweetData;
  console.log(sweetData);
  
  if (!sweetData) {
    res.status(400).json({ msg: "Sweet Data Can't be null" });
    return;
  }

  const dbSweet = await Sweet.findOne({ name: sweetData.name });
  if (dbSweet) {
    res.status(409).json({ msg: "Email Already exist" });
    return;
  }

  const newSweet = new Sweet(sweetData);
  const result = await newSweet.save();

  if (result) {
    res.status(200).json({ msg: "Sweet added Sucessfully", data: result });
    return;
  }
  res.status(500).json({ msg: "Error while creating new sweet" });
};
