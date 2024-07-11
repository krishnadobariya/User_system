const { registerValidation, loginValidation } = require("../utils/validation");
const authServices = require("../services/authServices");

exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({
    message: error.details[0].message
  });

  try {
    const payload = req.body;
    const result = await authServices.register(payload);
    res.json(result);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
        status:500,
        message:"Internal Server Error"
    });
  }
};

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({
    message: error.details[0].message
  });

  try {
    const payload = req.body;
    const result = await authServices.login(payload);
    res.json(result);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      status: 500,
      message: "Internal Servew error",
    });
  }
};
