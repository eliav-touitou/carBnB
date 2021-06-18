const { Router } = require("express");
const favorite = Router();
const { Favorite } = require("../../../database/models");

const {
  addToFavoriteDB,
  removeFromFavoriteDB,
  getItemFromDB,
} = require("../../../database/queries");

favorite.post("/add", async (req, res) => {
  const { userEmail, carId } = req.body.data;
  try {
    const favorite = await addToFavoriteDB({ userEmail, carId });
    res.status(201).json({ message: "Favorite saved!", data: favorite });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

favorite.post("/remove", async (req, res) => {
  const { userEmail, carId } = req.body.data;
  try {
    await removeFromFavoriteDB({ userEmail, carId });
    res.status(200).json({ message: "Favorite removed!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

favorite.post("/all", async (req, res) => {
  const { userEmail } = req.body.data;

  try {
    const allFavorite = await getItemFromDB({
      model: Favorite,
      column: ["user_email"],
      columnValue: [userEmail],
    });
    res.status(201).json({ message: "Successes", data: allFavorite });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});
module.exports = favorite;
