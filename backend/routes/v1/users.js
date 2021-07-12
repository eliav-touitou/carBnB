const { Router } = require("express");
const users = Router();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { User, Auth, Car, Rental } = require("../../../database/models");
const models = require("../../../database/models");
const {
  createAccessToken,
  createRefreshToken,
  validToken,
} = require("../../utils/authentication");
const {
  getAllItems,
  getUserOrAuth,
  addToUsersDB,
  addToAuthDB,
  updateItemToDB,
  getUserByRating,
} = require("../../../database/queries");
const { writeLogs } = require("../../utils/helperFunctions");

const primaryKeys = {
  User: "user_email",
  Car: "car_id",
  Auth: "user_email",
  Rental: "transaction_id",
};

// Gets a unique user
users.post("/uniqueuser", async (req, res) => {
  const { email } = req.body;

  try {
    const objToSearchBy = { model: User, email: email };
    const user = await getUserOrAuth(objToSearchBy);

    if (!user) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/users/uniqueuser",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Gets all users with given rating
users.post("/rated", async (req, res) => {
  const { minRate } = req.body;
  try {
    const ratedUsers = await getUserByRating(minRate);

    if (ratedUsers.length === 0) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: ratedUsers });
  } catch (error) {
    console.log(error.message);
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/users/rated",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Get all users
users.get("/allusers", async (req, res) => {
  try {
    const users = await getAllItems(User);

    if (!users) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error.message);
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/users/allusers",
    };
    await writeLogs(objToWrite);
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
        .json({ success: false, message: "User already exist" });
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
    console.log(error);
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/users/register",
    };
    await writeLogs(objToWrite);
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
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/users/login",
    };
    await writeLogs(objToWrite);
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
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/users/logout",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

users.post("/updateitems", validToken, async (req, res) => {
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
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/users/updateitems",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = users;
