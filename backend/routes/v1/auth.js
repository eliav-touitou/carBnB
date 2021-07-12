const { Router } = require("express");
const auth = Router();
const { facebookLoginValidation } = require("../../utils/authentication");
const {
  getUserOrAuth,
  getItemFromDB,
  updateItemToDB,
} = require("../../database/queries");
const { hashSync, genSaltSync } = require("bcrypt");
const { User, Auth } = require("../../database/models");
const { googleLoginVerified } = require("../../utils/authentication");
const { writeLogs, sendMail } = require("../../utils/helperFunctions");
const { v4: uuidv4 } = require("uuid");

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

auth.put("/forgotpassword", async (req, res) => {
  const { userEmail } = req.body;
  try {
    const auth = await getUserOrAuth({ model: Auth, email: userEmail });
    if (!auth) {
      return res.status(404).json({ message: "This email does not exist" });
    }
    const code = uuidv4().slice(0, 7);
    sendMail({
      from: "rozjino@gmail.com",
      to: auth.user_email,
      subject: "Reset your password",
      text: `<p>
          Please click on this
          <a href=http://localhost:3000/resetpassword/${auth.id}>
            CarBnB Reset Password
          </a>
          and enter this code ${code} to reset tour password.
        </p>`,
    });
    const objToUpdate = {
      table: Auth,
      column: ["reset_code"],
      primaryKey: "id",
      primaryKeyValue: auth.id,
      content: [code],
    };
    await updateItemToDB(objToUpdate);
    res
      .status(200)
      .json({ message: "Check your mail box, reset link successfully send" });
  } catch (err) {
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/auth/forgotpassword",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

auth.put("/resetpassword/:id", async (req, res) => {
  const { id } = req.params;
  const { resetCode, newPassword } = req.body;

  try {
    const auth = await getItemFromDB({
      model: Auth,
      column: ["id"],
      columnValue: [id],
    });

    if (!auth) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (auth[0].reset_code !== resetCode) {
      return res.status(404).json({ message: "Incorrect Reset Code" });
    } else {
      const password = hashSync(newPassword, genSaltSync(10));
      const objToUpdate = {
        table: Auth,
        column: ["password", "reset_code"],
        primaryKey: "id",
        primaryKeyValue: auth[0].id,
        content: [password, null],
      };
      await updateItemToDB(objToUpdate);
      return res
        .status(200)
        .json({ message: "Your new password successfully updated" });
    }
  } catch (err) {
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: `api/v1/auth/resetpaswword/${id}`,
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

module.exports = auth;
