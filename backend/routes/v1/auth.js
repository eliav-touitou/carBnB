const { Router } = require("express");
const auth = Router();
const { facebookLoginValidation } = require("../../utils/authentication");
const { getUserOrAuth } = require("../../../database/queries");
const { User } = require("../../../database/models");
const { googleLoginVerified } = require("../../utils/authentication");
const { writeLogs } = require("../../utils/helperFunctions");

// Route to login with facebook
auth.post("/facebookLogin", facebookLoginValidation, async (req, res) => {
  const { userEmail } = req;
  let { user } = req;

  try {
    const objToSearchBy = { model: User, email: userEmail };
    if (!user) user = await getUserOrAuth(objToSearchBy);
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/auth/facebookLogin",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

// Route to login with google
auth.post("/googleLogin", googleLoginVerified, async (req, res) => {
  const { userEmail } = req;
  let { user } = req;

  try {
    const objToSearchBy = { model: User, email: userEmail };
    if (!user) user = await getUserOrAuth(objToSearchBy);
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/auth/googleLogin",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

module.exports = auth;
