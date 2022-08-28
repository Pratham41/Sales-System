const User = require("../model/user");
const generateToken = require("../utils/generateToken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json("Invalid email or password");
  }
};

exports.registerUser = async (req, res) => {
  const userExists = await User.findOne({ email:req.body.email });

  if (userExists) {
    return res.status(400).json("User already exists");
  }

  const user = await User.create({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    isAdmin : req.body.isAdmin || false
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json("Invalid user data");
  }
};
