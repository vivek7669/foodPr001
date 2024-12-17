const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { log } = require("node:console");

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const newUser = await User.create(req.body);   
    const gentoken = await newUser.generateAuthToken();

    return res.status(201).json({
      message: "User created successfully",
      token: gentoken,
      user : newUser
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const genToken = await user.generateAuthToken();
    
    return res.status(200).json({
      message: "Login successful",
      token: genToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};

module.exports = { signup, login };
