require("dotenv").config();
const { Router } = require("express");
const photos = Router();
const {
  addToPhotosDB,
  getItemFromDB,
  getPhoto,
} = require("../../../database/queries");
const { Photo } = require("../../../database/models");
const { writeLogs } = require("../../utils/helperFunctions");

// Save new photo in DB
photos.post("/savephotos", async (req, res) => {
  const photosToSave = req.body;
  try {
    const isSaved = await addToPhotosDB(photosToSave);

    return res.status(200).json({ success: true, data: isSaved });
  } catch (error) {
    console.log(error.message);
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/photos/savephotos",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = photos;
