const { Router } = require("express");
const auth = Router();
const { facebookLoginValidation } = require("../../utils/authentication");
const { getUserOrAuth } = require("../../../database/queries");
const { User } = require("../../../database/models");
const { googleLoginVerified } = require("../../utils/authentication");

// Route to login with facebook
auth.post("/facebookLogin", facebookLoginValidation, async (req, res) => {
  const { userEmail } = req;
  let { user } = req;

  try {
    const objToSearchBy = { model: User, email: userEmail };
    if (!user) user = await getUserOrAuth(objToSearchBy);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Route to login with google
auth.post("/googleLogin", googleLoginVerified, async (req, res) => {
  const { userEmail } = req;
  let { user } = req;

  try {
    const objToSearchBy = { model: User, email: userEmail };
    if (!user) user = await getUserOrAuth(objToSearchBy);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = auth;
