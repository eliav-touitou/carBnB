const { Router } = require("express");
const googleLogin = Router();
const { googleLoginVerified } = require("../../cookieUtils");
const { getUserOrAuth } = require("../../../database/queries");
const { User } = require("../../../database/models");

googleLogin.post("/", googleLoginVerified, async (req, res) => {
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

module.exports = googleLogin;
