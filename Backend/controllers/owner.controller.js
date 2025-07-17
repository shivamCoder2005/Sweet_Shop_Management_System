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

  if (!sweetData) {
    res.status(400).json({ msg: "Sweet Data not found" });
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

export const updateSweet = async (req, res) => {
  const sweetId = req.params.sweetId;
  const sweetData = req.body.sweetData;

  if (!sweetData) {
    res.status(400).json({ msg: "Sweet Data not found" });
    return;
  }

  const dbSweet = await Sweet.findByIdAndUpdate(sweetId, sweetData, {
    runValidators: true,
    new: true,
  });

  if (!dbSweet) {
    res.status(500).json({ msg: "error while updating sweet" });
    return;
  }

  res.status(200).json({ msg: "Sweet updated successfully", data: dbSweet });
};

export const deleteSweet = async (req, res) => {
  const sweetId = req.params.sweetId;
  if (!sweetId) {
    res.status(400).json({ msg: "sweet id not found" });
    return;
  }

  const dbSweet = await Sweet.findByIdAndDelete(sweetId);

  if (!dbSweet) {
    res.status(500).json({ msg: "error while deleting sweet" });
    return;
  }

  res.status(200).json({ msg: "sweet deleted successfully" });
};

export const addStockToInventory = async (req, res) => {
  const updatedStock = req.body.updatedStock;

  if (!updatedStock) {
    res.status(400).json({ msg: "new stock not found" });
    return;
  }

  // we can also use $inc operator of mongodb to update existing quantity
  const promises = updatedStock.map((us) => {
    if (us.updatedSweetQuantity) {
      return Sweet.findByIdAndUpdate(
        //it will return null if _id not found rather than throw err
        us._id,
        { quantity: us.updatedSweetQuantity },
        { new: true, runValidators: true }
      ).catch((e) => console.log(e));
    }
    return null;
  });

  const result = await Promise.all(promises);

  res.status(200).json({ msg: "new stock added to inventory" });
};
