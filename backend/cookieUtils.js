const jwt = require("jsonwebtoken");

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

module.exports = { createAccessToken, createRefreshToken, validToken };
