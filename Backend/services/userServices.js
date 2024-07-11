const User = require('../models/User');

exports.getAllUsers = async () => {
  try {
    const users = await User.find().select('-password');
    return users;
  } catch (err) {
    return { status: 500, message: "Internal Server error" };
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findById(id).select('-password');
    if (!user) return { status: 404, message: "User not found" };
    return user;
  } catch (err) {
    return { status: 500, message: "Internal Server error" };
  }
};

exports.updateUser = async (id, payload) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, payload, { new: true }).select('-password');
    if (!updatedUser) return { status: 404, message: "User not found" };
    return updatedUser;
  } catch (err) {
    return { status: 500, message: "Internal Server error" };
  }
};

exports.deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
    return { message: "User Delete Successfully" };
  } catch (err) {
    return { status: 500, message: "Internal Server error" };
  }
};
