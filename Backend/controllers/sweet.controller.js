import { Sweet } from "../models/index.js";

export const getAllSweets = async (req, res) => {
  // fetch all the sweets
  const result = await Sweet.find({});

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

  // fetch paritcular sweet
  const dbSweet = await Sweet.findById(sweetId);

  if (!dbSweet) {
    res.status(404).json({ msg: "sweet not found" });
    return;
  }

  res.status(200).json({ msg: "Sweet data fetch successfully", data: dbSweet });
};

export const sortAndFilterSweets = async (req, res) => {
  const { sortFilterOptions } = req.body;

  const matchConditions = [];

  // check whether name is selected or not
  if (sortFilterOptions.name !== "") {
    matchConditions.push({
      name: { $regex: `^${sortFilterOptions.name}`, $options: "i" },
    });
  }

  // check whether catagory is selected or not
  if (sortFilterOptions.category !== "") {
    matchConditions.push({ category: sortFilterOptions.category });
  }

  // parse sort,minVal,maxVal into int
  let result = null;
  sortFilterOptions.sort = parseInt(sortFilterOptions.sort);
  sortFilterOptions.minVal = parseInt(sortFilterOptions.minVal);
  sortFilterOptions.maxVal = parseInt(sortFilterOptions.maxVal);

  // check whether name is selected or not
  matchConditions.push({
    price: { $gte: sortFilterOptions.minVal, $lte: sortFilterOptions.maxVal },
  });

  // check whether name is selected or not
  if (sortFilterOptions.sortBy !== "" && sortFilterOptions.sort !== 0) {
    const sortOptions = {};
    sortOptions[sortFilterOptions.sortBy] = sortFilterOptions.sort;
    result = await Sweet.find({ $and: matchConditions }).sort(sortOptions);
  } else {
    result = await Sweet.find({ $and: matchConditions });
  }

  if (!result) {
    res.status(200).json({ msg: "No Sweet Found Successfully", data: [] });
    return;
  }

  res.status(200).json({ msg: "Sorted Successfully", data: result });
};
