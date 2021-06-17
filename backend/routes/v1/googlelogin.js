const { Router } = require("express");
const googleLogin = Router();
const { googleLoginVerified } = require("../../cookieUtils");

googleLogin.post("/", googleLoginVerified, (req, res) => {
  res.status(200).end();
});
module.exports = googleLogin;
