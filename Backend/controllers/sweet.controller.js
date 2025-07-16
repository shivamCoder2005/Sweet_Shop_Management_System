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

  res.status(200).json({ msg: "Sweets Fetch Sucessfully", data:result });
};

