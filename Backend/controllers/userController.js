const userServices = require("../services/userServices");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await userServices.getAllUsers();
    res.json(result);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const result = await userServices.getUserById(req.params.id);
    res.json(result);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const result = await userServices.updateUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await userServices.deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
