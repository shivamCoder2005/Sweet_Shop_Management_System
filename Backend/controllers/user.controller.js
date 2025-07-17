import { User, Sweet } from "../models/index.js";

export const signupUser = async (req, res) => {
  const { userData } = req.body;

  // check whether userdata receive or not
  if (!userData) {
    res.status(400).json({ msg: "User Data Can't be null" });
    return;
  }

  // check whether user with same email exist or not
  const dbUser = await User.findOne({ email: userData.email });

  if (dbUser) {
    res.status(409).json({ msg: "Email Already exist" });
    return;
  }

  const newUser = new User(userData);
  const result = await newUser.save();
  console.log(result);

  if (result) {
    res.status(200).json({ msg: "User Registered Sucessfully", data: result });
  }
  res.status(500).json({ msg: "Error while creating new user" });
};

export const loginUser = async (req, res) => {
  const { userData } = req.body;

  // check whether userdata receive or not
  if (!userData) {
    res.status(400).json({ msg: "User Data Can't be null" });
    return;
  }

  // check whether user with same email exist or not
  const dbUser = await User.findOne({ email: userData.email });
  console.log(dbUser);

  if (!dbUser) {
    res.status(404).json({ msg: "User Not Found" });
    return;
  }

  // mathching user password
  if (dbUser.password !== userData.password) {
    res.status(401).json({ msg: "Password Not Match" });
    return;
  }

  res.status(200).json({ msg: "User Loggedin Sucessfully", data: dbUser });
};

export const purchaseSweets = async (req, res) => {
  const {purchaseData} = req.body;

  // check whether the purchaseData receive or not
  if (!purchaseData) {
    res.status(400).json({ msg: "purchase sweet data not found" });
    return;
  }

  // check for available sweet quantity whether it is enogh or not
  const sweet = await Sweet.findById(purchaseData._id);
  if (sweet.quantity == 0 || sweet.quantity < purchaseData.buyQuantity) {
    res.status(400).json({ msg: "Not enough stock to buy" });
    return;
  }

  // find by id and update sweet stock
  const dbSweet = await Sweet.findByIdAndUpdate(
    purchaseData._id,
    {
      $inc: { quantity: -purchaseData.buyQuantity },
    },
    { runValidators: true, new: true }
  );

  if (!dbSweet) {
    res.status(500).json({ msg: "error while buying sweet" });
    return;
  }

  res.status(200).json({ msg: "successfully buy sweet", data: dbSweet });
};
