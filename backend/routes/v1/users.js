const { Router } = require("express");
const users = Router();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { User, Auth, Car, Rental } = require("../../../database/models");
const models = require("../../../database/models");
const {
  createAccessToken,
  createRefreshToken,
  validToken,
} = require("../../authentication");
const {
  getAllItems,
  getUserOrAuth,
  addToUsersDB,
  addToAuthDB,
  updateItemToDB,
  getItemFromDB,
} = require("../../../database/queries");

const primaryKeys = {
  User: "user_email",
  Car: "car_id",
  Auth: "user_email",
  Rental: "transaction_id",
};

// Gets a unique user
users.post("/uniqueuser", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const objToSearchBy = { model: User, email: email };
    const user = await getUserOrAuth(objToSearchBy);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Get all users
users.get("/allusers", async (req, res) => {
  try {
    const users = await getAllItems(User);
    console.log(users);
    if (!users) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Create new auth and user
users.post("/register", async (req, res) => {
  try {
    const { newUser } = req.body;
    const { firstName, lastName, address, phoneNumber, email } = newUser;
    const objToSearchBy = { model: Auth, email: email };
    const auth = await getUserOrAuth(objToSearchBy);

    if (auth) {
      return res
        .status(409)
        .json({ success: true, message: "User already exist" });
    }

    newUser.password = hashSync(newUser.password, genSaltSync(10));

    await addToUsersDB({ firstName, lastName, address, phoneNumber, email });
    await addToAuthDB({
      password: newUser.password,
      email,
      firstName,
      lastName,
    });
    newUser.password = undefined;

    const accessToken = createAccessToken(newUser);
    const refreshToken = createRefreshToken(newUser);
    res.cookie("Access-Token", `Bearer ${accessToken}`);
    res.cookie("Refresh-Token", `Bearer ${refreshToken}`);

    return res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Login for exist user
users.post("/login", async (req, res) => {
  const { email, password } = req.body.user; // ##need to change maybe
  try {
    const objToSearchBy = { model: Auth, email: email };
    const auth = await getUserOrAuth(objToSearchBy);

    if (!auth) {
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    }
    const isPasswordCorrect = compareSync(password, auth.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    } else {
      const accessToken = createAccessToken(req.body);
      const refreshToken = createRefreshToken(req.body);
      res.cookie("Access-Token", `Bearer ${accessToken}`);
      res.cookie("Refresh-Token", `Bearer ${refreshToken}`);
      const objToSearchBy = { model: User, email: email };
      const userDetails = await getUserOrAuth(objToSearchBy);
      return res
        .status(200)
        .json({ message: "Login Successfully!", data: userDetails });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// User logout
users.post("/logout", async (req, res) => {
  try {
    res.clearCookie("Access-Token");
    res.clearCookie("Refresh-Token");
    return res.status(200).json({ message: "Success logout!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Check if user logged in at first entry to website
users.get("/checklogged", validToken, async (req, res) => {
  return res.status(200).json({ message: true });
});

users.post("/updateitems", async (req, res) => {
  const { data } = req.body;
  try {
    const table = models[`${data[0]}`];

    const objToUpdate = {
      table: table,
      column: data[1],
      primaryKey: primaryKeys[data[0]],
      primaryKeyValue: data[2],
      content: data[3],
    };

    await updateItemToDB(objToUpdate);
    return res.status(200).json({ message: "Success to update!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = users;
