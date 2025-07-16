import { Sweet } from "../models/index.js";

export const getAllSweets = async (req, res) => {
  const result = await Sweet.find({});
  console.log(result);

  if (!result) {
    res.status(500).json({ msg: "Error while Fetching Sweets" });
    return;
  }

  if (result.length == 0) {
    res.status(200).json({ msg: "No Sweets Are Available", data: [] });
    return;
  }

  res.status(200).json({ msg: "Sweets Fetch Sucessfully", data: result });
};

export const getOneSweet = async (req, res) => {
  const sweetId = req.params.sweetId;
  
  if (!sweetId) {
    res.status(400).json({ msg: "Sweet id not found" });
    return;
  }

  const dbSweet = await Sweet.findById(sweetId);

  if (!dbSweet) {
    res.status(404).json({ msg: "sweet not found" });
    return;
  }

  res.status(200).json({ msg: "Sweet data fetch successfully", data: dbSweet });
};
