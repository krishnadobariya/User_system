const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {sendEmail} = require('../services/emailService');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (payload) => {
  try {
    const emailExists = await User.findOne({ email: payload.email });
    if (emailExists) return { status: 400, message: "Email already exists" };

    const user = new User({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role || "user",
    });

    const expiresIn = 3 * 24 * 60 * 60 * 1000
    const savedUser = await user.save();
    const token = jwt.sign(
      { user: { id: savedUser._id, role: savedUser.role } },
      process.env.JWT_SECRET,
      { expiresIn: expiresIn }
    );

    await sendEmail(
      savedUser.email,
      "Registration Successful",
      "Welcome to our platform!"
    );

    return { status: 200, message: "Email Sent Successfully", token };
  } catch (error) {
    console.log("error",error);
    return { status: 500, message: "Internal Server error" };
  }
};

exports.login = async (payload) => {
  try {
    const user = await User.findOne({ email: payload.email });
    if (!user) return { status: 400, message: "Email or password is wrong" };

    const validPass = await bcrypt.compare(payload.password, user.password);
    if (!validPass) return { status: 400, message: "Invalid password" };

    const token = jwt.sign(
      { user: { id: user._id, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { status:200, token };
  } catch (error) {
    return { status: 500, message: "Internal Server error" };
  }
};
