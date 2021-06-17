const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { getUserOrAuth, addToAuthDB } = require("../database/queries");
const { hashSync, genSaltSync } = require("bcrypt");
const { Auth } = require("../database/models");

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

const googleLoginVerified = async (req, res, next) => {
  const { tokenId } = req.body;

  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.CLIENT_ID,
  });
  const { email_verified, email, given_name, family_name } = response.payload;
  try {
    if (email_verified) {
      const user = await getUserOrAuth(Auth, email);
      if (user) {
        user.password = "generate-password";
        const token = createAccessToken(user);
        res.cookie("Access-Token", `Bearer ${token}`);
        next();
      } else {
        let password = email + process.env.ACCESS_TOKEN_SECRET;
        password = hashSync(password, genSaltSync(10));
        const newUser = await addToAuthDB({
          firstName: given_name,
          lastName: family_name,
          email,
          password,
        });
        newUser.password = "generate-password";
        const token = createAccessToken(newUser);
        res.cookie("Access-Token", `Bearer ${token}`);
        next();
      }
    }
  } catch (err) {
    console.log("102");
    console.log(err.message);
    res.status(400).json({ error: "Something went wrong..." });
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  validToken,
  googleLoginVerified,
};
