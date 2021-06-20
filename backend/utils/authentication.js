const axios = require("axios");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { hashSync, genSaltSync } = require("bcrypt");
const { Auth } = require("../../database/models");
const {
  getUserOrAuth,
  addToAuthDB,
  addToUsersDB,
} = require("../../database/queries");

const client = new OAuth2Client(process.env.CLIENT_ID);

// Create json web token
const createAccessToken = (user) => {
  user.password = undefined;
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

// Create refresh json web token
const createRefreshToken = (user) => {
  user.password = undefined;
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// Check token validation
const validToken = async (req, res, next) => {
  let accessToken = await req.cookies["Access-Token"];
  let refreshToken = await req.cookies["Refresh-Token"];
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: "Access denied invalid token" });
  }
  accessToken = accessToken.slice(7);
  refreshToken = refreshToken.slice(7);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.message === "jwt expired") {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, decoded) => {
            if (err) {
              return res
                .status(403)
                .json({ message: "Access denied invalid token" });
            } else {
              const newAccessToken = createAccessToken(decoded);
              console.log(newAccessToken);
              res
                .clearCookie("Access-Token")
                .cookie("Access-Token", `Bearer ${newAccessToken}`);
              next();
            }
          }
        );
      } else {
        return res.status(403).json({ message: "Access denied invalid token" });
      }
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

// Function to login with google.
const googleLoginVerified = async (req, res, next) => {
  const { tokenId } = req.body;

  // Verify the user token
  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.CLIENT_ID,
  });
  const { email_verified, email, given_name, family_name } = response.payload;

  try {
    if (email_verified) {
      const objToSearchBy = { model: Auth, email: email };
      const user = await getUserOrAuth(objToSearchBy);
      // If user exist create new token and push to cookie.
      // Else create new user and auth in DB and push new token to cookie.
      if (user) {
        user.password = "generate-password";
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        res.cookie("Access-Token", `Bearer ${accessToken}`);
        res.cookie("Refresh-Token", `Bearer ${refreshToken}`);
        req.user = null;
        req.userEmail = email;
        next();
        return;
      } else {
        let password = email + process.env.ACCESS_TOKEN_SECRET;
        password = hashSync(password, genSaltSync(10));
        const newUser = await addToUsersDB({
          phoneNumber: null,
          firstName: given_name,
          lastName: family_name,
          email,
          address: null,
        });
        await addToAuthDB({
          firstName: given_name,
          lastName: family_name,
          email,
          password,
        });
        newUser.password = "generate-password";
        const accessToken = createAccessToken(newUser);
        const refreshToken = createRefreshToken(newUser);
        res.cookie("Access-Token", `Bearer ${accessToken}`);
        res.cookie("Refresh-Token", `Bearer ${refreshToken}`);
        req.user = newUser;
        req.userEmail = null;
        next();
        return;
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: "Something went wrong..." });
  }
};

// Function to login with facebook.
const facebookLoginValidation = async (req, res, next) => {
  const { userId, accessToken } = req.body;

  // Verify the user token
  try {
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userId}/?fields=id,name,email&access_token=${accessToken}`;
    const { data } = await axios.get(urlGraphFacebook);
    const { email, name } = data;

    const objToSearchBy = { model: Auth, email: email };
    const user = await getUserOrAuth(objToSearchBy);

    // If user exist create new token and push to cookie.
    // Else create new user and auth in DB and push new token to cookie.
    if (user) {
      user.password = "generate-password";
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);
      res.cookie("Access-Token", `Bearer ${accessToken}`);
      res.cookie("Refresh-Token", `Bearer ${refreshToken}`);
      req.user = null;
      req.userEmail = email;
      next();
      return;
    } else {
      let password = email + process.env.ACCESS_TOKEN_SECRET;
      password = hashSync(password, genSaltSync(10));
      const firstAndLastNames = name.split(" ");

      const newUser = await addToUsersDB({
        phoneNumber: null,
        firstName: firstAndLastNames[0],
        lastName: firstAndLastNames[1],
        email,
        address: null,
      });
      await addToAuthDB({
        firstName: firstAndLastNames[0],
        lastName: firstAndLastNames[1],
        email,
        password,
      });
      newUser.password = "generate-password";
      const accessToken = createAccessToken(newUser);
      const refreshToken = createRefreshToken(newUser);
      res.cookie("Access-Token", `Bearer ${accessToken}`);
      res.cookie("Refresh-Token", `Bearer ${refreshToken}`);
      req.user = newUser;
      req.userEmail = null;
      next();
      return;
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Something went wrong..." });
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  validToken,
  googleLoginVerified,
  facebookLoginValidation,
};
